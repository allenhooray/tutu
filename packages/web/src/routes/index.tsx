import { createBrowserRouter } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Login from './Login';
import NotFound from './NotFound';
import { PrivateRoute, PublicRoute } from '../auth/PrivateRoute';

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