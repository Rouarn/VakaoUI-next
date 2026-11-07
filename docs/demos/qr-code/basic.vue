<script setup lang="ts">
import { ref } from 'vue'
import { VkInput } from '@/components/input'
import { VkQrCode } from '@/components/qr-code'

const value = ref('https://ui.woyuxiaji.cn/')
</script>

<template>
  <div class="demo">
    <VkQrCode :value="value" :size="152" />
    <div class="field">
      <VkInput v-model="value" placeholder="输入链接或文本" />
      <p class="hint">编码结果随输入实时更新，支持中文与链接。</p>
    </div>
  </div>
</template>

<style scoped>
.demo {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 20px;
}

.field {
  flex: 1;
  min-width: 220px;
  max-width: 320px;
}

.hint {
  margin: 8px 0 0;
  color: var(--vk-text-color-3);
  font-size: 12px;
  line-height: var(--vk-line-height-snug);
}
</style>
