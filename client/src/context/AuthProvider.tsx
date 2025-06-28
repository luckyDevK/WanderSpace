import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { isAxiosError } from 'axios';
import axios from '@/lib/api/axios';
import type { ISignIn, ISignUp, IAccount } from '../hooks/useAuth';
import { AuthContext } from '../hooks/useAuth';

const storedAccount = localStorage.getItem('account')
  ? JSON.parse(localStorage.getItem('account') as string)
  : null;

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null>(null);
  const [account, setAccount] = useState<IAccount | null>(storedAccount);

  const navigate = useNavigate();

  useEffect(() => {
    if (account) {
      localStorage.setItem('account', JSON.stringify(account));
    } else {
      localStorage.removeItem('account');
    }
  }, [account]);

  const handleSignIn = async ({ identifier, password }: ISignIn) => {
    try {
      const { data } = await axios.post(
        '/auth/signin',
        {
          identifier,
          password,
        },
        { withCredentials: true },
      );

      const accountUser = data.account;

      const accessToken = data.accessToken;

      if (data.message === 'success') {
        setToken(accessToken);
        setAccount(accountUser);
        navigate('/');
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 401) {
          alert(error.response.data.message || 'Unauthorized');
        } else {
          alert('Something went wrong');
        }
      }
    }
  };

  useEffect(() => {
    console.log(account);
  }, []);

  const handleSignUp = async ({
    username,
    email,
    password,
    confirmPw,
  }: ISignUp) => {
    try {
      const { data } = await axios.post('/auth/signup', {
        username,
        email,
        password,
        confirmPw,
      });

      const success = data.success;

      if (success) {
        navigate('/signin');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      const res = await axios.post(
        '/auth/logout',
        {},
        { withCredentials: true },
      );

      if (res.status === 200 || res.status === 204) {
        setToken(null);
        setAccount(null);
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const ctxAuthValues = useMemo(
    () => ({
      token,
      setToken,
      account,
      handleSignIn,
      handleSignUp,
      handleSignOut,
    }),
    [token, account],
  );

  return <AuthContext value={ctxAuthValues}>{children}</AuthContext>;
}
