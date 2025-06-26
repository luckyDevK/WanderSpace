import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import api from '@/lib/api/axios';
import type { ISignIn, ISignUp } from './useAuth';
import { AuthContext } from './useAuth';

const storedToken = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null;

const storedUsername = localStorage.getItem('username')
  ? localStorage.getItem('username')
  : null;

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null>(storedToken);
  const [username, setUsername] = useState<string | null>(storedUsername);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('username', username || '');
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    }
  }, [token, username]);

  useEffect(() => {
    console.log(token);
  });

  const handleSignIn = async ({ identifier, password }: ISignIn) => {
    const { data } = await api.post('/auth/signin', { identifier, password });

    console.log(data.username);
    const usernameAccount = data.username as string;
    const token = data.token as string;

    console.log(data);
    if (data.message === 'success') {
      setUsername(usernameAccount);
      setToken(token);
      navigate('/');
    }
  };

  const handleSignUp = async ({
    username,
    email,
    password,
    confirmPw,
  }: ISignUp) => {
    const { data } = await api.post('/auth/signup', {
      username,
      email,
      password,
      confirmPw,
    });

    const success = data.success;

    if (success) {
      navigate('/signin');
    }
  };

  const handleSignOut = () => {
    setToken(null);
    setUsername(null);
  };

  const ctxAuthValues = useMemo(
    () => ({
      token,
      username,
      handleSignIn,
      handleSignUp,
      handleSignOut,
    }),
    [token, username],
  );

  return <AuthContext value={ctxAuthValues}>{children}</AuthContext>;
}
