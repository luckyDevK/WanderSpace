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

export interface IAccount {
  id: string;
  email: string;
  username: string;
}

export interface IAuthContext {
  account: IAccount | null;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  handleSignIn: (data: ISignIn) => Promise<void>;
  handleSignUp: (data: ISignUp) => Promise<void>;
  handleSignOut: () => void;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuth = () => {
  return useContext(AuthContext);
};
