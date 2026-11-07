<script setup lang="ts">
import { computed, ref } from 'vue'
import { VkCheckbox } from '@/components/checkbox'

const items = ['邮件', '短信', '应用内']
const checked = ref<string[]>(['邮件'])

const allChecked = computed(() => checked.value.length === items.length)
const indeterminate = computed(() => checked.value.length > 0 && !allChecked.value)

function toggleAll(value: boolean): void {
  checked.value = value ? [...items] : []
}

function toggle(item: string, value: boolean): void {
  checked.value = value ? [...checked.value, item] : checked.value.filter((i) => i !== item)
}
</script>

<template>
  <div style="display: grid; gap: 12px">
    <VkCheckbox
      :model-value="allChecked"
      :indeterminate="indeterminate"
      label="全选"
      @update:model-value="toggleAll"
    />
    <VkCheckbox
      v-for="item in items"
      :key="item"
      :model-value="checked.includes(item)"
      :label="item"
      @update:model-value="toggle(item, $event)"
    />
    <VkCheckbox disabled label="不可选" />
  </div>
</template>
