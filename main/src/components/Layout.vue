<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 使用浏览器实际路径
const currentPath = ref(window.location.pathname)

// 监听浏览器路径变化
const updatePath = () => {
  currentPath.value = window.location.pathname
}

// 判断是否是子应用路由
const isMicroApp = computed(() => {
  const path = currentPath.value
  return (
    path === '/vue-app' ||
    path === '/react-app' ||
    path.startsWith('/vue-app/') ||
    path.startsWith('/react-app/')
  )
})

// 菜单项配置
const menuItems = [
  { path: '/home', name: '首页', icon: '🏠' },
  { path: '/react-app', name: 'React 子应用', icon: '⚛️' },
  { path: '/vue-app', name: 'Vue 子应用', icon: '💚' },
]

// 导航到指定路径
const navigateTo = (path: string) => {
  if (path.startsWith('/react-app') || path.startsWith('/vue-app')) {
    // 子应用路由，直接修改浏览器 URL
    window.history.pushState({}, '', path)
    updatePath()
  } else {
    // 主应用路由：先修改浏览器 URL 让 qiankun 检测到路径变化并卸载子应用
    // 这对于 React 应用特别重要，因为 React Router 的路由监听器需要被正确清理
    const currentIsMicroApp = isMicroApp.value
    if (currentIsMicroApp) {
      // 如果当前在子应用中，先改变路径让 qiankun 卸载子应用
      window.history.pushState({}, '', path)
      updatePath()
      // 等待下一个事件循环，确保 qiankun 完成卸载后再同步 Vue Router
      setTimeout(() => {
        router.push(path).catch(() => {
          // 忽略路由错误，因为路径已经更新
        })
      }, 0)
    } else {
      // 如果不在子应用中，直接使用 Vue Router
      router.push(path)
    }
  }
}

// 判断菜单项是否激活
const isActive = (path: string) => {
  return currentPath.value === path || currentPath.value.startsWith(path)
}

onMounted(() => {
  window.addEventListener('popstate', updatePath)

  const originalPushState = history.pushState
  const originalReplaceState = history.replaceState

  history.pushState = function (...args) {
    originalPushState.apply(history, args)
    updatePath()
  }

  history.replaceState = function (...args) {
    originalReplaceState.apply(history, args)
    updatePath()
  }
})

onUnmounted(() => {
  window.removeEventListener('popstate', updatePath)
})
</script>

<template>
  <div class="layout-container">
    <!-- 顶部标题栏 -->
    <header class="header">
      <h1 class="title">微前端主应用</h1>
    </header>

    <div class="content-wrapper">
      <!-- 左侧菜单 -->
      <aside class="sidebar">
        <nav class="menu">
          <div
            v-for="item in menuItems"
            :key="item.path"
            :class="['menu-item', { active: isActive(item.path) }]"
            @click="navigateTo(item.path)">
            <span class="menu-icon">{{ item.icon }}</span>
            <span class="menu-text">{{ item.name }}</span>
          </div>
        </nav>
      </aside>

      <!-- 右侧内容区 -->
      <main class="main-content">
        <!-- 主应用内容 -->
        <div v-if="!isMicroApp" class="main-app-content">
          <RouterView />
        </div>
        <!-- 子应用容器 -->
        <div v-show="isMicroApp" id="container" class="container"></div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.header {
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 1px;
}

.content-wrapper {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.sidebar {
  width: 200px;
  background: #f5f5f5;
  border-right: 1px solid #e0e0e0;
  overflow-y: auto;
}

.menu {
  padding: 16px 0;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #333;
  border-left: 3px solid transparent;
}

.menu-item:hover {
  background: #e8e8e8;
  border-left-color: #667eea;
}

.menu-item.active {
  background: #e3e7ff;
  border-left-color: #667eea;
  color: #667eea;
  font-weight: 600;
}

.menu-icon {
  font-size: 18px;
  margin-right: 12px;
  width: 24px;
  text-align: center;
}

.menu-text {
  font-size: 14px;
}

.main-content {
  flex: 1;
  overflow: hidden;
  background: #fff;
  position: relative;
  min-height: 0;
}

.main-app-content {
  width: 100%;
  height: 100%;
  padding: 24px;
  box-sizing: border-box;
  overflow-y: auto;
}

.container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
}

/* 确保 qiankun 创建的包装器铺满容器 */
:deep(.container > div[id*='__qiankun_microapp_wrapper']) {
  width: 100% !important;
  height: 100% !important;
  display: block;
}
</style>

<!-- 非 scoped 样式，确保能应用到 qiankun 动态创建的元素 -->
<style>
#container > div[id*='__qiankun_microapp_wrapper'] {
  width: 100% !important;
  height: 100% !important;
  display: block;
}
</style>
