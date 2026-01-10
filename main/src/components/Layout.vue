<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { globalMessage, actions } from '@/qiankun'

const router = useRouter()
const inputMessage = ref('')

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

// 发送消息给子应用
const sendMessage = () => {
  if (!inputMessage.value.trim()) return
  if (actions?.setGlobalState) {
    actions.setGlobalState({
      message: inputMessage.value,
    })
  }
  inputMessage.value = ''
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

  // 直接使用 qiankun.ts 中导出的响应式状态
  // 状态更新已经在 qiankun.ts 的监听器中处理
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
      <div class="header-right">
        <div v-if="globalMessage" class="header-message">
          🔔 {{ globalMessage }}
        </div>
        <div class="header-send">
          <input
            v-model="inputMessage"
            placeholder="向子应用发送消息..."
            class="header-input"
            @keyup.enter="sendMessage" />
          <button @click="sendMessage" class="header-send-btn">发送</button>
        </div>
      </div>
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
  justify-content: space-between;
  padding: 0 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-message {
  font-size: 14px;
  opacity: 0.9;
  animation: fadeIn 0.3s;
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.header-send {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-input {
  padding: 6px 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  font-size: 14px;
  width: 200px;
  outline: none;
}

.header-input:focus {
  border-color: rgba(255, 255, 255, 0.6);
  background: white;
}

.header-input::placeholder {
  color: #999;
}

.header-send-btn {
  padding: 6px 16px;
  background: rgba(255, 255, 255, 0.9);
  color: #667eea;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.header-send-btn:hover {
  background: white;
  transform: translateY(-1px);
}

.header-send-btn:active {
  transform: translateY(0);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 0.9;
    transform: translateY(0);
  }
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
