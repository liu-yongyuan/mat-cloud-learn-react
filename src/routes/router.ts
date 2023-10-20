import App from '@/pages/app/app';
import Home from '@/pages/app/home/home';
import Mail from '@/pages/mail/mail';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter(
  [
    {
      path: '/',
      Component: App,
      children: [
        {
          path: 'home',
          Component: Home,
        },
        {
          path: 'mail',
          Component: Mail,
        },
      ],
    },
  ],
  {
    basename: '/',
    window: window,
  },
);

export default router;
