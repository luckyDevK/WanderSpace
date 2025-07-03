import axios from '@/lib/api/axios';

import { useAuth } from './useAuth';

export const useRefreshToken = (): (() => Promise<string | null>) => {
  const auth = useAuth();

  const refreshToken = async () => {
    try {
      const { data } = await axios.get<{ accessToken: string }>(
        '/auth/refresh',
        {
          withCredentials: true,
        },
      );

      auth?.setToken(data.accessToken);

      return data.accessToken;
    } catch (err: any) {
      if (err?.response?.status === 401) {
        return null;
      }

      console.error('Unable to refresh token:', err);
      return null;
    }
  };

  return refreshToken;
};
