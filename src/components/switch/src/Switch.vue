<script setup lang="ts">
import { computed } from 'vue'
import { useFormControl, useNamespace } from '@/core'
import type { SwitchEmits, SwitchProps } from './types'

defineOptions({ name: 'VkSwitch' })

const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: false,
  disabled: false,
  loading: false,
  label: undefined,
  size: undefined,
  id: undefined,
  ariaLabel: undefined,
})

const emit = defineEmits<SwitchEmits>()

const ns = useNamespace('switch')
const {
  inputId,
  disabled: isDisabled,
  size: mergedSize,
  ariaDescribedby,
  validate,
} = useFormControl({
  size: computed(() => props.size),
  disabled: computed(() => props.disabled || props.loading),
  id: computed(() => props.id),
})

const classes = computed(() => [
  ns.b,
  ns.m(mergedSize.value),
  {
    [ns.m('checked')]: props.modelValue,
    [ns.m('disabled')]: isDisabled.value,
    [ns.m('loading')]: props.loading,
  },
])

function toggle(): void {
  if (isDisabled.value) return
  const next = !props.modelValue
  emit('update:modelValue', next)
  emit('change', next)
  validate('change')
}
</script>

<template>
  <button
    :id="inputId"
    :class="classes"
    type="button"
    role="switch"
    :aria-checked="modelValue"
    :aria-label="ariaLabel ?? label"
    :aria-describedby="ariaDescribedby"
    :aria-busy="loading || undefined"
    :disabled="isDisabled"
    @click="toggle"
  >
    <span :class="ns.e('track')" aria-hidden="true">
      <span :class="ns.e('thumb')" />
    </span>
    <span v-if="label || $slots.default" :class="ns.e('label')">
      <slot>{{ label }}</slot>
    </span>
  </button>
</template>
