import { Navigate, Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import Navbar from '../../components/Navbar';
import useUser from '../../hooks/useAuth';

const PrivateRoutes = () => {
  const { token } = useUser();

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
