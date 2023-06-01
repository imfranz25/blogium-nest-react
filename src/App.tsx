import { RouteObject, useRoutes } from 'react-router-dom';

/* Pages */
import PublicRoutes from './components/Routes/PublicRoutes';
import PrivateRoutes from './components/Routes/PrivateRoutes';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import PageNotFound from './pages/404';
import FeedPage from './pages/Feed';
import ProfilePage from './pages/Profile';
import PostPage from './pages/Post';

const App = () => {
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
          element: <ProfilePage />,
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

export default App;
