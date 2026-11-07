<script setup lang="ts">
import { VkButton } from '@/components/button'
</script>

<template>
  <VkButton type="primary">实心</VkButton>
  <VkButton type="primary" variant="outline">描边</VkButton>
  <VkButton type="primary" variant="ghost">幽灵</VkButton>
  <VkButton type="primary" variant="text">文字</VkButton>
  <VkButton disabled>禁用</VkButton>
</template>
