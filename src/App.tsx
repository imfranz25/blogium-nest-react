// import { createPortal } from 'react-dom';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './pages/Routes';

const App = () => {
  return (
    <>
      <Toaster />
      <AppRoutes />
    </>
  );
};

export default App;
