<script setup lang="ts">
import { computed, provide } from 'vue'
import { useComponentSize, useNamespace } from '@/core'
import { formContextInjectionKey, type FormItemInstance } from './context'
import type { FormEmits, FormProps, FormSlots } from './types'

defineOptions({ name: 'VkForm' })

defineSlots<FormSlots>()

const props = withDefaults(defineProps<FormProps>(), {
  rules: undefined,
  layout: 'horizontal',
  labelAlign: 'right',
  labelWidth: undefined,
  size: undefined,
  disabled: false,
})

const emit = defineEmits<FormEmits>()

const ns = useNamespace('form')
const mergedSize = useComponentSize(computed(() => props.size))

const items = new Map<string, FormItemInstance>()
const model = computed(() => props.model)
const rules = computed(() => props.rules)
const disabled = computed(() => props.disabled)

provide(formContextInjectionKey, {
  model,
  rules,
  disabled,
  size: mergedSize,
  registerItem: (item) => {
    items.set(item.field, item)
  },
  unregisterItem: (field) => {
    items.delete(field)
  },
})

const classes = computed(() => [
  ns.b,
  ns.m(props.layout),
  ns.m(`label-${props.labelAlign}`),
  ns.m(mergedSize.value),
])

const labelWidthStyle = computed(() => {
  if (props.labelWidth === undefined) return undefined
  const width = typeof props.labelWidth === 'number' ? `${props.labelWidth}px` : props.labelWidth
  return { '--vk-form-label-width': width }
})

function selectItems(fields?: string | string[]): FormItemInstance[] {
  const all = [...items.values()]
  if (fields === undefined) return all
  const list = Array.isArray(fields) ? fields : [fields]
  return all.filter((item) => list.includes(item.field))
}

async function validateField(field: string): Promise<boolean> {
  const item = items.get(field)
  if (!item) return true
  return item.validate()
}

async function validate(fields?: string | string[]): Promise<boolean> {
  const results = await Promise.all(selectItems(fields).map((item) => item.validate()))
  return results.every(Boolean)
}

function clearValidate(fields?: string | string[]): void {
  selectItems(fields).forEach((item) => item.clearValidate())
}

function resetFields(fields?: string | string[]): void {
  selectItems(fields).forEach((item) => item.resetField())
}

function handleSubmit(event: Event): void {
  event.preventDefault()
  emit('submit', event)
}

defineExpose({ validate, validateField, clearValidate, resetFields })
</script>

<template>
  <form :class="classes" :style="labelWidthStyle" novalidate @submit="handleSubmit">
    <slot />
  </form>
</template>
