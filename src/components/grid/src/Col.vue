<script setup lang="ts">
import { computed, inject } from 'vue'
import { useNamespace } from '@/core'
import { rowContextKey } from './context'
import type { ColProps } from './types'

defineOptions({ name: 'VkCol' })

const props = withDefaults(defineProps<ColProps>(), {
  span: 24,
  offset: 0,
  order: undefined,
  tag: 'div',
})

const ns = useNamespace('col')
const row = inject(rowContextKey, null)

const percent = computed(() => `${(Math.min(Math.max(props.span, 0), 24) / 24) * 100}%`)
const offsetPercent = computed(() => `${(Math.min(Math.max(props.offset, 0), 24) / 24) * 100}%`)

const style = computed(() => ({
  flex: `0 0 ${percent.value}`,
  maxWidth: percent.value,
  paddingLeft: row ? `${row.gutter.value[0] / 2}px` : undefined,
  paddingRight: row ? `${row.gutter.value[0] / 2}px` : undefined,
  marginLeft: props.offset ? offsetPercent.value : undefined,
  order: props.order,
}))
</script>

<template>
  <component :is="tag" :class="ns.b" :style="style">
    <slot />
  </component>
</template>
