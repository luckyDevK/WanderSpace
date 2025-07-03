import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from '@/lib/api/axios';
import type { ISignIn, ISignUp } from '../hooks/useAuth';
import { AuthContext } from '../hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null>(null);
  const queryClient = useQueryClient();

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
        console.log(data);
        navigate('/');
      }
    } catch (error) {
      console.error(error);
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
      navigate('/');

      queryClient.removeQueries({ queryKey: ['userPlaces'] });
      setToken(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const ctxAuthValues = {
    token,
    setToken,
    handleSignIn,
    handleSignUp,
    handleSignOut,
  };

  return <AuthContext value={ctxAuthValues}>{children}</AuthContext>;
}
