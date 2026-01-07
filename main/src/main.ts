import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';

import { registerMicroApps, start, type LoadableApp } from 'qiankun';

// 为每个子应用传递 activeRule
const getMicroAppConfig = (name: string, entry: string, activeRule: string) => {
  return {
    name,
    entry,
    container: '#subapp',
    activeRule,
    props: {
      activeRule, // 传递 activeRule 给子应用
    },
  };
};

const app = [
  getMicroAppConfig('react-app', '//localhost:9528', '/react'),
  getMicroAppConfig('vue-app', '//localhost:9529', '/vue'),
];

const loadApp = {
  beforeLoad: async (app: LoadableApp<any>) => {
    console.log('beforeLoad', app.name);
  },
  beforeMount: async (app: LoadableApp<any>) => {
    console.log('beforeMount', app.name);
  },
  afterMount: async (app: LoadableApp<any>) => {
    console.log('afterMount', app.name);
  },
  beforeUnmount: async (app: LoadableApp<any>) => {
    console.log('beforeUnmount', app.name);
  },
  afterUnmount: async (app: LoadableApp<any>) => {
    console.log('afterUnmount', app.name);
  },
};

registerMicroApps(app, loadApp);

start();

createApp(App).use(router).mount('#app');
