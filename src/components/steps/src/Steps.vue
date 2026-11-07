<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@/core'
import type { StepStatus, StepsProps, StepsSlots } from './types'

defineOptions({ name: 'VkSteps' })

const props = withDefaults(defineProps<StepsProps>(), {
  items: () => [],
  current: 0,
  status: 'process',
  direction: 'horizontal',
})

defineSlots<StepsSlots>()

const ns = useNamespace('steps')

const classes = computed(() => [ns.b, ns.m(props.direction)])

function statusOf(index: number): StepStatus {
  if (index < props.current) return 'finish'
  if (index === props.current) return props.status
  return 'wait'
}

function slotName(index: number): string {
  return `item-${index}`
}
</script>

<template>
  <ol :class="classes">
    <li
      v-for="(item, index) in items"
      :key="item.key ?? index"
      :class="[ns.e('item'), ns.m(statusOf(index))]"
      :aria-current="index === current ? 'step' : undefined"
    >
      <span :class="ns.e('indicator')" aria-hidden="true">
        <svg
          v-if="statusOf(index) === 'finish'"
          viewBox="0 0 16 16"
          width="12"
          height="12"
          fill="none"
        >
          <path
            d="M3.5 8.4 6.6 11.5 12.5 5"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <svg
          v-else-if="statusOf(index) === 'error'"
          viewBox="0 0 16 16"
          width="10"
          height="10"
          fill="none"
        >
          <path
            d="M4 4l8 8M12 4l-8 8"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
        <template v-else>{{ index + 1 }}</template>
      </span>

      <span :class="ns.e('content')">
        <span :class="ns.e('title')">
          <slot :name="slotName(index)" :item="item">{{ item.title }}</slot>
        </span>
        <span v-if="item.description" :class="ns.e('description')">{{ item.description }}</span>
      </span>
    </li>
  </ol>
</template>
