<script setup lang="ts">
import { ref } from 'vue'
import { VkInput } from '@/components/input'

const text = ref('')
const search = ref('')
</script>

<template>
  <div style="display: grid; gap: 12px; width: 320px">
    <VkInput v-model="text" textarea :rows="3" :maxlength="80" show-count placeholder="多行输入" />
    <VkInput v-model="search" type="search" placeholder="带前后缀" clearable>
      <template #prefix>⌕</template>
      <template #suffix>搜索</template>
    </VkInput>
  </div>
</template>
