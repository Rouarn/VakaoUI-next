<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@/core'
import type { CardProps, CardSlots } from './types'

defineOptions({ name: 'VkCard' })

const props = withDefaults(defineProps<CardProps>(), {
  title: undefined,
  subtitle: undefined,
  bordered: true,
  hoverable: false,
  flush: false,
})

defineSlots<CardSlots>()

const ns = useNamespace('card')

const classes = computed(() => [
  ns.b,
  {
    [ns.m('bordered')]: props.bordered,
    [ns.m('hoverable')]: props.hoverable,
    [ns.m('flush')]: props.flush,
  },
])

const hasHeader = computed(() => Boolean(props.title || props.subtitle))
</script>

<template>
  <div :class="classes" :role="title ? 'group' : undefined" :aria-label="title">
    <div v-if="hasHeader || $slots.header || $slots.extra" :class="ns.e('header')">
      <slot name="header">
        <div :class="ns.e('heading')">
          <div v-if="title" :class="ns.e('title')">{{ title }}</div>
          <div v-if="subtitle" :class="ns.e('subtitle')">{{ subtitle }}</div>
        </div>
      </slot>
      <div v-if="$slots.extra" :class="ns.e('extra')">
        <slot name="extra" />
      </div>
    </div>

    <div v-if="$slots.cover" :class="ns.e('cover')">
      <slot name="cover" />
    </div>

    <div :class="[ns.e('body'), { [ns.em('body', 'flush')]: flush }]">
      <slot />
    </div>

    <div v-if="$slots.footer" :class="ns.e('footer')">
      <slot name="footer" />
    </div>
  </div>
</template>
