<script setup lang="ts">
import { useTypography } from './shared'
import type { TextProps, TypographySlots } from './types'

defineOptions({ name: 'VkText' })

const props = withDefaults(defineProps<TextProps>(), {
  tag: 'span',
  type: 'default',
  strong: false,
  italic: false,
  underline: false,
  deleted: false,
  code: false,
  truncate: false,
})

defineSlots<TypographySlots>()

const { classes } = useTypography(props)
</script>

<template>
  <component :is="tag" :class="classes">
    <slot />
  </component>
</template>
