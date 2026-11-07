<script setup lang="ts">
import { ref } from 'vue'
import { VkButton } from '@/components/button'
import { VkDrawer } from '@/components/drawer'

const rightOpen = ref(false)
const bottomOpen = ref(false)
</script>

<template>
  <div class="demo-actions">
    <VkButton type="primary" @click="rightOpen = true">打开右侧抽屉</VkButton>
    <VkButton @click="bottomOpen = true">打开底部抽屉</VkButton>
  </div>

  <VkDrawer v-model:open="rightOpen" title="成员详情">
    <p>这里可以放成员资料、权限设置等内容。</p>
    <p>标题右侧可以放操作入口，底部用于承载保存与取消。</p>
    <template #footer>
      <VkButton @click="rightOpen = false">取消</VkButton>
      <VkButton type="primary" @click="rightOpen = false">保存</VkButton>
    </template>
  </VkDrawer>

  <VkDrawer v-model:open="bottomOpen" title="快捷操作" placement="bottom" :height="240">
    <p>底部抽屉适合放置操作面板或简短说明。</p>
    <template #footer>
      <VkButton @click="bottomOpen = false">关闭</VkButton>
    </template>
  </VkDrawer>
</template>

<style scoped>
.demo-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--vk-space-2);
}
</style>
