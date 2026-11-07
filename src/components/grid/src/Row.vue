<script setup lang="ts">
import { computed, provide } from 'vue'
import { useNamespace } from '@/core'
import { rowContextKey } from './context'
import type { RowProps } from './types'

defineOptions({ name: 'VkRow' })

const props = withDefaults(defineProps<RowProps>(), {
  gutter: 0,
  justify: 'start',
  align: 'top',
  wrap: true,
  tag: 'div',
})

const ns = useNamespace('row')

const gutter = computed<[number, number]>(() =>
  Array.isArray(props.gutter) ? [props.gutter[0], props.gutter[1] ?? 0] : [props.gutter, 0],
)

provide(rowContextKey, { gutter })

const classes = computed(() => [
  ns.b,
  ns.m(`justify-${props.justify}`),
  ns.m(`align-${props.align}`),
  { [ns.m('nowrap')]: !props.wrap },
])

const style = computed(() => ({
  marginLeft: `${-gutter.value[0] / 2}px`,
  marginRight: `${-gutter.value[0] / 2}px`,
  rowGap: `${gutter.value[1]}px`,
}))
</script>

<template>
  <component :is="tag" :class="classes" :style="style">
    <slot />
  </component>
</template>
