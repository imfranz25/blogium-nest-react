import { Suspense } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import Navbar from '../../components/Navbar';
import Loader from '../../components/Loader';
import { Content } from 'antd/es/layout/layout';

const PrivateRoutes = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Navbar />
      <Content style={{ marginTop: '80px' }}>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </Content>
    </>
  );
};

export default PrivateRoutes;
