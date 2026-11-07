<script setup lang="ts">
defineProps<{ padding?: string }>()
</script>

<template>
  <div class="card" :style="padding ? { padding } : undefined">
    <slot />
  </div>
</template>

<style scoped>
.card {
  box-sizing: border-box;
  padding: 20px;
  border: 1px solid var(--vk-border-color);
  border-radius: var(--vk-radius-large);
  background: var(--vk-color-card);
  box-shadow: var(--vk-shadow-1);
}
</style>
