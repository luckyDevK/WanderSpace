import { Document } from 'mongoose';
import { Request } from 'express';

interface IAuth {
  identifier: string;
  username: string;
  email: string;
  password: string;
  confirmPw: string;
}

export type SignUpBodyInput = Omit<IAuth, 'identifier'>;

export type SignInBodyInput = Pick<IAuth, 'identifier' | 'password'>;

export interface AuthRequest extends Request {
  userId?: string;
}

export type IUser = Omit<IAuth, 'identifier' | 'confirmPw'>;
