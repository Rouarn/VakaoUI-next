<script setup lang="ts">
import { computed } from 'vue'
import { useLocale, useNamespace } from '@/core'
import type { SkeletonProps } from './types'

defineOptions({ name: 'VkSkeleton' })

const props = withDefaults(defineProps<SkeletonProps>(), {
  loading: true,
  rows: 3,
  avatar: false,
  title: true,
  animated: true,
})

const ns = useNamespace('skeleton')
const locale = useLocale()

const classes = computed(() => [ns.b, { [ns.m('animated')]: props.animated }])
const rowList = computed(() => Array.from({ length: Math.max(1, props.rows) }, (_, i) => i))
</script>

<template>
  <div
    :class="classes"
    :aria-busy="loading || undefined"
    :aria-label="loading ? locale.loading : undefined"
  >
    <template v-if="loading">
      <div v-if="avatar || title" :class="ns.e('header')">
        <span v-if="avatar" :class="ns.e('avatar')" aria-hidden="true" />
        <span v-if="title" :class="ns.e('title')" aria-hidden="true" />
      </div>
      <span v-for="row in rowList" :key="row" :class="ns.e('row')" aria-hidden="true" />
    </template>
    <slot v-else />
  </div>
</template>
