<script setup lang="ts">
import { ref } from 'vue'
import { VkButton } from '@/components/button'
import { VkList, type ListItem } from '@/components/list'

const loading = ref(false)

const members: ListItem[] = [
  {
    key: 'lin',
    title: '林小满',
    description: '产品设计师 · 杭州 · 负责设计系统与组件规范',
    extra: '在线',
  },
  {
    key: 'zhao',
    title: '赵启明',
    description: '前端工程师 · 上海 · 负责组件库基础设施',
    extra: '忙碌',
  },
  {
    key: 'chen',
    title: '陈屿',
    description: '数据分析师 · 深圳 · 负责增长指标、用户行为分析与数据看板建设',
    extra: '离线',
  },
  { key: 'zhou', title: '周予安', description: '内容运营 · 成都', extra: '在线' },
]
</script>

<template>
  <div class="demo-stack">
    <VkList bordered hoverable selected-key="lin" :items="members" :loading="loading" />

    <div class="demo-actions">
      <VkButton @click="loading = !loading">{{ loading ? '结束加载' : '模拟加载' }}</VkButton>
    </div>
  </div>
</template>

<style scoped>
.demo-stack {
  display: flex;
  flex-direction: column;
  gap: var(--vk-space-3);
  width: 100%;
  max-width: 520px;
}

.demo-actions {
  display: flex;
  gap: var(--vk-space-2);
}
</style>
