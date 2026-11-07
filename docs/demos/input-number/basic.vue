<script setup lang="ts">
import { ref } from 'vue'
import { VkInputNumber } from '@/components/input-number'

const value = ref<number | null>(3)
const price = ref<number | null>(199)
</script>

<template>
  <div style="display: grid; gap: 12px; width: 240px">
    <VkInputNumber v-model="value" :min="1" :max="10" aria-label="数量" />
    <VkInputNumber
      v-model="price"
      :min="0"
      :max="9999"
      :step="10"
      :precision="2"
      aria-label="价格"
    />
    <VkInputNumber :model-value="5" :controls="false" aria-label="无按钮" />
  </div>
</template>
