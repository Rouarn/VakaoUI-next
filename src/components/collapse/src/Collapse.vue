<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import { useNamespace } from '@/core'
import { collapseContextKey, type CollapseName } from './context'
import type { CollapseEmits, CollapseProps, CollapseSlots } from './types'

defineOptions({ name: 'VkCollapse' })

const props = withDefaults(defineProps<CollapseProps>(), {
  modelValue: undefined,
  accordion: false,
  bordered: true,
})

const emit = defineEmits<CollapseEmits>()

defineSlots<CollapseSlots>()

const ns = useNamespace('collapse')
const inner = ref<CollapseName[]>([])

const expanded = computed(() => props.modelValue ?? inner.value)
const classes = computed(() => [ns.b, { [ns.m('bordered')]: props.bordered }])

function idOf(name: CollapseName): string {
  return `vk-collapse-${String(name).replace(/\s+/g, '-')}`
}

function isExpanded(name: CollapseName): boolean {
  return expanded.value.includes(name)
}

function toggle(name: CollapseName): void {
  const opened = isExpanded(name)
  const next = props.accordion
    ? opened
      ? []
      : [name]
    : opened
      ? expanded.value.filter((item) => item !== name)
      : [...expanded.value, name]

  if (props.modelValue === undefined) inner.value = next
  emit('update:modelValue', next)
  emit('change', next)
}

provide(collapseContextKey, { isExpanded, toggle, idOf, expanded })
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
