<script setup lang="ts">
import { ref } from 'vue'
import { VkSlider } from '@/components/slider'

const volume = ref(40)
const opacity = ref(70)
</script>

<template>
  <div style="display: grid; gap: 24px; width: 320px">
    <VkSlider v-model="volume" aria-label="音量" :format-tooltip="(v) => `${v}%`" />
    <VkSlider v-model="opacity" :min="0" :max="100" :step="5" aria-label="不透明度" />
    <VkSlider :model-value="30" disabled aria-label="禁用" />
  </div>
</template>
