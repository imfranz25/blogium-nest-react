// import { createPortal } from 'react-dom';
import { Toaster } from 'react-hot-toast';

import AppRoutes from './pages/Routes';
import PostModal from './components/Modal/PostModal';
import DeleteModal from './components/Modal/DeleteModal';

const App = () => {
  return (
    <>
      <AppRoutes />
      <PostModal />
      <DeleteModal />
      <Toaster position="top-right" toastOptions={{ duration: 1000 }} />
    </>
  );
};

export default App;
