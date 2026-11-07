<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { trapFocus, useConfig, useLocale, useNamespace } from '@/core'
import type { ModalEmits, ModalProps, ModalSlots } from './types'

let modalSeed = 0

function nextTitleId(): string {
  modalSeed += 1
  return `vk-modal-title-${modalSeed}`
}

defineOptions({ name: 'VkModal' })

const props = withDefaults(defineProps<ModalProps>(), {
  title: undefined,
  width: 520,
  closable: true,
  maskClosable: true,
  footer: true,
  confirmText: undefined,
  cancelText: undefined,
  loading: false,
  destroyOnClose: false,
  zIndex: undefined,
  ariaLabel: undefined,
})

const emit = defineEmits<ModalEmits>()

defineSlots<ModalSlots>()

const ns = useNamespace('modal')
const config = useConfig()
const locale = useLocale()

const dialogRef = ref<HTMLElement | null>(null)
const titleId = nextTitleId()
const rendered = ref(props.open)
let previousActive: HTMLElement | null = null
let previousOverflow = ''

const panelStyle = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  zIndex: String(props.zIndex ?? config.zIndex.value),
}))

function lockScroll(): void {
  if (typeof document === 'undefined') return
  previousOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
}

function unlockScroll(): void {
  if (typeof document === 'undefined') return
  document.body.style.overflow = previousOverflow
}

function close(source: 'mask' | 'button' | 'cancel' | 'ok'): void {
  if (source === 'cancel') emit('cancel')
  emit('update:open', false)
  emit('close')
}

function onMask(): void {
  if (!props.maskClosable) return
  close('mask')
}

function onOk(): void {
  emit('ok')
}

function onCancel(): void {
  close('cancel')
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    event.stopPropagation()
    close('button')
    return
  }
  trapFocus(event, dialogRef.value)
}

watch(
  () => props.open,
  (open) => {
    if (typeof document === 'undefined') return
    if (open) {
      rendered.value = true
      previousActive = document.activeElement as HTMLElement | null
      lockScroll()
      void nextTick(() => dialogRef.value?.focus())
    } else {
      unlockScroll()
      previousActive?.focus()
      previousActive = null
      if (props.destroyOnClose) rendered.value = false
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  unlockScroll()
})
</script>

<template>
  <Teleport to="body">
    <Transition :name="ns.m('fade')">
      <div v-if="open" :class="ns.b" :style="panelStyle">
        <div :class="ns.e('mask')" @click="onMask" />
        <div
          ref="dialogRef"
          :class="ns.e('dialog')"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="title ? titleId : undefined"
          :aria-label="title ? undefined : ariaLabel"
          tabindex="-1"
          @keydown="onKeydown"
        >
          <header v-if="title || $slots.title || closable" :class="ns.e('header')">
            <h2 v-if="title || $slots.title" :id="titleId" :class="ns.e('title')">
              <slot name="title">{{ title }}</slot>
            </h2>
            <button
              v-if="closable"
              type="button"
              :class="ns.e('close')"
              :aria-label="locale.close"
              @click="close('button')"
            >
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
                <path
                  d="M4 4l8 8M12 4l-8 8"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </header>

          <div :class="ns.e('body')">
            <slot v-if="!destroyOnClose || rendered" />
          </div>

          <footer v-if="footer || $slots.footer" :class="ns.e('footer')">
            <slot name="footer">
              <button type="button" :class="ns.e('button')" @click="onCancel">
                {{ cancelText ?? locale.cancel }}
              </button>
              <button
                type="button"
                :class="[ns.e('button'), ns.em('button', 'primary')]"
                :disabled="loading"
                :aria-busy="loading || undefined"
                @click="onOk"
              >
                {{ loading ? '…' : (confirmText ?? locale.confirm) }}
              </button>
            </slot>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
