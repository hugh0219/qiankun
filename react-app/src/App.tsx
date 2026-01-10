import { RouterProvider } from 'react-router-dom'
import { useMemo } from 'react'
import { createAppRouter } from './router'
import './App.css'
import { QiankunContext } from './context/QiankunContext'

interface AppProps {
  activeRule?: string
  onGlobalStateChange?: (
    callback: (
      state: Record<string, unknown>,
      prev: Record<string, unknown>
    ) => void
  ) => void
  setGlobalState?: (state: Record<string, unknown>) => boolean
}

function App({ activeRule, onGlobalStateChange, setGlobalState }: AppProps) {
  // 使用 useMemo 确保 router 实例只创建一次，避免重复创建导致的路由监听问题
  const router = useMemo(() => {
    return createAppRouter(activeRule || '/')
  }, [activeRule])

  return (
    <QiankunContext.Provider
      value={{
        activeRule,
        onGlobalStateChange: onGlobalStateChange || (() => {}),
        setGlobalState: setGlobalState || (() => false),
      }}>
      <RouterProvider router={router} />
    </QiankunContext.Provider>
  )
}

export default App
