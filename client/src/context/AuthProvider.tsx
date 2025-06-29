import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { isAxiosError } from 'axios';
import axios from '@/lib/api/axios';
import type { ISignIn, ISignUp } from '../hooks/useAuth';
import { AuthContext } from '../hooks/useAuth';

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null>(null);

  const navigate = useNavigate();

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

      const accessToken = data.accessToken;

      if (data.message === 'success') {
        setToken(accessToken);

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
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const ctxAuthValues = useMemo(
    () => ({
      token,
      setToken,

      handleSignIn,
      handleSignUp,
      handleSignOut,
    }),
    [token],
  );

  return <AuthContext value={ctxAuthValues}>{children}</AuthContext>;
}
