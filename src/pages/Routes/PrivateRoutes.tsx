import { Navigate, Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import Navbar from '../../components/Navbar';

const PrivateRoutes = () => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
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
