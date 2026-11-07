<script setup lang="ts">
import { computed } from 'vue'
import { useFormControl, useNamespace } from '@/core'
import type { InputEmits, InputProps, InputSlots } from './types'

defineOptions({ name: 'VkInput' })

const props = withDefaults(defineProps<InputProps>(), {
  modelValue: '',
  type: 'text',
  textarea: false,
  rows: 3,
  placeholder: undefined,
  disabled: false,
  readonly: false,
  clearable: false,
  size: undefined,
  status: undefined,
  maxlength: undefined,
  showCount: false,
  id: undefined,
  name: undefined,
  autocomplete: 'off',
  ariaLabel: undefined,
})

const emit = defineEmits<InputEmits>()

defineSlots<InputSlots>()

const ns = useNamespace('input')
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

const value = computed(() => props.modelValue ?? '')
const isError = computed(() => props.status === 'error')

const classes = computed(() => [
  ns.b,
  ns.m(mergedSize.value),
  props.textarea ? ns.m('textarea') : '',
  props.status ? ns.m(props.status) : '',
  {
    [ns.m('disabled')]: isDisabled.value,
    [ns.m('readonly')]: props.readonly,
  },
])

const showClear = computed(
  () => props.clearable && !isDisabled.value && !props.readonly && value.value.length > 0,
)

function onInput(event: Event): void {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

function onChange(event: Event): void {
  emit('change', (event.target as HTMLInputElement).value, event)
  validate('change')
}

function onBlur(event: FocusEvent): void {
  emit('blur', event)
  validate('blur')
}

function onFocus(event: FocusEvent): void {
  emit('focus', event)
}

function clear(): void {
  emit('update:modelValue', '')
  emit('clear')
  validate('change')
}
</script>

<template>
  <div :class="classes">
    <span v-if="$slots.prefix" :class="ns.e('affix')">
      <slot name="prefix" />
    </span>

    <textarea
      v-if="textarea"
      :id="inputId"
      :class="ns.e('control')"
      :value="value"
      :rows="rows"
      :name="name"
      :placeholder="placeholder"
      :disabled="isDisabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :aria-label="ariaLabel"
      :aria-describedby="ariaDescribedby"
      :aria-invalid="isError || ariaInvalid"
      @input="onInput"
      @change="onChange"
      @blur="onBlur"
      @focus="onFocus"
    />

    <input
      v-else
      :id="inputId"
      :class="ns.e('control')"
      :type="type"
      :value="value"
      :name="name"
      :placeholder="placeholder"
      :disabled="isDisabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :autocomplete="autocomplete"
      :aria-label="ariaLabel"
      :aria-describedby="ariaDescribedby"
      :aria-invalid="isError || ariaInvalid"
      @input="onInput"
      @change="onChange"
      @blur="onBlur"
      @focus="onFocus"
    />

    <span v-if="isError" :class="ns.e('status-icon')" aria-hidden="true">
      <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.5" />
        <path d="M8 4.8v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        <circle cx="8" cy="11.2" r="0.9" fill="currentColor" />
      </svg>
    </span>

    <button
      v-if="showClear"
      type="button"
      :class="ns.e('clear')"
      aria-label="清空输入"
      @mousedown.prevent
      @click="clear"
    >
      <svg viewBox="0 0 16 16" width="12" height="12" fill="none" aria-hidden="true">
        <path
          d="M4 4l8 8M12 4l-8 8"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
        />
      </svg>
    </button>

    <span v-if="$slots.suffix" :class="ns.e('affix')">
      <slot name="suffix" />
    </span>

    <span v-if="showCount && maxlength" :class="ns.e('count')"
      >{{ value.length }}/{{ maxlength }}</span
    >
  </div>
</template>
