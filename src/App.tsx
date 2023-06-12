// import { createPortal } from 'react-dom';
import { Toaster } from 'react-hot-toast';

import AppRoutes from './pages/Routes';
import PostModal from './components/Modal/PostModal';

const App = () => {
  return (
    <>
      <Toaster />
      <PostModal />
      <AppRoutes />
    </>
  );
};

export default App;
