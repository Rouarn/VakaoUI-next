<script setup lang="ts">
import { computed } from 'vue'
import { useLocale, useNamespace } from '@/core'
import type { ResultProps, ResultSlots } from './types'

defineOptions({ name: 'VkResult' })

const props = withDefaults(defineProps<ResultProps>(), {
  status: 'info',
  title: undefined,
  description: undefined,
})

defineSlots<ResultSlots>()

const ns = useNamespace('result')
const locale = useLocale()

const isCode = computed(
  () => props.status === '403' || props.status === '404' || props.status === '500',
)
const title = computed(() => props.title ?? locale.value.resultTitles[props.status])

const classes = computed(() => [ns.b, ns.m(props.status)])
</script>

<template>
  <div :class="classes" role="status">
    <div :class="ns.e('icon')" aria-hidden="true">
      <slot name="icon">
        <span v-if="isCode" :class="ns.e('code')">{{ status }}</span>
        <svg v-else viewBox="0 0 48 48" width="48" height="48" fill="none">
          <circle cx="24" cy="24" r="20" stroke="currentColor" stroke-width="2" opacity="0.28" />
          <template v-if="status === 'success'">
            <path
              d="M15.5 24.5 21.5 30.5 33 19"
              stroke="currentColor"
              stroke-width="2.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </template>
          <template v-else-if="status === 'warning'">
            <path
              d="M24 13.5 35 32H13L24 13.5Z"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linejoin="round"
            />
            <path d="M24 20v6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
            <circle cx="24" cy="29.6" r="1.5" fill="currentColor" />
          </template>
          <template v-else-if="status === 'error'">
            <path
              d="M17 17l14 14M31 17 17 31"
              stroke="currentColor"
              stroke-width="2.4"
              stroke-linecap="round"
            />
          </template>
          <template v-else>
            <path d="M24 21v8" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" />
            <circle cx="24" cy="15.5" r="1.6" fill="currentColor" />
          </template>
        </svg>
      </slot>
    </div>

    <div v-if="title || $slots.title" :class="ns.e('title')">
      <slot name="title">{{ title }}</slot>
    </div>
    <p v-if="description || $slots.description" :class="ns.e('description')">
      <slot name="description">{{ description }}</slot>
    </p>
    <div v-if="$slots.default" :class="ns.e('content')">
      <slot />
    </div>
    <div v-if="$slots.extra" :class="ns.e('extra')">
      <slot name="extra" />
    </div>
  </div>
</template>
