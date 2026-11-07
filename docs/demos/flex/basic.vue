<script setup lang="ts">
import { VkButton } from '@/components/button'
import { VkFlex } from '@/components/flex'
import { VkTag } from '@/components/tag'
</script>

<template>
  <div class="stack">
    <VkFlex justify="center" :gap="12" class="panel">
      <VkTag type="info">居中对齐</VkTag>
      <VkTag type="success">等间距</VkTag>
      <VkTag type="warning">gap 12</VkTag>
    </VkFlex>

    <VkFlex justify="space-between" align="center" class="panel">
      <span class="heading">发布清单</span>
      <VkTag type="success">已完成</VkTag>
    </VkFlex>

    <VkFlex vertical :gap="8" class="panel">
      <VkButton size="small">查看文档</VkButton>
      <VkButton size="small" variant="outline">查看源码</VkButton>
    </VkFlex>
  </div>
</template>

<style scoped>
.stack {
  display: grid;
  gap: 16px;
  max-width: 440px;
}

.panel {
  padding: 16px;
  border: 1px solid var(--vk-border-color);
  border-radius: var(--vk-radius-large);
}

.heading {
  color: var(--vk-text-color-1);
  font-weight: 600;
}
</style>
