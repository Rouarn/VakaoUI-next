<script setup lang="ts">
import { VkDivider } from '@/components/divider'
import { VkText } from '@/components/typography'
</script>

<template>
  <div class="stack">
    <VkDivider>默认居中</VkDivider>
    <VkDivider title-placement="left">左对齐标题</VkDivider>
    <VkDivider title-placement="right" plain>右对齐 · 次要样式</VkDivider>
    <VkDivider dashed />
    <div class="row">
      <VkText>文本</VkText>
      <VkDivider type="vertical" />
      <VkText type="secondary">次要文本</VkText>
      <VkDivider type="vertical" dashed />
      <VkText type="secondary">虚线分隔</VkText>
    </div>
  </div>
</template>

<style scoped>
.stack {
  display: grid;
  gap: 4px;
}

.row {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
