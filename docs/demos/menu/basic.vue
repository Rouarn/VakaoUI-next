<script setup lang="ts">
import { ref } from 'vue'
import { VkMenu } from '@/components/menu'

const active = ref('dashboard')
const items = [
  { key: 'dashboard', label: '工作台' },
  { key: 'projects', label: '项目' },
  {
    key: 'settings',
    label: '设置',
    children: [
      { key: 'profile', label: '个人资料' },
      { key: 'security', label: '安全' },
      { key: 'notifications', label: '通知', disabled: true },
    ],
  },
]
</script>

<template>
  <div class="wrap">
    <VkMenu v-model="active" :items="items" aria-label="主导航" />
    <p class="result">当前页面：{{ active }}</p>
  </div>
</template>

<style scoped>
.wrap {
  max-width: 260px;
}

.result {
  margin: 12px 0 0;
  color: var(--vk-text-color-2);
  font-size: 13px;
}
</style>
