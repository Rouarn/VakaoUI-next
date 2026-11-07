<script setup lang="ts">
import { ref } from 'vue'
import { VkRate } from '@/components/rate'

const score = ref(3.5)
const plain = ref(4)
</script>

<template>
  <div class="stack">
    <div class="row">
      <VkRate v-model="score" allow-half clearable />
      <span class="value">{{ score.toFixed(1) }}</span>
    </div>
    <div class="row">
      <VkRate v-model="plain" size="large" />
      <span class="value">{{ plain }} / 5</span>
    </div>
    <div class="row">
      <VkRate :model-value="2.5" readonly size="small" />
      <span class="hint">只读</span>
    </div>
    <div class="row">
      <VkRate :model-value="3" disabled />
      <span class="hint">禁用</span>
    </div>
  </div>
</template>

<style scoped>
.stack {
  display: grid;
  gap: 12px;
}

.row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.value {
  color: var(--vk-text-color-2);
  font-family: var(--vk-font-family-mono);
  font-size: 13px;
}

.hint {
  color: var(--vk-text-color-3);
  font-size: 12px;
}
</style>
