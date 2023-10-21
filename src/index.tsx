import React from 'react';
import { createRoot } from 'react-dom/client';
import 'antd/dist/reset.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';

const root = document.getElementById('root')!;
createRoot(root).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
