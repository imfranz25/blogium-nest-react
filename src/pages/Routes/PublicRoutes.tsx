import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutes = () => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    return <Navigate to="/feed" />;
  }

  return <Outlet />;
};

export default PublicRoutes;
