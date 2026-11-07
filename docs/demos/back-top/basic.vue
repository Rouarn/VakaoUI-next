<script setup lang="ts">
import { VkBackTop } from '@/components/back-top'
</script>

<template>
  <div class="wrapper">
    <div id="back-top-demo-scroll" class="scroller">
      <div v-for="index in 12" :key="index" class="row">
        第 {{ index }} 行内容，向下滚动查看右下角按钮
      </div>
    </div>
    <VkBackTop
      target="#back-top-demo-scroll"
      position="absolute"
      :right="16"
      :bottom="16"
      :visibility-height="80"
    />
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
  max-width: 560px;
}

.scroller {
  box-sizing: border-box;
  height: 200px;
  padding: 4px 16px;
  overflow-y: auto;
  border: 1px solid var(--vk-border-color);
  border-radius: var(--vk-radius-large);
}

.row {
  padding: 10px 0;
  border-bottom: 1px dashed var(--vk-divider-color);
  color: var(--vk-text-color-2);
  font-size: 13px;
}
</style>
