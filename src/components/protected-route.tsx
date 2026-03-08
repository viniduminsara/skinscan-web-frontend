import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

export function ProtectedRoute() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const initialized = useAppSelector((state) => state.auth.initialized);

  // while auth check is in progress, don't redirect — allow Layout to finish auth check
  if (!initialized) return null; // or render a spinner component

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
}
