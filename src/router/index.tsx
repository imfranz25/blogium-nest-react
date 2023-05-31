import { createBrowserRouter, RouteObject } from 'react-router-dom';

/* Pages */
import App from '../App';
import LoginPage from '../pages/Login';
import SignUpPage from '../pages/SignUp';
import PageNotFound from '../pages/404';
import FeedPage from '../pages/Feed';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <LoginPage />,
    errorElement: <PageNotFound />,
  },
  {
    path: '/sign-up',
    element: <SignUpPage />,
  },
  {
    element: <App />,
    children: [
      {
        path: '/feed',
        element: <FeedPage />,
      },
      {
        path: '/edit-profile',
        element: <FeedPage />,
      },
      {
        path: '/profile/:id',
        element: <FeedPage />,
      },
      {
        path: '/post/:id',
        element: <FeedPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
