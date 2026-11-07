<script setup lang="ts">
import { ref } from 'vue'
import { VkButton } from '@/components/button'
import { VkProgress } from '@/components/progress'
import { VkSpace } from '@/components/grid'

const value = ref(36)
</script>

<template>
  <div class="stack">
    <VkProgress :value="value" show-label />
    <VkProgress :value="value" type="circle" />
    <VkSpace>
      <VkButton size="small" @click="value = Math.max(0, value - 10)">-10</VkButton>
      <VkButton size="small" type="primary" @click="value = Math.min(100, value + 10)">
        +10
      </VkButton>
    </VkSpace>
  </div>
</template>

<style scoped>
.stack {
  display: grid;
  justify-items: start;
  gap: 16px;
}
</style>
