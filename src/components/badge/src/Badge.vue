<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { useNamespace } from '@/core'
import type { BadgeProps, BadgeSlots } from './types'

defineOptions({ name: 'VkBadge' })

const props = withDefaults(defineProps<BadgeProps>(), {
  value: undefined,
  max: 99,
  dot: false,
  type: 'primary',
  showZero: false,
  processing: false,
  ariaLabel: undefined,
})

defineSlots<BadgeSlots>()

const ns = useNamespace('badge')
const slots = useSlots()

const isHidden = computed(() => {
  if (props.dot) return false
  if (props.value === undefined || props.value === '') return true
  return Number(props.value) === 0 && !props.showZero
})

const displayValue = computed(() => {
  if (props.dot) return ''
  if (typeof props.value === 'number' && props.value > props.max) return `${props.max}+`
  return String(props.value ?? '')
})

const classes = computed(() => [
  ns.b,
  {
    [ns.m('standalone')]: !slots.default,
    [ns.m('dot')]: props.dot,
    [ns.m('processing')]: props.processing,
  },
])

const badgeClasses = computed(() => [ns.e('badge'), ns.m(props.type)])
</script>

<template>
  <span :class="classes">
    <slot />
    <span
      v-if="!isHidden"
      :class="badgeClasses"
      :aria-label="ariaLabel"
      :role="ariaLabel ? 'status' : undefined"
    >
      <template v-if="!dot">{{ displayValue }}</template>
    </span>
  </span>
</template>
