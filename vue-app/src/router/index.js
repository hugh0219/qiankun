import { createRouter, createMemoryHistory } from 'vue-router';
import Home from '@/views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
];

// qiankun 子应用使用 memory history，避免与主应用路由冲突
const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
