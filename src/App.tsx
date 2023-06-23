// import { createPortal } from 'react-dom';
import { Toaster } from 'react-hot-toast';

import AppRoutes from './pages/Routes';
import PostModal from './components/Modal/PostModal';
import ConfirmModal from './components/Modal/ConfirmModal';

const App = () => {
  return (
    <>
      <Toaster toastOptions={{ duration: 1000 }} />
      <PostModal />
      <ConfirmModal />
      <AppRoutes />
    </>
  );
};

export default App;
