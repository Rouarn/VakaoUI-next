<script setup lang="ts">
import { useNamespace } from '@/core'
import type { LayoutSectionSlots } from './types'

defineOptions({ name: 'VkLayoutFooter' })

defineSlots<LayoutSectionSlots>()

const ns = useNamespace('layout')
</script>

<template>
  <footer :class="ns.e('footer')">
    <slot />
  </footer>
</template>
