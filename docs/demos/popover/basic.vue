<script setup lang="ts">
import { VkPopover } from '@/components/popover'
import { VkButton } from '@/components/button'
</script>

<template>
  <div class="row">
    <VkPopover title="项目说明" content="点击触发，Esc 或点击外部关闭。">
      <template #trigger>
        <VkButton>点击查看</VkButton>
      </template>
    </VkPopover>

    <VkPopover trigger="hover" content="鼠标移入显示，移出关闭。">
      <template #trigger>
        <VkButton type="primary">悬停查看</VkButton>
      </template>
    </VkPopover>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
