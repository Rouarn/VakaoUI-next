<script setup lang="ts">
import { VkTooltip } from '@/components/tooltip'
import { VkButton } from '@/components/button'
</script>

<template>
  <div class="row">
    <VkTooltip content="顶部提示">
      <template #trigger>
        <VkButton>顶部</VkButton>
      </template>
    </VkTooltip>
    <VkTooltip content="底部提示，可容纳多行文本并自动换行" placement="bottom">
      <template #trigger>
        <VkButton>底部</VkButton>
      </template>
    </VkTooltip>
    <VkTooltip content="左侧提示" placement="left">
      <template #trigger>
        <VkButton>左侧</VkButton>
      </template>
    </VkTooltip>
    <VkTooltip content="右侧提示" placement="right">
      <template #trigger>
        <VkButton>右侧</VkButton>
      </template>
    </VkTooltip>
    <VkTooltip content="聚焦时也会显示" :delay="0">
      <template #trigger>
        <VkButton variant="ghost">键盘聚焦</VkButton>
      </template>
    </VkTooltip>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
</style>
