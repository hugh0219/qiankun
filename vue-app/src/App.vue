<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="vue-app">
    <nav>
      <router-link to="/">首页</router-link>
      <router-link to="/about">关于</router-link>
    </nav>
    <div class="content">
      <RouterView />
      <div class="footer">
        <p>footer</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
#vue-app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
nav {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: antiquewhite;
  gap: 20px;
}
.content {
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.footer {
  width: 100%;
  height: 50px;
  text-align: center;
  font-weight: bold;
}
</style>
