import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import App from './App';
import './index.css';

const antdTheme = {
  token: {
    fontFamily: 'Futura PT',
  },
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider theme={antdTheme}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);
