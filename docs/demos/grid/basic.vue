<script setup lang="ts">
import { VkRow, VkCol, VkSpace } from '@/components/grid'
</script>

<template>
  <VkRow :gutter="[16, 16]">
    <VkCol :span="12"><div class="box">span 12</div></VkCol>
    <VkCol :span="6"><div class="box">span 6</div></VkCol>
    <VkCol :span="6"><div class="box">span 6</div></VkCol>
    <VkCol :span="8" :offset="8"><div class="box">span 8 / offset 8</div></VkCol>
  </VkRow>

  <VkSpace class="space" size="medium" wrap>
    <span class="chip">Space</span>
    <span class="chip">自动间距</span>
    <span class="chip">可换行</span>
  </VkSpace>
</template>

<style scoped>
.box {
  padding: 16px;
  border: 1px solid var(--vk-color-primary);
  border-radius: var(--vk-radius-medium);
  background: var(--vk-color-primary-suppl);
  color: var(--vk-text-color-1);
  font-size: 13px;
  text-align: center;
}

.space {
  margin-top: 16px;
}

.chip {
  padding: 6px 12px;
  border-radius: var(--vk-radius-small);
  background: var(--vk-fill-color);
  font-size: 13px;
}
</style>
