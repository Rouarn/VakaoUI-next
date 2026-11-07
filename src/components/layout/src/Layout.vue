<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@/core'
import type { LayoutProps, LayoutSlots } from './types'

defineOptions({ name: 'VkLayout' })

const props = withDefaults(defineProps<LayoutProps>(), {
  hasSider: false,
})

defineSlots<LayoutSlots>()

const ns = useNamespace('layout')
const classes = computed(() => [ns.b, { [ns.m('has-sider')]: props.hasSider }])
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
