<script setup lang="ts">
import { VkEmpty } from '@/components/empty'
import { VkButton } from '@/components/button'
</script>

<template>
  <VkEmpty description="还没有任何项目">
    <template #action>
      <VkButton type="primary">创建第一个项目</VkButton>
    </template>
  </VkEmpty>
</template>
