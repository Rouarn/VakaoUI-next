<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'
import { useNamespace } from '@/core'
import type { FlexProps, FlexSlots } from './types'

defineOptions({ name: 'VkFlex' })

const props = withDefaults(defineProps<FlexProps>(), {
  vertical: false,
  inline: false,
  justify: undefined,
  align: undefined,
  gap: 0,
  wrap: false,
})

defineSlots<FlexSlots>()

const ns = useNamespace('flex')

const classes = computed(() => [
  ns.b,
  {
    [ns.m('vertical')]: props.vertical,
    [ns.m('inline')]: props.inline,
    [ns.m('wrap')]: props.wrap,
    [ns.m(`justify-${props.justify}`)]: Boolean(props.justify),
    [ns.m(`align-${props.align}`)]: Boolean(props.align),
  },
])

const style = computed<CSSProperties>(() => ({
  gap: typeof props.gap === 'number' ? `${props.gap}px` : props.gap,
}))
</script>

<template>
  <div :class="classes" :style="style">
    <slot />
  </div>
</template>
