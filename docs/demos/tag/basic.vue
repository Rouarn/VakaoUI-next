<script setup lang="ts">
import { ref } from 'vue'
import { VkTag } from '@/components/tag'

const tags = ref([
  { key: 'design', label: '设计', type: 'primary' as const },
  { key: 'build', label: '构建', type: 'info' as const },
  { key: 'stable', label: '稳定', type: 'success' as const },
  { key: 'deprecated', label: '待迁移', type: 'warning' as const },
])

function remove(key: string): void {
  tags.value = tags.value.filter((tag) => tag.key !== key)
}
</script>

<template>
  <div class="stack">
    <div class="row">
      <VkTag v-for="tag in tags" :key="tag.key" :type="tag.type" closable @close="remove(tag.key)">
        {{ tag.label }}
      </VkTag>
    </div>
    <div class="row">
      <VkTag>默认</VkTag>
      <VkTag round>圆角</VkTag>
      <VkTag :bordered="false" type="error">无边框</VkTag>
      <VkTag size="small">小号</VkTag>
      <VkTag size="large" type="primary">大号</VkTag>
      <VkTag disabled>禁用</VkTag>
    </div>
  </div>
</template>

<style scoped>
.stack {
  display: grid;
  gap: 12px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}
</style>
