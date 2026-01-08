import type { MicroAppStateActions, LoadableApp } from 'qiankun'
import { registerMicroApps, start, initGlobalState } from 'qiankun'

// 初始化 state
const state = {
  token: 'r797355672jiofpopifh', //模拟的token
}
const actions: MicroAppStateActions = initGlobalState(state)

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
          // 传递参数
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
  // 父子通信
  actions.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log('父', state, prev)
  })
  // 模拟请求
  setTimeout(() => {
    actions.setGlobalState({ ...state, age: '18' })
  }, 2000)
  // 关闭乾坤全局状态监听
  actions.offGlobalStateChange()
}
