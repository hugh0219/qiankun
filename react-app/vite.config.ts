import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import qiankun from 'vite-plugin-qiankun';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    qiankun('react-app', {
      useDevMode: true,
    }),
  ],
  server: {
    port: 9528,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    // 在 qiankun 环境下禁用 HMR，避免 HMR 脚本执行出错
    hmr: false,
  },
  build: {
    rollupOptions: {
      output: {
        format: 'umd',
        name: 'react-app',
      },
    },
  },
});
