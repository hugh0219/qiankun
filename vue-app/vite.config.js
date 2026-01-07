import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import qiankun from 'vite-plugin-qiankun';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    qiankun('vue-app', {
      useDevMode: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 9529,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  build: {
    rollupOptions: {
      output: {
        format: 'umd',
        name: 'vue-app',
      },
    },
  },
});
