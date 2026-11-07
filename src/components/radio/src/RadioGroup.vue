<script setup lang="ts">
import { computed, provide } from 'vue'
import { useFormControl, useNamespace } from '@/core'
import { radioGroupInjectionKey } from './context'
import type { RadioGroupEmits, RadioGroupProps } from './types'

let seed = 0

function nextRadioName(): string {
  seed += 1
  return `vk-radio-${seed}`
}

defineOptions({ name: 'VkRadioGroup' })

const props = withDefaults(defineProps<RadioGroupProps>(), {
  modelValue: null,
  name: undefined,
  disabled: false,
  size: undefined,
  direction: 'horizontal',
  ariaLabel: undefined,
  readonly: false,
})

const emit = defineEmits<RadioGroupEmits>()

const ns = useNamespace('radio-group')
const {
  disabled: isDisabled,
  ariaDescribedby,
  validate,
} = useFormControl({
  size: computed(() => props.size),
  disabled: computed(() => props.disabled),
})

const name = props.name ?? nextRadioName()

provide(radioGroupInjectionKey, {
  modelValue: computed(() => props.modelValue ?? null),
  name,
  disabled: computed(() => isDisabled.value || props.readonly),
  size: computed(() => props.size),
  select: (value) => {
    emit('update:modelValue', value)
    emit('change', value)
    validate('change')
  },
})

const classes = computed(() => [ns.b, ns.m(props.direction)])
</script>

<template>
  <div
    :class="classes"
    role="radiogroup"
    :aria-label="ariaLabel"
    :aria-describedby="ariaDescribedby"
  >
    <slot />
  </div>
</template>
