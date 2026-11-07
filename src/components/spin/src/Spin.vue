<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useComponentSize, useLocale, useNamespace } from '@/core'
import type { SpinProps, SpinSlots } from './types'

defineOptions({ name: 'VkSpin' })

const props = withDefaults(defineProps<SpinProps>(), {
  spinning: true,
  size: undefined,
  tip: undefined,
  delay: 0,
  overlay: true,
})

defineSlots<SpinSlots>()

const ns = useNamespace('spin')
const locale = useLocale()
const size = useComponentSize(computed(() => props.size))
const visible = ref(props.spinning && props.delay <= 0)

let timer: ReturnType<typeof setTimeout> | undefined

watch(
  () => [props.spinning, props.delay] as const,
  ([spinning, delay]) => {
    if (timer) clearTimeout(timer)
    if (!spinning) {
      visible.value = false
      return
    }
    if (delay <= 0) {
      visible.value = true
      return
    }
    visible.value = false
    timer = setTimeout(() => {
      visible.value = props.spinning
    }, delay)
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})

const classes = computed(() => [
  ns.b,
  ns.m(size.value),
  {
    [ns.m('spinning')]: props.spinning,
    [ns.m('overlay')]: props.overlay && props.spinning,
  },
])
</script>

<template>
  <div :class="classes" :aria-busy="props.spinning || undefined">
    <div v-if="spinning" :class="ns.e('mask')" />
    <div
      v-if="visible"
      :class="ns.e('indicator')"
      role="status"
      aria-live="polite"
      :aria-label="tip ?? locale.loading"
    >
      <span :class="ns.e('ring')" aria-hidden="true" />
      <span v-if="tip" :class="ns.e('tip')">{{ tip }}</span>
    </div>
    <div :class="ns.e('content')">
      <slot />
    </div>
  </div>
</template>
