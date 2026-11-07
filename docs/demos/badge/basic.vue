<script setup lang="ts">
import { VkBadge } from '@/components/badge'
import { VkAvatar } from '@/components/avatar'
import { VkButton } from '@/components/button'
</script>

<template>
  <div class="row">
    <VkBadge :value="5">
      <VkButton>通知</VkButton>
    </VkBadge>
    <VkBadge :value="120">
      <VkAvatar alt="林晚" />
    </VkBadge>
    <VkBadge dot aria-label="有未读消息">
      <VkButton>消息</VkButton>
    </VkBadge>
    <VkBadge :value="0" show-zero>
      <VkButton>草稿</VkButton>
    </VkBadge>
    <VkBadge :value="3" type="success" processing>
      <VkButton>进行中</VkButton>
    </VkBadge>
    <VkBadge value="NEW" type="warning" />
  </div>
</template>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
}
</style>
