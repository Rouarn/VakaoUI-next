<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'
import { useNamespace } from '@/core'
import type { DescriptionItem, DescriptionsProps, DescriptionsSlots } from './types'

defineOptions({ name: 'VkDescriptions' })

const props = withDefaults(defineProps<DescriptionsProps>(), {
  items: () => [],
  column: 3,
  bordered: false,
  size: 'medium',
  labelPlacement: 'left',
})

defineSlots<DescriptionsSlots>()

const ns = useNamespace('descriptions')

const columns = computed(() => Math.max(1, props.column))

const classes = computed(() => [
  ns.b,
  ns.m(props.size),
  ns.m(`label-${props.labelPlacement}`),
  { [ns.m('bordered')]: props.bordered },
])

const style = computed(
  () => ({ '--vk-descriptions-columns': String(columns.value) }) as CSSProperties,
)

function spanOf(item: DescriptionItem): number {
  return Math.min(item.span ?? 1, columns.value)
}

function slotName(item: DescriptionItem, index: number): string {
  return `item-${item.key ?? index}`
}
</script>

<template>
  <dl :class="classes" :style="style">
    <div
      v-for="(item, index) in items"
      :key="item.key ?? index"
      :class="ns.e('item')"
      :style="{ gridColumn: `span ${spanOf(item)}` }"
    >
      <dt :class="ns.e('label')">{{ item.label }}</dt>
      <dd :class="ns.e('value')">
        <slot :name="slotName(item, index)">{{ item.value }}</slot>
      </dd>
    </div>
  </dl>
</template>
