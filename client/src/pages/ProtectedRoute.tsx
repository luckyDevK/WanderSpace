import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export default function ProtectedRoute() {
  const auth = useAuth();

  const isAuthenticated = auth?.token;

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
}
