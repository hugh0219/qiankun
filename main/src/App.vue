<script setup lang="ts">
import Layout from './components/Layout.vue'
import { registerQiankunApps } from '@/qiankun'
import { onMounted } from 'vue'

onMounted(() => {
  // 加载乾坤
  registerQiankunApps()
})
</script>

<template>
  <Layout />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#app {
  width: 100%;
  height: 100%;
}
</style>
