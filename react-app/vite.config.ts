import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 9528,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  // // 动态设置 publicPath（qiankun 会注入 __INJECTED_PUBLIC_PATH_BY_QIANKUN__ 变量）
  base: process.env.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ || '/',
  build: {
    rollupOptions: {
      output: {
        format: 'umd',
      },
    },
  },
});
