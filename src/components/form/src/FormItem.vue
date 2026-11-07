<script setup lang="ts">
import Schema from 'async-validator'
import { computed, inject, onBeforeUnmount, onMounted, provide, ref, useSlots } from 'vue'
import { useComponentSize, useNamespace } from '@/core'
import { formContextInjectionKey, formItemContextInjectionKey } from './context'
import {
  filterRulesByTrigger,
  getValueByPath,
  nextFormItemId,
  normalizeRules,
  setValueByPath,
  snapshotValue,
} from './utils'
import type {
  FormItemProps,
  FormItemSlots,
  FormItemValidateState,
  FormRule,
  FormValidateTrigger,
} from './types'

defineOptions({ name: 'VkFormItem' })

defineSlots<FormItemSlots>()

const props = withDefaults(defineProps<FormItemProps>(), {
  field: undefined,
  label: undefined,
  required: false,
  rules: undefined,
  validateStatus: undefined,
  feedback: undefined,
  showLabel: true,
  disabled: undefined,
  labelWidth: undefined,
  htmlFor: undefined,
})

const ns = useNamespace('form-item')
const slots = useSlots()
const form = inject(formContextInjectionKey, null)

const inputId = props.htmlFor ?? nextFormItemId()
const feedbackId = `${inputId}-feedback`
const mergedSize = useComponentSize(computed(() => form?.size.value))
const disabled = computed(() => props.disabled ?? form?.disabled.value ?? false)

const mergedRules = computed<FormRule[]>(() => {
  const formRules = props.field ? form?.rules.value?.[props.field] : undefined
  return [...normalizeRules(formRules), ...normalizeRules(props.rules)]
})

const isRequired = computed(() => props.required || mergedRules.value.some((rule) => rule.required))

const value = computed(() =>
  form && props.field ? getValueByPath(form.model.value, props.field) : undefined,
)

const innerState = ref<FormItemValidateState>('')
const innerMessage = ref('')
const validateState = computed(() => props.validateStatus ?? innerState.value)
const feedbackMessage = computed(() => props.feedback ?? innerMessage.value)

const hasLabel = computed(() => Boolean(props.label) || Boolean(slots.label))
const labelVisible = computed(() => props.showLabel && hasLabel.value)

const classes = computed(() => [
  ns.b,
  ns.m(mergedSize.value),
  labelVisible.value ? '' : ns.m('no-label'),
  validateState.value ? ns.m(validateState.value) : '',
])

const labelWidthStyle = computed(() => {
  if (props.labelWidth === undefined) return undefined
  const width = typeof props.labelWidth === 'number' ? `${props.labelWidth}px` : props.labelWidth
  return { '--vk-form-label-width': width }
})

function clearValidate(): void {
  innerState.value = ''
  innerMessage.value = ''
}

async function validate(trigger?: FormValidateTrigger): Promise<boolean> {
  const rules = filterRulesByTrigger(mergedRules.value, trigger)
  if (!rules.length) {
    clearValidate()
    return true
  }

  innerState.value = 'validating'
  const schema = new Schema({ value: rules })

  try {
    await schema.validate({ value: value.value }, { suppressWarning: true })
    innerState.value = 'success'
    innerMessage.value = ''
    return true
  } catch (error) {
    const errors = (error as { errors?: Array<{ message?: string }> }).errors
    innerState.value = 'error'
    innerMessage.value = errors?.[0]?.message ?? '校验未通过'
    return false
  }
}

let initialValue: unknown

function resetField(): void {
  if (form && props.field) {
    setValueByPath(form.model.value, props.field, snapshotValue(initialValue))
  }
  clearValidate()
}

provide(formItemContextInjectionKey, {
  inputId,
  feedbackId,
  validateState,
  disabled,
  size: mergedSize,
  ariaDescribedby: computed(() => (feedbackMessage.value ? feedbackId : undefined)),
  ariaInvalid: computed(() => validateState.value === 'error'),
  validate,
})

onMounted(() => {
  initialValue = snapshotValue(value.value)
  if (form && props.field) {
    form.registerItem({ field: props.field, validate, clearValidate, resetField })
  }
})

onBeforeUnmount(() => {
  if (form && props.field) form.unregisterItem(props.field)
})

defineExpose({ validate, clearValidate, resetField, inputId, validateState })
</script>

<template>
  <div :class="classes" :style="labelWidthStyle">
    <label v-if="labelVisible" :class="ns.e('label')" :for="inputId">
      <span :class="ns.e('label-text')">
        <slot name="label">{{ label }}</slot>
      </span>
      <span v-if="isRequired" :class="ns.e('asterisk')" aria-hidden="true">*</span>
    </label>
    <div :class="ns.e('control')">
      <slot />
      <div
        v-if="$slots.feedback || feedbackMessage"
        :id="feedbackId"
        :class="ns.e('feedback')"
        role="alert"
      >
        <slot name="feedback">{{ feedbackMessage }}</slot>
      </div>
    </div>
  </div>
</template>
