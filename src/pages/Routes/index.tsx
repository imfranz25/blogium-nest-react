import { RouteObject, useRoutes } from 'react-router-dom';

import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import LoginPage from '../Login';
import SignUpPage from '../SignUp';
import PageNotFound from '../404';
import FeedPage from '../Feed';
import ProfilePage from '../Profile';
import EditProfile from '../EditProfile';
import PostPage from '../PostDetail';

const AppRoutes = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <PublicRoutes />,
      errorElement: <PageNotFound />,
      children: [
        {
          index: true,
          element: <LoginPage />,
        },
        {
          path: 'sign-up',
          element: <SignUpPage />,
        },
      ],
    },
    {
      element: <PrivateRoutes />,
      errorElement: <PageNotFound />,
      children: [
        {
          path: '/feed',
          element: <FeedPage />,
        },
        {
          path: '/edit-profile',
          element: <EditProfile />,
        },
        {
          path: '/profile/:id',
          element: <ProfilePage />,
        },
        {
          path: '/post/:id',
          element: <PostPage />,
        },
      ],
    },
  ];

  return useRoutes(routes);
};

export default AppRoutes;
