import { lazy } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';

import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';

const LoginPage = lazy(() => import('../Login'));
const SignUpPage = lazy(() => import('../SignUp'));
const PageNotFound = lazy(() => import('../404'));
const FeedPage = lazy(() => import('../Feed'));
const ProfilePage = lazy(() => import('../Profile'));
const EditProfile = lazy(() => import('../EditProfile'));
const PostPage = lazy(() => import('../PostDetail'));

const AppRoutes = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <PublicRoutes />,
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
    {
      path: '*',
      element: <PageNotFound />,
    },
  ];

  return useRoutes(routes);
};

export default AppRoutes;
