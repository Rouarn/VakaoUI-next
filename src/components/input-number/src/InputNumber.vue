<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useFormControl, useNamespace } from '@/core'
import type { InputNumberEmits, InputNumberProps } from './types'

defineOptions({ name: 'VkInputNumber' })

const props = withDefaults(defineProps<InputNumberProps>(), {
  modelValue: null,
  min: Number.NEGATIVE_INFINITY,
  max: Number.POSITIVE_INFINITY,
  step: 1,
  precision: undefined,
  placeholder: undefined,
  disabled: false,
  controls: true,
  size: undefined,
  status: undefined,
  id: undefined,
  ariaLabel: undefined,
})

const emit = defineEmits<InputNumberEmits>()

const ns = useNamespace('input-number')
const {
  inputId,
  disabled: isDisabled,
  size: mergedSize,
  ariaDescribedby,
  ariaInvalid,
  validate,
} = useFormControl({
  size: computed(() => props.size),
  disabled: computed(() => props.disabled),
  id: computed(() => props.id),
})

const inputRef = ref<HTMLInputElement | null>(null)
const draft = ref('')

function format(value: number | null): string {
  if (value === null || Number.isNaN(value)) return ''
  return props.precision === undefined ? String(value) : value.toFixed(props.precision)
}

watch(
  () => props.modelValue,
  (value) => {
    draft.value = format(value ?? null)
  },
  { immediate: true },
)

const classes = computed(() => [
  ns.b,
  ns.m(mergedSize.value),
  props.status ? ns.m(props.status) : '',
  { [ns.m('disabled')]: isDisabled.value },
])

const canDecrease = computed(() => {
  const current = props.modelValue ?? 0
  return !isDisabled.value && current > props.min
})

const canIncrease = computed(() => {
  const current = props.modelValue ?? 0
  return !isDisabled.value && current < props.max
})

function round(value: number): number {
  if (props.precision === undefined) return value
  const factor = 10 ** props.precision
  return Math.round(value * factor) / factor
}

function clamp(value: number): number {
  return round(Math.min(props.max, Math.max(props.min, value)))
}

function commit(value: number | null): void {
  const next = value === null ? null : clamp(value)
  draft.value = format(next)
  if (next !== props.modelValue) {
    emit('update:modelValue', next)
    emit('change', next)
    validate('change')
  }
}

function stepBy(direction: 1 | -1): void {
  if (isDisabled.value) return
  const base = props.modelValue ?? 0
  commit(base + direction * props.step)
}

function onInput(event: Event): void {
  draft.value = (event.target as HTMLInputElement).value
}

function commitDraft(): void {
  if (draft.value.trim() === '') {
    commit(null)
    return
  }
  const parsed = Number(draft.value)
  if (Number.isNaN(parsed)) {
    draft.value = format(props.modelValue ?? null)
    return
  }
  commit(parsed)
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'ArrowUp') {
    event.preventDefault()
    stepBy(1)
  } else if (event.key === 'ArrowDown') {
    event.preventDefault()
    stepBy(-1)
  } else if (event.key === 'Enter') {
    commitDraft()
    void nextTick(() => inputRef.value?.select())
  }
}

function onBlur(event: FocusEvent): void {
  commitDraft()
  emit('blur', event)
  validate('blur')
}
</script>

<template>
  <div :class="classes">
    <button
      v-if="controls"
      type="button"
      :class="ns.e('button')"
      aria-label="减少数值"
      :disabled="!canDecrease"
      @click="stepBy(-1)"
    >
      <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
        <path d="M2 6h8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
      </svg>
    </button>

    <input
      ref="inputRef"
      :id="inputId"
      :class="ns.e('control')"
      type="text"
      inputmode="decimal"
      role="spinbutton"
      :value="draft"
      :placeholder="placeholder"
      :disabled="isDisabled"
      :aria-label="ariaLabel"
      :aria-valuenow="modelValue ?? undefined"
      :aria-valuemin="Number.isFinite(min) ? min : undefined"
      :aria-valuemax="Number.isFinite(max) ? max : undefined"
      :aria-describedby="ariaDescribedby"
      :aria-invalid="status === 'error' || ariaInvalid"
      @input="onInput"
      @blur="onBlur"
      @keydown="onKeydown"
      @focus="emit('focus', $event)"
    />

    <button
      v-if="controls"
      type="button"
      :class="ns.e('button')"
      aria-label="增加数值"
      :disabled="!canIncrease"
      @click="stepBy(1)"
    >
      <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
        <path d="M6 2v8M2 6h8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
      </svg>
    </button>
  </div>
</template>
