import { Layout } from 'antd';
import { Outlet, Navigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import Navbar from '../../components/Navbar';

const PrivateRoutes = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <Layout>
      <Navbar />
      <div style={{ paddingTop: '80px' }}>
        <Outlet />
      </div>
    </Layout>
  );
};

export default PrivateRoutes;
