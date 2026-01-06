import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import {
  renderWithQiankun,
  qiankunWindow,
} from 'vite-plugin-qiankun/dist/helper';

let app = null;

function render(props = {}) {
  const { container } = props;
  app = createApp(App);
  app.use(router);
  app.mount(container ? container.querySelector('#app') : '#app');
}

// 使用 vite-plugin-qiankun 的 renderWithQiankun 函数
renderWithQiankun({
  mount(props) {
    console.log('[vue-app] mount', props);
    render(props);
  },
  bootstrap() {
    console.log('[vue-app] bootstrap');
  },
  unmount(props) {
    console.log('[vue-app] unmount', props);
    if (app) {
      app.unmount();
      app = null;
    }
  },
});

// 独立运行时
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  console.log('独立运行时');
  render();
}
