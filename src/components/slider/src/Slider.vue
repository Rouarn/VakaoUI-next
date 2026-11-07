<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFormControl, useNamespace } from '@/core'
import type { SliderEmits, SliderProps } from './types'

defineOptions({ name: 'VkSlider' })

const props = withDefaults(defineProps<SliderProps>(), {
  modelValue: 0,
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  showTooltip: true,
  formatTooltip: undefined,
  status: undefined,
  size: undefined,
  id: undefined,
  ariaLabel: undefined,
})

const emit = defineEmits<SliderEmits>()

const ns = useNamespace('slider')
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

const active = ref(false)

const classes = computed(() => [
  ns.b,
  ns.m(mergedSize.value),
  props.status ? ns.m(props.status) : '',
  {
    [ns.m('disabled')]: isDisabled.value,
    [ns.m('active')]: active.value,
    [ns.m('no-tooltip')]: !props.showTooltip,
  },
])

const percent = computed(() => {
  const range = props.max - props.min
  if (range <= 0) return 0
  return Math.min(100, Math.max(0, ((props.modelValue - props.min) / range) * 100))
})

const tooltipText = computed(() =>
  props.formatTooltip ? props.formatTooltip(props.modelValue) : String(props.modelValue),
)

function onInput(event: Event): void {
  emit('update:modelValue', Number((event.target as HTMLInputElement).value))
}

function onChange(event: Event): void {
  emit('change', Number((event.target as HTMLInputElement).value))
  validate('change')
}
</script>

<template>
  <div :class="classes" :style="{ '--vk-slider-percent': `${percent}%` }">
    <output
      v-if="showTooltip"
      :class="ns.e('tooltip')"
      :for="inputId"
      :style="{ left: `${percent}%` }"
      aria-hidden="true"
    >
      {{ tooltipText }}
    </output>
    <div :class="ns.e('track')" aria-hidden="true">
      <div :class="ns.e('fill')" />
    </div>
    <input
      :id="inputId"
      :class="ns.e('control')"
      type="range"
      :value="modelValue"
      :min="min"
      :max="max"
      :step="step"
      :disabled="isDisabled"
      :aria-label="ariaLabel"
      :aria-describedby="ariaDescribedby"
      :aria-valuetext="tooltipText"
      @input="onInput"
      @change="onChange"
      @focus="active = true"
      @blur="active = false"
      @pointerdown="active = true"
      @pointerup="active = false"
    />
  </div>
</template>
