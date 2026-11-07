<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { useDismiss, useLocale, useNamespace } from '@/core'
import type { PopconfirmEmits, PopconfirmProps, PopconfirmSlots } from './types'

let popconfirmSeed = 0

function nextTitleId(): string {
  popconfirmSeed += 1
  return `vk-popconfirm-title-${popconfirmSeed}`
}

defineOptions({ name: 'VkPopconfirm' })

const props = withDefaults(defineProps<PopconfirmProps>(), {
  open: undefined,
  title: '',
  content: undefined,
  confirmText: undefined,
  cancelText: undefined,
  confirmType: 'primary',
  loading: false,
  placement: 'top',
  disabled: false,
})

const emit = defineEmits<PopconfirmEmits>()

defineSlots<PopconfirmSlots>()

const ns = useNamespace('popconfirm')
const locale = useLocale()

const rootRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const confirmRef = ref<HTMLButtonElement | null>(null)
const innerOpen = ref(false)

const isOpen = computed(() => props.open ?? innerOpen.value)
const titleId = nextTitleId()

function setOpen(next: boolean): void {
  if (next === isOpen.value) return
  if (props.open === undefined) innerOpen.value = next
  emit('update:open', next)
  if (next) void nextTick(() => confirmRef.value?.focus())
}

function toggle(): void {
  if (props.disabled) return
  setOpen(!isOpen.value)
}

function onTriggerKeydown(event: KeyboardEvent): void {
  if (event.target !== triggerRef.value) return
  if (event.key !== 'Enter' && event.key !== ' ') return
  event.preventDefault()
  toggle()
}

function focusTrigger(): void {
  const target = triggerRef.value?.querySelector<HTMLElement>(
    'button, a[href], input, [tabindex]:not([tabindex="-1"])',
  )
  if (target) target.focus()
  else triggerRef.value?.focus()
}

function confirm(): void {
  emit('confirm')
  setOpen(false)
  focusTrigger()
}

function cancel(): void {
  emit('cancel')
  setOpen(false)
  focusTrigger()
}

function onPanelKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    event.stopPropagation()
    cancel()
  }
}

useDismiss({
  enabled: () => isOpen.value,
  onDismiss: () => setOpen(false),
  inside: [rootRef, panelRef],
})
</script>

<template>
  <span ref="rootRef" :class="ns.b">
    <span
      ref="triggerRef"
      :class="ns.e('trigger')"
      :tabindex="$slots.trigger ? undefined : 0"
      aria-haspopup="dialog"
      :aria-expanded="isOpen"
      @click="toggle"
      @keydown="onTriggerKeydown"
    >
      <slot name="trigger" />
    </span>

    <Transition :name="ns.m('fade')">
      <div
        v-if="isOpen"
        ref="panelRef"
        :class="[ns.e('panel'), ns.m(placement)]"
        role="alertdialog"
        :aria-labelledby="titleId"
        :aria-describedby="content || $slots.default ? `${titleId}-content` : undefined"
        @keydown="onPanelKeydown"
      >
        <p :id="titleId" :class="ns.e('title')">{{ title }}</p>
        <div v-if="content || $slots.default" :id="`${titleId}-content`" :class="ns.e('content')">
          <slot>{{ content }}</slot>
        </div>
        <div :class="ns.e('actions')">
          <button type="button" :class="ns.e('button')" @click="cancel">
            {{ cancelText ?? locale.cancel }}
          </button>
          <button
            ref="confirmRef"
            type="button"
            :class="[ns.e('button'), ns.em('button', props.confirmType)]"
            :disabled="loading"
            :aria-busy="loading || undefined"
            @click="confirm"
          >
            {{ loading ? '…' : (confirmText ?? locale.confirm) }}
          </button>
        </div>
      </div>
    </Transition>
  </span>
</template>
