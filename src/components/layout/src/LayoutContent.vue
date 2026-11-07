<script setup lang="ts">
import { useNamespace } from '@/core'
import type { LayoutSectionSlots } from './types'

defineOptions({ name: 'VkLayoutContent' })

defineSlots<LayoutSectionSlots>()

const ns = useNamespace('layout')
</script>

<template>
  <main :class="ns.e('content')">
    <slot />
  </main>
</template>
