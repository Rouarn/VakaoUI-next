<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useDismiss, useFloating, useNamespace, usePopupContainer } from '@/core'
import type { PopoverEmits, PopoverProps, PopoverSlots } from './types'

defineOptions({ name: 'VkPopover' })

const props = withDefaults(defineProps<PopoverProps>(), {
  open: undefined,
  trigger: 'click',
  placement: 'bottom',
  title: undefined,
  content: undefined,
  disabled: false,
  width: undefined,
})

const emit = defineEmits<PopoverEmits>()

defineSlots<PopoverSlots>()

const ns = useNamespace('popover')
const container = usePopupContainer()
const rootRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const innerOpen = ref(false)

const isOpen = computed(() => props.open ?? innerOpen.value)

const { floatingStyle, actualPlacement } = useFloating({
  trigger: triggerRef,
  panel: panelRef,
  open: () => isOpen.value,
  placement: () => props.placement,
  matchTriggerWidth: true,
  minWidth: 180,
  maxWidth: 320,
})

const panelStyle = computed(() => ({
  ...floatingStyle.value,
  ...(props.width === undefined
    ? {}
    : { width: typeof props.width === 'number' ? `${props.width}px` : props.width }),
}))

function setOpen(next: boolean): void {
  if (next === isOpen.value) return
  if (props.open === undefined) innerOpen.value = next
  emit('update:open', next)
  if (next) emit('open')
  else emit('close')
  if (next) {
    void nextTick(() => panelRef.value?.focus())
  }
}

function toggle(): void {
  if (props.disabled) return
  setOpen(!isOpen.value)
}

function onTriggerEnter(): void {
  if (props.trigger === 'hover') setOpen(true)
}

function onRootLeave(): void {
  if (props.trigger === 'hover') setOpen(false)
}

function onTriggerKeydown(event: KeyboardEvent): void {
  if (event.target !== triggerRef.value) return
  if (event.key !== 'Enter' && event.key !== ' ') return
  event.preventDefault()
  toggle()
}

useDismiss({
  enabled: () => isOpen.value,
  onDismiss: () => setOpen(false),
  inside: [rootRef, panelRef],
})

watch(
  () => props.disabled,
  (disabled) => {
    if (disabled) setOpen(false)
  },
)
</script>

<template>
  <span ref="rootRef" :class="ns.b" @mouseenter="onTriggerEnter" @mouseleave="onRootLeave">
    <span
      ref="triggerRef"
      :class="ns.e('trigger')"
      :tabindex="$slots.trigger ? undefined : 0"
      aria-haspopup="dialog"
      :aria-expanded="isOpen"
      @click="trigger === 'click' && toggle()"
      @keydown="onTriggerKeydown"
    >
      <slot name="trigger" />
    </span>
  </span>

  <Teleport :to="container">
    <Transition :name="ns.m('fade')">
      <div
        v-if="isOpen"
        ref="panelRef"
        :class="[ns.e('panel'), ns.m(actualPlacement)]"
        :style="panelStyle"
        role="dialog"
        :aria-label="title ?? '弹出内容'"
        tabindex="-1"
        @mouseenter="onTriggerEnter"
        @mouseleave="onRootLeave"
      >
        <p v-if="title" :class="ns.e('title')">{{ title }}</p>
        <div :class="ns.e('content')">
          <slot>{{ content }}</slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
