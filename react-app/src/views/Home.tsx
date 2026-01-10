import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import reactLogo from '@/assets/react.svg'
import viteLogo from '/vite.svg'
import '../App.css'
import { QiankunContext } from '../context/QiankunContext'

function Home() {
  const [count, setCount] = useState(0)
  const [inputMessage, setInputMessage] = useState('')
  const [messages, setMessages] = useState<
    Array<{ from: string; content: string; time: string }>
  >([])
  const actions = useContext(QiankunContext)

  useEffect(() => {
    if (!actions) return
    const handleChange = (state: Record<string, unknown>) => {
      // 首次调用时会传入当前状态，后续调用时 state 是新的状态
      if (state.message) {
        setMessages((prev) => [
          {
            from: 'React 子应用',
            content: String(state.message),
            time: new Date().toLocaleTimeString(),
          },
          ...prev.slice(0, 4),
        ])
      }
    }
    if (actions?.onGlobalStateChange) {
      actions.onGlobalStateChange(handleChange)
    }
  }, [actions])

  const sendMessage = () => {
    if (!actions || !inputMessage.trim()) return
    if (actions?.setGlobalState) {
      actions.setGlobalState({
        message: inputMessage,
      })
    }
    setInputMessage('')
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      {/* 简单的通信功能 */}
      {actions && (
        <div
          style={{
            marginTop: '20px',
            padding: '16px',
            background: '#f8f9fa',
            borderRadius: '8px',
            maxWidth: '500px',
            margin: '20px auto',
          }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>
            🔔 通信功能
          </h3>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="输入消息..."
              style={{
                flex: 1,
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                padding: '8px 20px',
                background: '#61dafb',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}>
              发送
            </button>
          </div>
          <div
            style={{
              maxHeight: '150px',
              overflowY: 'auto',
              padding: '8px',
              background: 'white',
              borderRadius: '4px',
              marginBottom: '8px',
              fontSize: '13px',
            }}>
            {messages.length === 0 ? (
              <div
                style={{ textAlign: 'center', color: '#999', padding: '10px' }}>
                暂无消息
              </div>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    padding: '4px 0',
                    borderBottom: '1px solid #f0f0f0',
                  }}>
                  <span
                    style={{
                      fontWeight: 600,
                      color: '#61dafb',
                      marginRight: '8px',
                    }}>
                    {msg.from}:
                  </span>
                  <span>{msg.content}</span>
                  <span
                    style={{
                      color: '#999',
                      fontSize: '11px',
                      marginLeft: '8px',
                    }}>
                    {msg.time}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <nav style={{ marginTop: '20px' }}>
        <Link to="/about">关于</Link>
      </nav>
    </>
  )
}

export default Home
