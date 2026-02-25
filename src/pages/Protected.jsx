import useAuth from '@/store/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

function Protected() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default Protected;
