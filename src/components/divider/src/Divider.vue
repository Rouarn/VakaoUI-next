<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@/core'
import type { DividerProps, DividerSlots } from './types'

defineOptions({ name: 'VkDivider' })

const props = withDefaults(defineProps<DividerProps>(), {
  type: 'horizontal',
  titlePlacement: 'center',
  dashed: false,
  plain: false,
})

defineSlots<DividerSlots>()

const ns = useNamespace('divider')

const classes = computed(() => [
  ns.b,
  ns.m(props.type),
  ns.m(props.titlePlacement),
  {
    [ns.m('dashed')]: props.dashed,
    [ns.m('plain')]: props.plain,
  },
])
</script>

<template>
  <div
    :class="classes"
    role="separator"
    :aria-orientation="type === 'vertical' ? 'vertical' : 'horizontal'"
  >
    <template v-if="type === 'horizontal'">
      <span :class="ns.e('line')" aria-hidden="true" />
      <span v-if="$slots.default" :class="ns.e('title')"><slot /></span>
      <span :class="ns.e('line')" aria-hidden="true" />
    </template>
  </div>
</template>
