<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import { useFloating, useNamespace, usePopupContainer } from '@/core'
import type { TooltipProps, TooltipSlots } from './types'

defineOptions({ name: 'VkTooltip' })

const props = withDefaults(defineProps<TooltipProps>(), {
  content: undefined,
  placement: 'top',
  disabled: false,
  delay: 80,
  maxWidth: 280,
})

defineSlots<TooltipSlots>()

const ns = useNamespace('tooltip')
const container = usePopupContainer()
const triggerRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const open = ref(false)
const tooltipId = ref<string>()

let showTimer: ReturnType<typeof setTimeout> | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null
let seed = 0

const { floatingStyle, actualPlacement } = useFloating({
  trigger: triggerRef,
  panel: panelRef,
  open: () => open.value,
  placement: () => props.placement,
  gap: 6,
  maxWidth: props.maxWidth,
})

function clearTimers(): void {
  if (showTimer) clearTimeout(showTimer)
  if (hideTimer) clearTimeout(hideTimer)
  showTimer = null
  hideTimer = null
}

function show(): void {
  if (props.disabled) return
  clearTimers()
  showTimer = setTimeout(() => {
    if (!tooltipId.value) tooltipId.value = `vk-tooltip-${(seed += 1)}`
    open.value = true
  }, props.delay)
}

function hide(): void {
  clearTimers()
  hideTimer = setTimeout(() => (open.value = false), props.delay)
}

function hideNow(): void {
  clearTimers()
  open.value = false
}

watch(
  () => props.disabled,
  (disabled) => {
    if (disabled) hideNow()
  },
)

onBeforeUnmount(clearTimers)
</script>

<template>
  <span :class="ns.b">
    <span
      ref="triggerRef"
      :class="ns.e('trigger')"
      :aria-describedby="open && tooltipId ? tooltipId : undefined"
      @mouseenter="show"
      @mouseleave="hide"
      @focusin="show"
      @focusout="hide"
      @keydown.escape="hideNow"
    >
      <slot name="trigger" />
    </span>
  </span>

  <Teleport :to="container">
    <Transition :name="ns.m('fade')">
      <div
        v-if="open"
        :id="tooltipId"
        ref="panelRef"
        :class="[ns.e('panel'), ns.m(actualPlacement)]"
        :style="floatingStyle"
        role="tooltip"
      >
        <slot>{{ content }}</slot>
      </div>
    </Transition>
  </Teleport>
</template>
