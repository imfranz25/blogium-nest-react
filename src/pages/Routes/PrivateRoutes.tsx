import { Navigate, Outlet } from 'react-router-dom';

import Navbar from '../../components/Navbar';

const PrivateRoutes = () => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
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
