import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import qiankun from 'vite-plugin-qiankun'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    qiankun('react-app', {
      useDevMode: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: qiankunWindow.__POWERED_BY_QIANKUN__ ? '/react-app' : '/',
  server: {
    port: 9528,
    cors: true,
    origin: 'http://localhost:9528',
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
})
