import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const PublicRoutes = () => {
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/feed" />;
  }

  return <Outlet />;
};

export default PublicRoutes;
