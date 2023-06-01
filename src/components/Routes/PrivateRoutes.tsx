import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import Navbar from '../Navbar';

const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default PrivateRoutes;
