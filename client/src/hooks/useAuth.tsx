import { createContext, useContext } from 'react';

export interface ISignIn {
  identifier: string;
  password: string;
}

export interface ISignUp {
  username: string;
  email: string;
  password: string;
  confirmPw: string;
}

export interface IAuthContext {
  username: string | null;
  token: string | null;
  handleSignIn: (data: ISignIn) => Promise<void>;
  handleSignUp: (data: ISignUp) => Promise<void>;
  handleSignOut: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const useAuth = () => {
  const token = useContext(AuthContext);

  if (!token) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return token;
};
