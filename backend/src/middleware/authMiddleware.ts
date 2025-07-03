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
    res.json({ message: 'Invalid credentials ' });
    return;
  }

  const token = authHeader.split(' ')[1];
  console.log(authHeader);

  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error(
      'ACCESS_TOKEN_SECRET is not defined in environment variables',
    );
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });

    if (typeof decoded === 'object') {
      console.log(decoded?.userId, 'wwsm');
      req.userId = decoded?.userId;
      req.identifier = decoded?.identifier;
      next();
    } else {
      res.status(403).json({ message: 'Invalid token structure' });
    }
  });
};
