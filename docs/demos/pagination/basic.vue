<script setup lang="ts">
import { ref } from 'vue'
import { VkPagination } from '@/components/pagination'

const current = ref(1)
const pageSize = ref(10)
</script>

<template>
  <VkPagination
    v-model:current="current"
    v-model:page-size="pageSize"
    :total="236"
    show-size-changer
  />
  <p class="result">第 {{ current }} 页，每页 {{ pageSize }} 条</p>
</template>

<style scoped>
.result {
  margin: 12px 0 0;
  color: var(--vk-text-color-2);
  font-size: 13px;
}
</style>
