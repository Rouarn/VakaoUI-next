<script setup lang="ts">
import { ref } from 'vue'
import { VkButton } from '@/components/button'

const count = ref(0)
</script>

<template>
  <VkButton type="primary" @click="count += 1">点了 {{ count }} 次</VkButton>
  <VkButton>默认按钮</VkButton>
</template>
