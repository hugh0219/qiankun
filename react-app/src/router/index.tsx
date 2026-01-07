import { createBrowserRouter } from 'react-router-dom';
import Home from '../views/Home';
import About from '../views/About';

// 创建路由实例的函数，支持动态 base
export function createAppRouter(base = '/') {
  return createBrowserRouter(
    [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
    ],
    {
      basename: base,
    }
  );
}
