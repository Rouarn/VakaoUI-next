<script setup lang="ts">
import { VkResult } from '@/components/result'
import { VkButton } from '@/components/button'
import { VkText } from '@/components/typography'
</script>

<template>
  <div class="grid">
    <VkResult status="success" title="已发布" description="0.1.0 已覆盖发布到私有仓库。">
      <template #extra>
        <VkButton>查看变更</VkButton>
      </template>
    </VkResult>

    <VkResult status="404" description="链接可能已失效，或文档已迁移。">
      <template #extra>
        <VkButton variant="outline">返回文档首页</VkButton>
      </template>
    </VkResult>

    <VkResult status="error" title="构建失败" description="类型检查未通过，请先修复以下问题。">
      <VkText type="secondary">components/tooltip/src/Tooltip.vue</VkText>
    </VkResult>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  border: 1px solid var(--vk-border-color);
  border-radius: var(--vk-radius-large);
}
</style>
