<script setup lang="ts"></script>

<template>
  <div class="home-container">
    <div class="welcome-card">
      <h2>欢迎使用微前端主应用</h2>
      <p class="description">
        这是一个基于 qiankun 的微前端架构示例，支持多个子应用的集成和管理。
      </p>

      <div class="features">
        <div class="feature-item">
          <div class="feature-icon">🚀</div>
          <div class="feature-content">
            <h3>独立开发</h3>
            <p>每个子应用可以独立开发、测试和部署</p>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">🔧</div>
          <div class="feature-content">
            <h3>技术栈无关</h3>
            <p>支持 React、Vue 等不同技术栈的子应用</p>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">📦</div>
          <div class="feature-content">
            <h3>按需加载</h3>
            <p>子应用按需加载，提升应用性能</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-card {
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.welcome-card h2 {
  font-size: 28px;
  color: #333;
  margin-bottom: 16px;
}

.description {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 32px;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-top: 32px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 32px;
  margin-right: 16px;
}

.feature-content h3 {
  font-size: 18px;
  color: #333;
  margin-bottom: 8px;
}

.feature-content p {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin: 0;
}
</style>
