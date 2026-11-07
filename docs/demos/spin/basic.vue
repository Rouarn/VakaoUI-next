<script setup lang="ts">
import { ref } from 'vue'
import { VkSwitch } from '@/components/switch'
import { VkSpin } from '@/components/spin'

const spinning = ref(true)
</script>

<template>
  <VkSwitch v-model="spinning" label="加载中" />
  <VkSpin :spinning="spinning" tip="正在加载数据">
    <div class="panel">这里是一块会随加载状态覆盖的内容。</div>
  </VkSpin>
</template>

<style scoped>
.panel {
  margin-top: 12px;
  padding: 32px;
  border: 1px solid var(--vk-border-color);
  border-radius: var(--vk-radius-medium);
  background: var(--vk-color-card);
}
</style>
