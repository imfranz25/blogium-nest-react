import { Navigate, Outlet } from 'react-router-dom';
import useUser from '../../hooks/useAuth';

const PublicRoutes = () => {
  const { token } = useUser();

  if (token) {
    return <Navigate to="/feed" />;
  }

  return <Outlet />;
};

export default PublicRoutes;
