<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'
import { useLocale, useNamespace } from '@/core'
import VkBreadcrumbItem from './BreadcrumbItem.vue'
import type { BreadcrumbProps, BreadcrumbSlots } from './types'

defineOptions({ name: 'VkBreadcrumb' })

const props = withDefaults(defineProps<BreadcrumbProps>(), {
  items: () => [],
  separator: '/',
})

defineSlots<BreadcrumbSlots>()

const ns = useNamespace('breadcrumb')
const locale = useLocale()

const style = computed(
  () => ({ '--vk-breadcrumb-separator': JSON.stringify(props.separator) }) as CSSProperties,
)
</script>

<template>
  <nav :class="ns.b" :aria-label="locale.breadcrumb">
    <ol :class="ns.e('list')" :style="style">
      <slot>
        <VkBreadcrumbItem
          v-for="(item, index) in items"
          :key="item.key ?? index"
          :href="item.href"
          :current="index === items.length - 1"
        >
          {{ item.label }}
        </VkBreadcrumbItem>
      </slot>
    </ol>
  </nav>
</template>
