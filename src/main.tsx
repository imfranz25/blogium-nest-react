import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { AuthContextProvider } from './context/authContext';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <Toaster />
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
