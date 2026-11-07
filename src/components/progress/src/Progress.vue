<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@/core'
import type { ProgressProps, ProgressSlots } from './types'

defineOptions({ name: 'VkProgress' })

const props = withDefaults(defineProps<ProgressProps>(), {
  value: 0,
  type: 'line',
  status: 'normal',
  showLabel: true,
  strokeWidth: 8,
  size: 96,
  format: undefined,
})

defineSlots<ProgressSlots>()

const ns = useNamespace('progress')

const percent = computed(() => Math.min(100, Math.max(0, Number(props.value) || 0)))
const label = computed(() =>
  props.format ? props.format(percent.value) : `${Math.round(percent.value)}%`,
)

const isCircle = computed(() => props.type === 'circle')
const radius = computed(() => (props.size - props.strokeWidth) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const dashOffset = computed(() => circumference.value * (1 - percent.value / 100))

const classes = computed(() => [ns.b, ns.m(props.type), ns.m(props.status)])
</script>

<template>
  <div
    :class="classes"
    role="progressbar"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-valuenow="Math.round(percent)"
  >
    <template v-if="isCircle">
      <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`" aria-hidden="true">
        <circle
          :class="ns.e('circle-track')"
          :cx="size / 2"
          :cy="size / 2"
          :r="radius"
          fill="none"
          :stroke-width="strokeWidth"
        />
        <circle
          :class="ns.e('circle-fill')"
          :cx="size / 2"
          :cy="size / 2"
          :r="radius"
          fill="none"
          :stroke-width="strokeWidth"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="dashOffset"
          stroke-linecap="round"
        />
      </svg>
      <span v-if="showLabel || $slots.default" :class="ns.e('label')">
        <slot :value="percent">{{ label }}</slot>
      </span>
    </template>

    <template v-else>
      <div :class="ns.e('track')">
        <div :class="ns.e('fill')" :style="{ width: `${percent}%`, height: `${strokeWidth}px` }" />
      </div>
      <span v-if="showLabel || $slots.default" :class="ns.e('label')">
        <slot :value="percent">{{ label }}</slot>
      </span>
    </template>
  </div>
</template>
