<script setup lang="ts">
import { ref } from 'vue'
import { VkRadio, VkRadioGroup } from '@/components/radio'

const plan = ref('standard')
const density = ref('comfortable')
</script>

<template>
  <div style="display: grid; gap: 16px">
    <VkRadioGroup v-model="plan" aria-label="套餐">
      <VkRadio value="basic" label="基础版" />
      <VkRadio value="standard" label="标准版" />
      <VkRadio value="pro" label="专业版" />
    </VkRadioGroup>

    <VkRadioGroup v-model="density" direction="vertical" aria-label="密度">
      <VkRadio value="compact" label="紧凑" />
      <VkRadio value="comfortable" label="舒适" />
      <VkRadio value="loose" label="宽松" disabled />
    </VkRadioGroup>
  </div>
</template>
