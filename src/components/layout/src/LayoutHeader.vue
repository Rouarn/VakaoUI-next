<script setup lang="ts">
import { useNamespace } from '@/core'
import type { LayoutSectionSlots } from './types'

defineOptions({ name: 'VkLayoutHeader' })

defineSlots<LayoutSectionSlots>()

const ns = useNamespace('layout')
</script>

<template>
  <header :class="ns.e('header')">
    <slot />
  </header>
</template>
