<script setup lang="ts">
import { useNamespace } from '@/core'
import type { BreadcrumbItemProps, BreadcrumbItemSlots } from './types'

defineOptions({ name: 'VkBreadcrumbItem' })

withDefaults(defineProps<BreadcrumbItemProps>(), {
  href: undefined,
  current: false,
})

defineSlots<BreadcrumbItemSlots>()

const ns = useNamespace('breadcrumb')
</script>

<template>
  <li :class="ns.e('item')">
    <a v-if="href && !current" :href="href" :class="ns.e('link')">
      <slot />
    </a>
    <span v-else :class="ns.e('text')" :aria-current="current ? 'page' : undefined">
      <slot />
    </span>
  </li>
</template>
