import { createBrowserRouter } from 'react-router-dom';
import Home from '@/views/Home';
import About from '@/views/About';
import Login from '@/views/Login';
import NotFound from '@/views/NotFound';
import { PrivateRoute } from './PrivateRoute';
import { FullLayout } from './layouts/FullLayout';
import { TopNavigationLayout } from './layouts/TopNavigationLayout';

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
            element: <Home />,
          },
          {
            path: '/about',
            element: <About />,
          },
        ],
      }
    ]
  },
]);

export default router;