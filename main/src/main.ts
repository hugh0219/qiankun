import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';

import { registerMicroApps, start, type LoadableApp } from 'qiankun';

const app = [
  {
    name: 'react-app', // app name registered
    entry: '//localhost:9528',
    container: '#subapp',
    activeRule: '/react',
  },
  {
    name: 'vue-app',
    entry: '//localhost:9529',
    container: '#subapp',
    activeRule: '/vue',
  },
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
