<script setup lang="ts">
import { computed, ref } from 'vue'
import { useLocale, useNamespace } from '@/core'
import type { RateEmits, RateProps } from './types'

defineOptions({ name: 'VkRate' })

const props = withDefaults(defineProps<RateProps>(), {
  modelValue: 0,
  count: 5,
  allowHalf: false,
  clearable: false,
  disabled: false,
  readonly: false,
  size: 'medium',
  ariaLabel: undefined,
})

const emit = defineEmits<RateEmits>()

const ns = useNamespace('rate')
const locale = useLocale()
const hover = ref<number | null>(null)

const classes = computed(() => [
  ns.b,
  ns.m(props.size),
  {
    [ns.m('disabled')]: props.disabled,
    [ns.m('readonly')]: props.readonly,
  },
])

const display = computed(() => hover.value ?? props.modelValue)

function fraction(index: number): number {
  return Math.min(1, Math.max(0, display.value - index))
}

function valueAt(event: MouseEvent, index: number): number {
  if (!props.allowHalf) return index + 1
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  return index + (event.clientX - rect.left < rect.width / 2 ? 0.5 : 1)
}

function commit(value: number): void {
  if (props.disabled || props.readonly) return
  const clamped = Math.max(0, Math.min(props.count, value))
  const next = props.clearable && clamped === props.modelValue ? 0 : clamped
  emit('update:modelValue', next)
  emit('change', next)
}

function onClick(event: MouseEvent, index: number): void {
  commit(valueAt(event, index))
}

function onMove(event: MouseEvent, index: number): void {
  if (props.disabled || props.readonly) return
  hover.value = valueAt(event, index)
}

function onKeydown(event: KeyboardEvent): void {
  if (props.disabled || props.readonly) return

  const step = props.allowHalf ? 0.5 : 1
  const nextValue = (): number | null => {
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        return props.modelValue + step
      case 'ArrowLeft':
      case 'ArrowDown':
        return props.modelValue - step
      case 'Home':
        return 0
      case 'End':
        return props.count
      default:
        return null
    }
  }

  const next = nextValue()
  if (next === null) return

  event.preventDefault()
  commit(next)
  hover.value = null
}
</script>

<template>
  <div
    :class="classes"
    role="slider"
    :tabindex="disabled || readonly ? -1 : 0"
    :aria-label="ariaLabel ?? locale.rate"
    :aria-valuemin="0"
    :aria-valuemax="count"
    :aria-valuenow="modelValue"
    :aria-valuetext="`${modelValue} / ${count}`"
    :aria-disabled="disabled || undefined"
    :aria-readonly="readonly || undefined"
    @keydown="onKeydown"
    @mouseleave="hover = null"
  >
    <span
      v-for="index in count"
      :key="index"
      :class="ns.e('star')"
      @mousemove="onMove($event, index - 1)"
      @click="onClick($event, index - 1)"
    >
      <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" aria-hidden="true">
        <path
          d="M12 2.6l2.86 6.05 6.62.87-4.85 4.62 1.2 6.58L12 17.54l-5.83 3.18 1.2-6.58L2.52 9.52l6.62-.87L12 2.6Z"
          stroke="currentColor"
          stroke-width="1.4"
          stroke-linejoin="round"
        />
      </svg>
      <span :class="ns.e('fill')" :style="{ width: `${fraction(index - 1) * 100}%` }">
        <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
          <path
            d="M12 2.6l2.86 6.05 6.62.87-4.85 4.62 1.2 6.58L12 17.54l-5.83 3.18 1.2-6.58L2.52 9.52l6.62-.87L12 2.6Z"
            fill="currentColor"
          />
        </svg>
      </span>
    </span>
  </div>
</template>
