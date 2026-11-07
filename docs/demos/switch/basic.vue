<script setup lang="ts">
import { ref } from 'vue'
import { VkSwitch } from '@/components/switch'

const notify = ref(true)
const dark = ref(false)
const locked = ref(true)
</script>

<template>
  <div style="display: grid; gap: 12px">
    <VkSwitch v-model="notify" label="接收通知" />
    <VkSwitch v-model="dark" label="暗色模式" size="small" />
    <VkSwitch v-model="locked" label="已锁定" disabled />
    <VkSwitch :model-value="false" loading label="正在保存" />
  </div>
</template>
