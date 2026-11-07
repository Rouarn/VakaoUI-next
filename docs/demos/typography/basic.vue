<script setup lang="ts">
import { VkLink, VkText, VkTitle, VkTypography } from '@/components/typography'
</script>

<template>
  <div class="stack">
    <VkTitle :level="1">纸面与墨色</VkTitle>
    <VkTitle :level="2">四色星</VkTitle>
    <VkTitle :level="3">朱红主色</VkTitle>
    <VkText type="secondary">次要文本用于补充说明，例如更新时间与来源。</VkText>
    <VkTypography>
      正文里可以组合 <VkText strong>加粗</VkText>、<VkText code>code</VkText> 与
      <VkLink href="https://ui.woyuxiaji.cn" target="_blank">文档链接</VkLink>。
    </VkTypography>
    <VkText type="error">保存失败，请稍后重试。</VkText>
  </div>
</template>

<style scoped>
.stack {
  display: grid;
  gap: 10px;
}
</style>
