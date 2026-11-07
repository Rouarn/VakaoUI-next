<script setup lang="ts">
import { computed, inject } from 'vue'
import { useNamespace } from '@/core'
import { collapseContextKey } from './context'
import type { CollapseItemProps, CollapseItemSlots } from './types'

defineOptions({ name: 'VkCollapseItem' })

const props = withDefaults(defineProps<CollapseItemProps>(), {
  title: undefined,
  disabled: false,
})

defineSlots<CollapseItemSlots>()

const ns = useNamespace('collapse-item')
const collapse = inject(collapseContextKey, null)

const expanded = computed(() => collapse?.isExpanded(props.name) ?? false)
const baseId = computed(() => collapse?.idOf(props.name) ?? `vk-collapse-${String(props.name)}`)

const classes = computed(() => [
  ns.b,
  {
    [ns.m('expanded')]: expanded.value,
    [ns.m('disabled')]: props.disabled,
  },
])

function onToggle(): void {
  if (props.disabled) return
  collapse?.toggle(props.name)
}
</script>

<template>
  <div :class="classes">
    <div :class="ns.e('header-row')">
      <button
        :id="`${baseId}-header`"
        type="button"
        :class="ns.e('header')"
        :aria-expanded="expanded"
        :aria-controls="`${baseId}-panel`"
        :disabled="disabled"
        @click="onToggle"
      >
        <span :class="ns.e('icon')" aria-hidden="true">
          <svg viewBox="0 0 16 16" width="10" height="10" fill="none">
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <span :class="ns.e('title')">
          <slot name="header">{{ title }}</slot>
        </span>
      </button>
      <span v-if="$slots.extra" :class="ns.e('extra')">
        <slot name="extra" />
      </span>
    </div>

    <div
      v-show="expanded"
      :id="`${baseId}-panel`"
      :class="ns.e('panel')"
      role="region"
      :aria-labelledby="`${baseId}-header`"
    >
      <div :class="ns.e('body')">
        <slot />
      </div>
    </div>
  </div>
</template>
