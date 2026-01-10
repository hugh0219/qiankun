import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {
  renderWithQiankun,
  qiankunWindow,
  type QiankunProps,
} from 'vite-plugin-qiankun/dist/helper'

let root: ReturnType<typeof createRoot> | null = null

function render(props: QiankunProps = {}) {
  const { container } = props

  // 在 qiankun 容器中创建或查找 root 元素
  let rootElement: HTMLElement
  if (container) {
    // qiankun 环境：在容器中查找或创建 #root
    rootElement = container.querySelector('#root') as HTMLElement
    if (!rootElement) {
      rootElement = document.createElement('div')
      rootElement.id = 'root'
      container.appendChild(rootElement)
    }
  } else {
    // 独立运行：使用原有的 #root
    rootElement = document.getElementById('root')!
  }

  root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <App {...props} />
    </StrictMode>
  )
}

// 使用 vite-plugin-qiankun 的 renderWithQiankun 函数
renderWithQiankun({
  mount(props) {
    console.log('[react-app] mount', props)
    render(props)
  },
  bootstrap() {
    console.log('[react-app] bootstrap')
  },
  unmount(props) {
    console.log('[react-app] unmount', props)
    if (root) {
      root.unmount()
      root = null
    }
  },
  update(props) {
    console.log('[react-app] update', props)
  },
})

// 独立运行时
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  console.log('独立运行时')
  render()
}
