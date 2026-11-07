<script setup lang="ts">
import { VkAvatar } from '@/components/avatar'

const portrait = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
    <rect width="80" height="80" fill="#FBEDE8"/>
    <circle cx="40" cy="32" r="14" fill="#C43A21"/>
    <path d="M12 80c4-19 15-28 28-28s24 9 28 28Z" fill="#F0995F"/>
  </svg>`,
)}`
</script>

<template>
  <div class="row">
    <VkAvatar :src="portrait" alt="林晚" size="large" />
    <VkAvatar :src="portrait" alt="林晚" size="large" round />
    <VkAvatar alt="周野" />
    <VkAvatar alt="周野" round size="small" />
    <VkAvatar alt="VaKao" size="small" color="var(--vk-color-primary)" />
  </div>
</template>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
</style>
