<script setup lang="ts">
import { ref } from 'vue'
import { VkDropdown } from '@/components/dropdown'
import { VkButton } from '@/components/button'
import type { DropdownItem } from '@/components/dropdown'

const last = ref('未选择')
const items: DropdownItem[] = [
  { key: 'edit', label: '编辑' },
  { key: 'duplicate', label: '复制' },
  { key: 'divider', label: '', divider: true },
  { key: 'archive', label: '归档', disabled: true },
  { key: 'delete', label: '删除', danger: true },
]
</script>

<template>
  <div class="demo-stack">
    <VkDropdown :items="items" @select="(key) => (last = key)">
      <template #trigger>
        <VkButton>更多操作</VkButton>
      </template>
    </VkDropdown>
    <p class="result">最近选择：{{ last }}</p>
  </div>
</template>

<style scoped>
.demo-stack {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}

.result {
  margin: 0;
  color: var(--vk-text-color-2);
  font-size: 13px;
}
</style>
