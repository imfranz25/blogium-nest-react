import { Outlet, Navigate } from 'react-router-dom';

const App = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default App;
