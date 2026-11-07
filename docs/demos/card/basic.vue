<script setup lang="ts">
import { VkCard } from '@/components/card'
import { VkLink, VkText } from '@/components/typography'
import { VkTag } from '@/components/tag'
</script>

<template>
  <div class="grid">
    <VkCard title="四色星设计系统" subtitle="2026 秋季更新" hoverable>
      <template #extra>
        <VkTag type="success">稳定</VkTag>
      </template>
      <VkText type="secondary">
        组件只消费 --vk-* 令牌，页面与文档站共用同一套纸面、墨色与四色星语义色。
      </VkText>
      <template #footer>
        <VkLink href="https://ui.woyuxiaji.cn">查看设计令牌</VkLink>
      </template>
    </VkCard>

    <VkCard title="无边框卡片" :bordered="false">
      <VkText>关闭 bordered 后仅保留表面色，适合嵌套在已有容器内。</VkText>
    </VkCard>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  gap: 16px;
  max-width: 440px;
}
</style>
