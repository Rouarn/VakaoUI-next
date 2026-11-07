<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@/core'
import type { SpaceProps, SpaceSize } from './types'

defineOptions({ name: 'VkSpace' })

const props = withDefaults(defineProps<SpaceProps>(), {
  size: 'small',
  direction: 'horizontal',
  align: 'center',
  wrap: false,
  tag: 'div',
})

const ns = useNamespace('space')

const sizeMap: Record<SpaceSize, number> = {
  small: 8,
  medium: 12,
  large: 16,
}

const gaps = computed<[number, number]>(() => {
  if (Array.isArray(props.size)) return [props.size[0], props.size[1] ?? 0]
  const value = typeof props.size === 'number' ? props.size : sizeMap[props.size]
  return [value, value]
})

const classes = computed(() => [
  ns.b,
  ns.m(props.direction),
  ns.m(`align-${props.align}`),
  { [ns.m('wrap')]: props.wrap },
])

const style = computed(() => ({
  columnGap: `${gaps.value[0]}px`,
  rowGap: `${gaps.value[1]}px`,
}))
</script>

<template>
  <component :is="tag" :class="classes" :style="style">
    <slot />
  </component>
</template>
