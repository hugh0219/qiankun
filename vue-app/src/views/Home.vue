<template>
  <div>
    <HelloWorld msg="子应用vue3" />

    <!-- 简单的通信功能 -->
    <div v-if="actions" class="comm-box">
      <h3>🔔 通信功能</h3>
      <div class="comm-input">
        <input v-model="inputMessage" placeholder="输入消息..." />
        <button @click="sendMessage">发送</button>
      </div>
      <div class="comm-messages">
        <div v-if="messages.length === 0" class="msg-empty">暂无消息</div>
        <div v-for="(msg, i) in messages" :key="i" class="msg-item">
          <span class="msg-from">{{ msg.from }}:</span>
          <span class="msg-content">{{ msg.content }}</span>
          <span class="msg-time">{{ msg.time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'

const providedActions = inject('qiankunActions', null)
const actions = providedActions

const inputMessage = ref('')
const messages = ref<Array<{ from: string; content: string; time: string }>>([])

const handleGlobalStateChange = (state: any) => {
  if (state.message) {
    messages.value.unshift({
      from: 'Vue 子应用',
      content: String(state.message),
      time: new Date().toLocaleTimeString(),
    })
    if (messages.value.length > 5) messages.value.pop()
  }
}

const sendMessage = () => {
  if (!actions || !inputMessage.value.trim()) return
  actions.setGlobalState({
    message: inputMessage.value,
  })
  inputMessage.value = ''
}

onMounted(() => {
  if (!actions) {
    return
  }
  actions.onGlobalStateChange((state, prev) => {
    handleGlobalStateChange(state)
  })
})
</script>

<style scoped>
.comm-box {
  margin-top: 20px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.comm-box h3 {
  margin: 0 0 12px 0;
  font-size: 16px;
}

.comm-input {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.comm-input input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.comm-input button {
  padding: 8px 20px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.comm-input button:hover {
  background: #35a372;
}

.comm-messages {
  max-height: 150px;
  overflow-y: auto;
  padding: 8px;
  background: white;
  border-radius: 4px;
  margin-bottom: 8px;
  font-size: 13px;
}

.msg-item {
  padding: 4px 0;
  border-bottom: 1px solid #f0f0f0;
}

.msg-from {
  font-weight: 600;
  color: #42b983;
  margin-right: 8px;
}

.msg-content {
  color: #333;
  margin-right: 8px;
}

.msg-time {
  color: #999;
  font-size: 11px;
}

.msg-empty {
  text-align: center;
  color: #999;
  padding: 10px;
}

.comm-state {
  font-size: 12px;
  color: #666;
}
</style>
