import { createMemoryHistory, createRouter } from 'vue-router';

import HomeView from '@/views/Home.vue';

const routes = [
  { path: '/', component: HomeView },
  // 子应用路由完全由 qiankun 处理，主应用不定义
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
