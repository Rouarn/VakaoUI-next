<script setup lang="ts">
import { computed } from 'vue'
import { useLocale, useNamespace } from '@/core'
import type { AlertEmits, AlertProps } from './types'

defineOptions({ name: 'VkAlert' })

const props = withDefaults(defineProps<AlertProps>(), {
  type: 'info',
  title: undefined,
  description: undefined,
  showIcon: true,
  closable: false,
  bordered: true,
})

const emit = defineEmits<AlertEmits>()

const ns = useNamespace('alert')
const locale = useLocale()

const classes = computed(() => [ns.b, ns.m(props.type), { [ns.m('bordered')]: props.bordered }])
</script>

<template>
  <div :class="classes" role="alert">
    <span v-if="showIcon" :class="ns.e('icon')" aria-hidden="true">
      <slot name="icon">
        <svg v-if="type === 'success'" viewBox="0 0 16 16" width="16" height="16" fill="none">
          <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.5" />
          <path
            d="M5 8.2 7 10.2 11 5.8"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <svg v-else-if="type === 'warning'" viewBox="0 0 16 16" width="16" height="16" fill="none">
          <path
            d="M8 2.2 14.2 13H1.8L8 2.2Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linejoin="round"
          />
          <path d="M8 6v3.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          <circle cx="8" cy="11.4" r="0.9" fill="currentColor" />
        </svg>
        <svg v-else-if="type === 'error'" viewBox="0 0 16 16" width="16" height="16" fill="none">
          <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.5" />
          <path
            d="M5.8 5.8l4.4 4.4M10.2 5.8l-4.4 4.4"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
          />
        </svg>
        <svg v-else viewBox="0 0 16 16" width="16" height="16" fill="none">
          <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.5" />
          <path d="M8 7.2v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          <circle cx="8" cy="4.9" r="0.9" fill="currentColor" />
        </svg>
      </slot>
    </span>

    <div :class="ns.e('content')">
      <div v-if="title || $slots.title" :class="ns.e('title')">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="description || $slots.default" :class="ns.e('description')">
        <slot>{{ description }}</slot>
      </div>
    </div>

    <button
      v-if="closable"
      type="button"
      :class="ns.e('close')"
      :aria-label="locale.close"
      @click="emit('close')"
    >
      <svg viewBox="0 0 16 16" width="12" height="12" fill="none" aria-hidden="true">
        <path
          d="M4 4l8 8M12 4l-8 8"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
        />
      </svg>
    </button>
  </div>
</template>
