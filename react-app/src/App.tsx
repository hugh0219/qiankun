import { RouterProvider } from 'react-router-dom'
import { useMemo } from 'react'
import { createAppRouter } from './router'
import './App.css'

interface AppProps {
  activeRule?: string
}

function App({ activeRule }: AppProps) {
  // 使用 useMemo 确保 router 实例只创建一次，避免重复创建导致的路由监听问题
  const router = useMemo(() => {
    return createAppRouter(activeRule || '/')
  }, [activeRule])

  return <RouterProvider router={router} />
}

export default App
