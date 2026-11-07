<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@/core'
import type { StatisticProps, StatisticSlots } from './types'

defineOptions({ name: 'VkStatistic' })

const props = withDefaults(defineProps<StatisticProps>(), {
  label: undefined,
  value: 0,
  precision: undefined,
  prefix: undefined,
  suffix: undefined,
  groupSeparator: ',',
  tabularNumbers: true,
})

defineSlots<StatisticSlots>()

const ns = useNamespace('statistic')

const classes = computed(() => [ns.b, { [ns.m('tabular')]: props.tabularNumbers }])

const formatted = computed(() => {
  if (typeof props.value !== 'number') return props.value

  const fixed =
    props.precision === undefined ? String(props.value) : props.value.toFixed(props.precision)
  const [integer, decimal] = fixed.split('.')
  const negative = integer.startsWith('-')
  const digits = negative ? integer.slice(1) : integer
  const grouped = digits.replace(/\B(?=(\d{3})+(?!\d))/g, () => props.groupSeparator)

  return `${negative ? '-' : ''}${grouped}${decimal === undefined ? '' : `.${decimal}`}`
})
</script>

<template>
  <div :class="classes" role="group" :aria-label="label">
    <div v-if="label || $slots.label" :class="ns.e('label')">
      <slot name="label">{{ label }}</slot>
    </div>

    <div :class="ns.e('value')">
      <span v-if="prefix || $slots.prefix" :class="ns.e('prefix')">
        <slot name="prefix">{{ prefix }}</slot>
      </span>
      {{ formatted }}
      <span v-if="suffix || $slots.suffix" :class="ns.e('suffix')">
        <slot name="suffix">{{ suffix }}</slot>
      </span>
    </div>
  </div>
</template>
