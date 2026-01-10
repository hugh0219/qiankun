import type { MicroAppStateActions, LoadableApp } from 'qiankun'
import { registerMicroApps, start, initGlobalState } from 'qiankun'
import { ref } from 'vue'

// 初始化 state
const initialState = {
  message: 'message', // 消息内容
}

// 导出 actions，供主应用组件使用
export const actions: MicroAppStateActions = initGlobalState(initialState)

// 创建一个响应式的全局消息状态，供主应用使用
export const globalMessage = ref('')

export function registerQiankunApps() {
  const loadApp = {
    beforeLoad: async (app: LoadableApp<any>) => {
      console.log('beforeLoad', app.name)
    },
    beforeMount: async (app: LoadableApp<any>) => {
      console.log('beforeMount', app.name)
    },
    afterMount: async (app: LoadableApp<any>) => {
      console.log('afterMount', app.name)
    },
    beforeUnmount: async (app: LoadableApp<any>) => {
      console.log('beforeUnmount', app.name)
    },
    afterUnmount: async (app: LoadableApp<any>) => {
      console.log('afterUnmount', app.name)
    },
  }

  registerMicroApps(
    [
      {
        name: 'react-app', // app name registered
        entry: '//localhost:9528', // 入口地址
        container: '#container', // 子应用挂在id
        activeRule: '/react-app', // 路由跳转规则
        props: {
          activeRule: '/react-app',
        },
      },
      {
        name: 'vue-app', // app name registered
        entry: '//localhost:9529', // 入口地址
        container: '#container', // 子应用挂在id
        activeRule: '/vue-app', // 路由跳转规则
        props: {
          activeRule: '/vue-app',
        },
      },
    ],
    loadApp
  )

  // 启动微前端
  start({
    prefetch: 'all', // 预加载
    sandbox: {
      strictStyleIsolation: false, // 严格样式隔离
      experimentalStyleIsolation: true, // 开启沙盒模式
    },
  })

  // 在 start 之后注册监听器，确保 qiankun 完全初始化
  console.log('[主应用 qiankun.ts] 注册全局状态监听器, actions:', actions)
  actions.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log('[主应用 qiankun.ts] 全局状态变化:', state, '之前的状态:', prev)
    console.log(
      '[主应用 qiankun.ts] state 类型:',
      typeof state,
      'state.message:',
      state?.message
    )
    // 更新响应式状态
    if (state && typeof state.message === 'string') {
      globalMessage.value = state.message
      console.log('[主应用 qiankun.ts] 更新 globalMessage:', state.message)
    } else {
      console.log('[主应用 qiankun.ts] 状态格式不正确，无法更新消息')
    }
  })
}
