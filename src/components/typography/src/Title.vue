<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@/core'
import type { TitleProps, TitleSlots } from './types'

defineOptions({ name: 'VkTitle' })

const props = withDefaults(defineProps<TitleProps>(), {
  level: 1,
  type: 'default',
  align: 'start',
})

defineSlots<TitleSlots>()

const ns = useNamespace('title')

const tag = computed(() => `h${props.level}`)
const classes = computed(() => [
  ns.b,
  ns.m(String(props.level)),
  ns.m(props.type),
  ns.m(props.align),
])
</script>

<template>
  <component :is="tag" :class="classes">
    <slot />
  </component>
</template>
