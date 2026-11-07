<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useComponentSize, useNamespace } from '@/core'
import type { AvatarProps, AvatarSlots } from './types'

defineOptions({ name: 'VkAvatar' })

const props = withDefaults(defineProps<AvatarProps>(), {
  src: undefined,
  alt: undefined,
  size: undefined,
  round: false,
  color: undefined,
})

defineSlots<AvatarSlots>()

const ns = useNamespace('avatar')
const mergedSize = useComponentSize(
  computed(() => (typeof props.size === 'string' ? props.size : undefined)),
)
const failed = ref(false)

watch(
  () => props.src,
  () => (failed.value = false),
)

const hasImage = computed(() => Boolean(props.src) && !failed.value)
const sizeClass = computed(() =>
  typeof props.size === 'number' ? undefined : ns.m(mergedSize.value),
)

const style = computed(() => {
  if (typeof props.size !== 'number') return props.color ? { background: props.color } : undefined
  return {
    width: `${props.size}px`,
    height: `${props.size}px`,
    fontSize: `${Math.max(11, Math.round(props.size * 0.4))}px`,
    background: props.color,
  }
})

const fallback = computed(() => (props.alt ? Array.from(props.alt)[0] : ''))
</script>

<template>
  <span
    :class="[ns.b, sizeClass, { [ns.m('round')]: round }]"
    :style="style"
    :role="!hasImage && alt ? 'img' : undefined"
    :aria-label="!hasImage && alt ? alt : undefined"
  >
    <img v-if="hasImage" :src="src" :alt="alt ?? ''" @error="failed = true" />
    <slot v-else>
      <span v-if="fallback" :class="ns.e('text')" aria-hidden="true">{{ fallback }}</span>
      <svg v-else viewBox="0 0 24 24" width="60%" height="60%" fill="none" aria-hidden="true">
        <circle cx="12" cy="9" r="3.4" stroke="currentColor" stroke-width="1.5" />
        <path
          d="M5.5 19c1.2-3.3 3.6-5 6.5-5s5.3 1.7 6.5 5"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
    </slot>
  </span>
</template>
