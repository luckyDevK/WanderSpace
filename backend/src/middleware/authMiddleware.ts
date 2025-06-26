import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { AuthRequest } from '../types/auth';

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.json({ message: 'Invalid credentials broror' });
    return;
  }

  const token = authHeader.split(' ')[1];
  console.log(authHeader);

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    console.log(decoded);
    req.userId = decoded.userId;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }
};
