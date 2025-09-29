import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '@/views/Login';
import NotFound from '@/views/NotFound';
import { PrivateRoute } from './auth/PrivateRoute';
import { FullLayout } from './layouts/FullLayout';
import { TopNavigationLayout } from './layouts/TopNavigationLayout';
import { BookDetailView } from '@/views/Book/Detail';
import { BookQueryView } from '@/views/Book/Query';
import { UserMeView } from '@/views/User/Me';

const router = createBrowserRouter([
  // 全屏
  {
    element: <FullLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  // 带有导航栏的布局
  {
    element: <TopNavigationLayout />,
    children: [
      // 受保护的路由
      {
        element: <PrivateRoute />,
        children: [
          {
            path: '/',
            element: <Navigate to="/book/query" replace />,
          },
          {
            path: '/user',
            children: [
              {
                path: 'me',
                element: <UserMeView />,
              },
            ]
          },
          {
            path: '/book',
            children: [
              {
                path: ':id',
                element: <BookDetailView />,
              },
              {
                path: 'query',
                element: <BookQueryView />,
              },
            ]
          }
        ],
      }
    ]
  },
]);

export default router;