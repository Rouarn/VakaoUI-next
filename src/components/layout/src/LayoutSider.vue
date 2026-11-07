<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@/core'
import type { LayoutSectionSlots, LayoutSiderProps } from './types'

defineOptions({ name: 'VkLayoutSider' })

const props = withDefaults(defineProps<LayoutSiderProps>(), {
  width: 220,
  collapsedWidth: 64,
  collapsed: false,
  bordered: true,
})

defineSlots<LayoutSectionSlots>()

const ns = useNamespace('layout')

function toCssSize(value: number | string): string {
  return typeof value === 'number' ? `${value}px` : value
}

const style = computed(() => {
  const width = toCssSize(props.collapsed ? props.collapsedWidth : props.width)
  return { width, flexBasis: width }
})

const classes = computed(() => [ns.e('sider'), { [ns.m('bordered')]: props.bordered }])
</script>

<template>
  <aside :class="classes" :style="style" :aria-expanded="!collapsed">
    <slot />
  </aside>
</template>
