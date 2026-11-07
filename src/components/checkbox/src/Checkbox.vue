<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useFormControl, useNamespace } from '@/core'
import type { CheckboxEmits, CheckboxProps } from './types'

defineOptions({ name: 'VkCheckbox' })

const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: false,
  indeterminate: false,
  disabled: false,
  label: undefined,
  size: undefined,
  id: undefined,
  ariaLabel: undefined,
})

const emit = defineEmits<CheckboxEmits>()

const ns = useNamespace('checkbox')
const controlRef = ref<HTMLInputElement | null>(null)
const {
  inputId,
  disabled: isDisabled,
  size: mergedSize,
  ariaDescribedby,
  validate,
} = useFormControl({
  size: computed(() => props.size),
  disabled: computed(() => props.disabled),
  id: computed(() => props.id),
})

const classes = computed(() => [
  ns.b,
  ns.m(mergedSize.value),
  {
    [ns.m('checked')]: props.modelValue,
    [ns.m('indeterminate')]: props.indeterminate && !props.modelValue,
    [ns.m('disabled')]: isDisabled.value,
  },
])

function syncIndeterminate(): void {
  if (controlRef.value) controlRef.value.indeterminate = props.indeterminate
}

watch(() => props.indeterminate, syncIndeterminate)
onMounted(syncIndeterminate)

function onChange(event: Event): void {
  const next = (event.target as HTMLInputElement).checked
  emit('update:modelValue', next)
  emit('change', next)
  validate('change')
}
</script>

<template>
  <label :class="classes" :for="inputId">
    <input
      :id="inputId"
      ref="controlRef"
      :class="ns.e('control')"
      type="checkbox"
      :checked="modelValue"
      :disabled="isDisabled"
      :aria-label="ariaLabel ?? (label ? undefined : '复选框')"
      :aria-describedby="ariaDescribedby"
      :aria-checked="indeterminate ? 'mixed' : modelValue"
      @change="onChange"
    />
    <span :class="ns.e('box')" aria-hidden="true">
      <svg :class="ns.e('check')" viewBox="0 0 12 12" width="11" height="11" fill="none">
        <path
          d="M2.5 6.2 4.8 8.5 9.5 3.6"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span :class="ns.e('dash')" />
    </span>
    <span v-if="label || $slots.default" :class="ns.e('label')">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>
