<script setup lang="ts">
import { computed } from 'vue'
import { useLocale, useNamespace } from '@/core'
import type { EmptyProps, EmptySlots } from './types'

defineOptions({ name: 'VkEmpty' })

const props = withDefaults(defineProps<EmptyProps>(), {
  description: undefined,
  image: undefined,
  imageSize: 96,
})

defineSlots<EmptySlots>()

const ns = useNamespace('empty')
const locale = useLocale()

const text = computed(() => props.description ?? locale.value.empty)
const size = computed(() =>
  typeof props.imageSize === 'number' ? `${props.imageSize}px` : props.imageSize,
)
</script>

<template>
  <div :class="ns.b" role="status">
    <div :class="ns.e('image')" :style="{ width: size, height: size }">
      <slot name="image">
        <img v-if="image" :src="image" alt="" />
        <svg v-else viewBox="0 0 96 96" width="100%" height="100%" aria-hidden="true">
          <circle cx="48" cy="48" r="40" fill="var(--vk-fill-color)" />
          <path
            d="M48 24c1.8 10.6 5.9 14.7 16.5 16.5C53.9 42.3 49.8 46.4 48 57c-1.8-10.6-5.9-14.7-16.5-16.5C42.1 38.7 46.2 34.6 48 24Z"
            fill="var(--vk-text-color-3)"
            opacity="0.5"
          />
          <circle cx="66" cy="66" r="3.4" fill="var(--vk-color-orange)" />
          <circle cx="30" cy="66" r="3.4" fill="var(--vk-color-purple)" />
        </svg>
      </slot>
    </div>
    <p :class="ns.e('description')">
      <slot>{{ text }}</slot>
    </p>
    <div v-if="$slots.action" :class="ns.e('action')">
      <slot name="action" />
    </div>
  </div>
</template>
