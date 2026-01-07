import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
]

// 创建路由实例的函数，支持动态 base
export function createAppRouter(base = '/') {
  return createRouter({
    history: createWebHistory(base),
    routes,
  })
}

// 默认导出，用于独立运行
export default createAppRouter()
