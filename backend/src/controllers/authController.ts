import { NextFunction, Request, Response } from 'express';
import { matchedData, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

  const { password, __v, ...userWithoutPassword } = newUser.toObject();

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    user: userWithoutPassword,
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

  const hashedPassword = user?.password as string;

  const isMatch = await bcrypt.compare(password, hashedPassword);

  if (!isMatch) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  const token = jwt.sign({ userId: user?._id }, jwtSecret, {
    expiresIn: '1h',
  });

  res.json({
    message: 'success',
    token,
    user: {
      id: user?._id,
      user: user?.username,
      email: user?.email,
    },
  });
  return;
};
