import { RouterProvider } from 'react-router-dom';
import { createAppRouter } from './router';
import './App.css';

interface AppProps {
  activeRule?: string;
}

function App({ activeRule }: AppProps) {
  // 动态创建路由，base 设置为 activeRule
  const router = createAppRouter(activeRule || '/');

  return <RouterProvider router={router} />;
}

export default App;
