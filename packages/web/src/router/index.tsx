import { createBrowserRouter } from 'react-router-dom';
import Home from '@/views/Home';
import About from '@/views/About';
import Login from '@/views/Login';
import NotFound from '@/views/NotFound';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

const router = createBrowserRouter([
  // 公共路由
  {
    element: <PublicRoute />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
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
  },
  // 404 路由
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;