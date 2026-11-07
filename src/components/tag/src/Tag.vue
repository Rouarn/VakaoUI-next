<script setup lang="ts">
import { computed } from 'vue'
import { useLocale, useNamespace } from '@/core'
import type { TagEmits, TagProps, TagSlots } from './types'

defineOptions({ name: 'VkTag' })

const props = withDefaults(defineProps<TagProps>(), {
  type: 'default',
  size: 'medium',
  bordered: true,
  round: false,
  closable: false,
  disabled: false,
})

const emit = defineEmits<TagEmits>()

defineSlots<TagSlots>()

const ns = useNamespace('tag')
const locale = useLocale()

const classes = computed(() => [
  ns.b,
  ns.m(props.type),
  ns.m(props.size),
  {
    [ns.m('bordered')]: props.bordered,
    [ns.m('round')]: props.round,
    [ns.m('disabled')]: props.disabled,
  },
])

function onClose(event: MouseEvent): void {
  if (props.disabled) return
  emit('close', event)
}
</script>

<template>
  <span :class="classes" :aria-disabled="disabled || undefined">
    <span v-if="$slots.icon" :class="ns.e('icon')" aria-hidden="true">
      <slot name="icon" />
    </span>
    <span :class="ns.e('content')"><slot /></span>
    <button
      v-if="closable"
      type="button"
      :class="ns.e('close')"
      :disabled="disabled"
      :aria-label="locale.close"
      @click.stop="onClose"
    >
      <svg viewBox="0 0 16 16" width="10" height="10" fill="none" aria-hidden="true">
        <path
          d="M4 4l8 8M12 4l-8 8"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
        />
      </svg>
    </button>
  </span>
</template>
