import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import qiankun from 'vite-plugin-qiankun'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

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
  base: qiankunWindow.__POWERED_BY_QIANKUN__ ? '/vue-app' : '/',
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
})
