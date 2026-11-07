<script setup lang="ts">
import { ref } from 'vue'
import { VkSelect } from '@/components/select'
import type { SelectOption } from '@/components/select'

const options: SelectOption[] = [
  { label: '杭州', value: 'hangzhou' },
  { label: '上海', value: 'shanghai' },
  { label: '深圳', value: 'shenzhen' },
  { label: '成都（暂未开通）', value: 'chengdu', disabled: true },
]

const city = ref<string | number | null>('hangzhou')
</script>

<template>
  <div class="demo-stack">
    <div class="field">
      <VkSelect v-model="city" :options="options" clearable aria-label="城市" />
    </div>
    <p class="result">当前选择：{{ city ?? '未选择' }}</p>
  </div>
</template>

<style scoped>
.demo-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 320px;
}

.field {
  width: 100%;
}

.result {
  margin: 0;
  color: var(--vk-text-color-2);
  font-size: 13px;
}
</style>
