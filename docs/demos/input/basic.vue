<script setup lang="ts">
import { ref } from 'vue'
import { VkInput } from '@/components/input'

const value = ref('')
const email = ref('not-an-email')
</script>

<template>
  <div style="display: grid; gap: 12px; width: 320px">
    <VkInput v-model="value" placeholder="基础输入框" clearable />
    <VkInput v-model="email" status="error" placeholder="带错误态的输入框" />
    <VkInput model-value="只读内容" readonly />
    <VkInput model-value="禁用内容" disabled />
  </div>
</template>
