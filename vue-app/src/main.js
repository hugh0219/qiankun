import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createAppRouter } from './router'
import {
  renderWithQiankun,
  qiankunWindow,
} from 'vite-plugin-qiankun/dist/helper'

let app = null
let router = null

function render(props) {
  console.log('子应用props==', props)
  app = createApp(App)
  if (props) {
    const { container, activeRule, onGlobalStateChange, setGlobalState } = props
    // 通过 provide 传递 actions
    app.provide('qiankunActions', { onGlobalStateChange, setGlobalState })
    router = createAppRouter(activeRule || '/')
    app.use(router)
    app.mount(container ? container.querySelector('#app') : '#app')
  } else {
    router = createAppRouter('/')
    app.use(router)
    app.mount('#app')
  }
}

// 使用 vite-plugin-qiankun 的 renderWithQiankun 函数
renderWithQiankun({
  mount(props) {
    console.log('[vue-app] mount', props)
    render(props)
  },
  bootstrap() {
    console.log('[vue-app] bootstrap')
  },
  unmount(props) {
    console.log('[vue-app] unmount', props)
    if (app) {
      app.unmount()
      app = null
    }
  },
  update(props) {
    console.log('[vue-app] update', props)
    // 如果需要支持更新，可以在这里重新渲染
  },
})

// 独立运行时
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  console.log('独立运行时')
  render()
}
