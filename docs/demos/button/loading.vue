<script setup lang="ts">
import { ref } from 'vue'
import { VkButton } from '@/components/button'

const loading = ref(false)

function submit(): void {
  loading.value = true
  window.setTimeout(() => {
    loading.value = false
  }, 1200)
}
</script>

<template>
  <VkButton type="primary" :loading="loading" @click="submit">
    {{ loading ? '提交中' : '提交' }}
  </VkButton>
  <VkButton size="small" type="primary" :loading="loading">小号</VkButton>
  <VkButton size="large" type="primary" :loading="loading">大号</VkButton>
</template>
