<script setup lang="ts">
import { VkScrollbar } from '@/components/scrollbar'
</script>

<template>
  <div class="grid">
    <div class="item">
      <p class="label">纵向滚动</p>
      <VkScrollbar class="box" aria-label="纵向滚动示例">
        <div class="list">
          <div v-for="index in 20" :key="index" class="row">第 {{ index }} 条记录</div>
        </div>
      </VkScrollbar>
    </div>

    <div class="item">
      <p class="label">双向滚动</p>
      <VkScrollbar class="box" x-scrollable aria-label="双向滚动示例">
        <div class="canvas">
          <div class="wide">
            <div v-for="index in 12" :key="index" class="cell">单元格 {{ index }}</div>
          </div>
        </div>
      </VkScrollbar>
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 680px;
}

.label {
  margin: 0 0 8px;
  color: var(--vk-text-color-3);
  font-size: 12px;
}

.box {
  height: 180px;
  border: 1px solid var(--vk-border-color);
  border-radius: var(--vk-radius-medium);
}

.list {
  padding: 8px 16px;
}

.row {
  padding: 8px 0;
  border-bottom: 1px dashed var(--vk-divider-color);
  color: var(--vk-text-color-2);
  font-size: 13px;
}

.canvas {
  padding: 12px;
  width: 640px;
}

.wide {
  display: grid;
  grid-template-columns: repeat(4, 140px);
  gap: 8px;
}

.cell {
  padding: 10px;
  border-radius: var(--vk-radius-small);
  background: var(--vk-color-primary-soft);
  color: var(--vk-color-primary);
  font-size: 13px;
  white-space: nowrap;
}
</style>
