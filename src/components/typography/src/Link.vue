<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@/core'
import type { LinkProps, LinkSlots } from './types'

defineOptions({ name: 'VkLink' })

const props = withDefaults(defineProps<LinkProps>(), {
  href: undefined,
  target: '_self',
  type: 'primary',
  underline: true,
  disabled: false,
})

defineSlots<LinkSlots>()

const ns = useNamespace('link')

const classes = computed(() => [
  ns.b,
  ns.m(props.type),
  {
    [ns.m('underline')]: props.underline,
    [ns.m('disabled')]: props.disabled,
  },
])

const rel = computed(() => (props.target === '_blank' ? 'noopener noreferrer' : undefined))

function onClick(event: MouseEvent): void {
  if (props.disabled) event.preventDefault()
}
</script>

<template>
  <a
    :class="classes"
    :href="disabled ? undefined : href"
    :target="target"
    :rel="rel"
    :aria-disabled="disabled || undefined"
    :tabindex="disabled ? -1 : undefined"
    @click="onClick"
  >
    <slot />
  </a>
</template>
