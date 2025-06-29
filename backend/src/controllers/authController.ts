import { NextFunction, Request, Response } from 'express';
import { matchedData, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt, { VerifyErrors, JwtPayload } from 'jsonwebtoken';

import { SignInBodyInput, SignUpBodyInput } from '../types/auth';
import User from '../models/user';

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const {
    username,
    email,
    password: plainPassword,
  } = matchedData(req) as SignUpBodyInput;

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
  });
  return;
};

export const signinController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { identifier, password } = matchedData(req) as SignInBodyInput;

  const user = await User.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });

  if (!user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const hashedPassword = user?.password as string;

  const isMatch = await bcrypt.compare(password, hashedPassword);

  if (!isMatch) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

  if (!accessTokenSecret || !refreshTokenSecret) {
    throw new Error(
      'Access token or refresh is not defined in environment variables',
    );
  }

  const accessToken = jwt.sign(
    { identifier: identifier, userId: user?._id },
    accessTokenSecret,
    { expiresIn: '25m' },
  );

  const refreshToken = jwt.sign({ userId: user?._id }, refreshTokenSecret, {
    expiresIn: '8d',
  });

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    message: 'success',
    accessToken,
  });
  return;
};

export const refresh = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET!,
    (err, decoded) => {
      if (err || typeof decoded !== 'object') {
        return res.status(403).json({ message: 'Forbidden' });
      }

      // Move async logic outside the callback
      (async () => {
        const user = await User.findOne({ _id: decoded.userId });

        if (!user) {
          return res.status(401).json({ message: 'Unauthorized' });
        }

        const accessToken = jwt.sign(
          {
            identifier: decoded.identifier,
            userId: user._id,
          },
          process.env.ACCESS_TOKEN_SECRET!,
          { expiresIn: '20m' },
        );

        res.json({ accessToken });
        return;
      })().catch((err) => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      });
    },
  );
};

export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const cookies = req.cookies;

  if (!cookies) {
    res.status(204);
    return;
  }

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
  res.json({ message: 'Cookie cleared' });
};
