<script setup lang="ts">
import { ref } from 'vue'
import { VkSkeleton } from '@/components/skeleton'
import { VkSwitch } from '@/components/switch'

const loading = ref(true)
</script>

<template>
  <VkSwitch v-model="loading" label="显示骨架屏" />
  <VkSkeleton :loading="loading" :rows="3" avatar>
    <p>内容加载完成后，骨架屏会被真实内容替换。</p>
  </VkSkeleton>
</template>
