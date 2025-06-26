import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute() {
  const isAuthenticated = localStorage.getItem('token');

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
}
