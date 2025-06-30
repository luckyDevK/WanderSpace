import {
  AxiosError,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from 'axios';
import { useEffect } from 'react';
import type { AxiosInstance } from 'axios';

import { useRefreshToken } from '@/hooks/useRefreshToken';
import { useAuth } from './useAuth';
import { axiosPrivate } from '@/lib/api/axios';

const useAxiosPrivate = (): AxiosInstance => {
  const auth = useAuth();
  const refresh = useRefreshToken();

  const token = auth?.token;

  useEffect(() => {
    const reqIntercept = axiosPrivate.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
      },
      (err) => Promise.reject(err),
    );

    const resIntercept = axiosPrivate.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (err: AxiosError) => {
        const prevReq = err?.config;

        console.log(err.config, 'config');
        if (err.response?.status === 403 && prevReq) {
          const newAccessToken = await refresh();
          prevReq.headers['Authorization'] = `Bearer ${newAccessToken}`;

          return axiosPrivate(prevReq);
        }

        return Promise.reject(err);
      },
    );

    return () => {
      axiosPrivate.interceptors.request.eject(reqIntercept);
      axiosPrivate.interceptors.response.eject(resIntercept);
    };
  }, [token, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
