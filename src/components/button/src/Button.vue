<script setup lang="ts">
import { computed } from 'vue'
import { useComponentSize, useNamespace } from '@/core'
import type { ButtonProps, ButtonSlots } from './types'

defineOptions({ name: 'VkButton' })

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
  variant: 'solid',
  size: undefined,
  disabled: false,
  loading: false,
  block: false,
  htmlType: 'button',
  ariaLabel: undefined,
})

defineSlots<ButtonSlots>()

const ns = useNamespace('button')
const mergedSize = useComponentSize(computed(() => props.size))

const classes = computed(() => [
  ns.b,
  ns.m(props.type),
  ns.m(props.variant),
  ns.m(mergedSize.value),
  {
    [ns.m('block')]: props.block,
    [ns.m('loading')]: props.loading,
    [ns.m('disabled')]: props.disabled,
  },
])
</script>

<template>
  <button
    :class="classes"
    :type="htmlType"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
    :aria-label="ariaLabel"
  >
    <span v-if="loading" :class="ns.e('spinner')" aria-hidden="true" />
    <span v-else-if="$slots.icon" :class="ns.e('icon')">
      <slot name="icon" />
    </span>
    <span v-if="$slots.default" :class="ns.e('content')">
      <slot />
    </span>
  </button>
</template>
