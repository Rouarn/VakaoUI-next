<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@/core'
import { useRadioControl } from './context'
import type { RadioEmits, RadioProps } from './types'

defineOptions({ name: 'VkRadio' })

const props = withDefaults(defineProps<RadioProps>(), {
  value: undefined,
  modelValue: false,
  disabled: undefined,
  label: undefined,
  size: undefined,
  id: undefined,
  ariaLabel: undefined,
})

const emit = defineEmits<RadioEmits>()

const ns = useNamespace('radio')
const { group, control } = useRadioControl({
  size: computed(() => props.size),
  disabled: computed(() => props.disabled),
  id: computed(() => props.id),
})
const { inputId, disabled: isDisabled, size: mergedSize, ariaDescribedby, validate } = control

const checked = computed(() => {
  if (group) return group.modelValue.value === props.value
  return props.modelValue
})

const classes = computed(() => [
  ns.b,
  ns.m(mergedSize.value),
  {
    [ns.m('checked')]: checked.value,
    [ns.m('disabled')]: isDisabled.value,
  },
])

function onChange(): void {
  if (isDisabled.value) return
  if (group) {
    group.select(props.value as string | number | boolean)
    return
  }
  emit('update:modelValue', true)
  emit('change', true)
  validate('change')
}
</script>

<template>
  <label :class="classes" :for="inputId">
    <input
      :id="inputId"
      :class="ns.e('control')"
      type="radio"
      :name="group?.name"
      :value="String(value ?? '')"
      :checked="checked"
      :disabled="isDisabled"
      :aria-label="ariaLabel ?? (label ? undefined : '单选项')"
      :aria-describedby="ariaDescribedby"
      @change="onChange"
    />
    <span :class="ns.e('dot')" aria-hidden="true" />
    <span v-if="label || $slots.default" :class="ns.e('label')">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>
