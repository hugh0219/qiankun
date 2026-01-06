<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

// 使用浏览器实际路径，而不是 Vue Router 的路径（因为使用了 createMemoryHistory）
const currentPath = ref(window.location.pathname);

// 监听浏览器路径变化（qiankun 会改变 URL）
const updatePath = () => {
  currentPath.value = window.location.pathname;
  console.log('路径更新:', currentPath.value);
};

// 判断是否是子应用路由
const isMicroApp = computed(() => {
  const path = currentPath.value;
  return (
    path === '/vue' ||
    path === '/react' ||
    path.startsWith('/vue/') ||
    path.startsWith('/react/')
  );
});

onMounted(() => {
  // 监听 popstate 事件（浏览器前进/后退）
  window.addEventListener('popstate', updatePath);

  // 监听 pushstate/replacestate（qiankun 会触发）
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function (...args) {
    originalPushState.apply(history, args);
    updatePath();
  };

  history.replaceState = function (...args) {
    originalReplaceState.apply(history, args);
    updatePath();
  };

  // 初始日志
  console.log(
    '当前浏览器路径:',
    currentPath.value,
    '是否子应用:',
    isMicroApp.value
  );
});

onUnmounted(() => {
  window.removeEventListener('popstate', updatePath);
});
</script>

<template>
  <div>
    <!-- 主应用渲染区：只在非子应用路由时显示 -->
    <div v-if="!isMicroApp">
      <RouterView />
    </div>
    <!-- 子应用渲染区 -->
    <div id="subapp"></div>
  </div>
</template>

<style scoped></style>
