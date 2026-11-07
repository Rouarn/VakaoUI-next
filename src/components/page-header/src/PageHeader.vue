<script setup lang="ts">
import { useNamespace } from '@/core'
import type { PageHeaderEmits, PageHeaderProps, PageHeaderSlots } from './types'

defineOptions({ name: 'VkPageHeader' })

withDefaults(defineProps<PageHeaderProps>(), {
  subtitle: undefined,
  back: true,
  backLabel: '返回',
})

const emit = defineEmits<PageHeaderEmits>()

defineSlots<PageHeaderSlots>()

const ns = useNamespace('page-header')
</script>

<template>
  <header :class="ns.b">
    <div v-if="$slots.breadcrumb" :class="ns.e('breadcrumb')">
      <slot name="breadcrumb" />
    </div>

    <div :class="ns.e('heading')">
      <button
        v-if="back"
        type="button"
        :class="ns.e('back')"
        :aria-label="backLabel"
        @click="emit('back')"
      >
        <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
          <path
            d="M10 3.5 5.5 8l4.5 4.5"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <h1 :class="ns.e('title')">
        <slot name="title">{{ title }}</slot>
      </h1>

      <div v-if="$slots.extra" :class="ns.e('extra')">
        <slot name="extra" />
      </div>
    </div>

    <p v-if="subtitle || $slots.subtitle" :class="ns.e('subtitle')">
      <slot name="subtitle">{{ subtitle }}</slot>
    </p>

    <div v-if="$slots.footer" :class="ns.e('footer')">
      <slot name="footer" />
    </div>
  </header>
</template>
