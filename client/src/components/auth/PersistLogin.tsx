import { useEffect, useState } from 'react';

import { useRefreshToken } from '@/hooks/useRefreshToken';
import { useAuth } from '@/hooks/useAuth';
import { Outlet } from 'react-router-dom';
import SpinnerCircle2 from '../customized/spinner/spinner-08';

export default function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const auth = useAuth();

  const token = auth?.token;

  const refresh = useRefreshToken();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!token) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return <SpinnerCircle2 />;

  return <Outlet />;
}
