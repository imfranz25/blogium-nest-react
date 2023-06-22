import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import Loader from '../../components/Loader';

const PublicRoutes = () => {
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/feed" />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Outlet />
    </Suspense>
  );
};

export default PublicRoutes;
