<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import {
  lockScroll,
  trapFocus,
  unlockScroll,
  useConfig,
  useLocale,
  useNamespace,
  usePopupContainer,
} from '@/core'
import type { DrawerEmits, DrawerProps, DrawerSlots } from './types'

let drawerSeed = 0

function nextTitleId(): string {
  drawerSeed += 1
  return `vk-drawer-title-${drawerSeed}`
}

defineOptions({ name: 'VkDrawer' })

const props = withDefaults(defineProps<DrawerProps>(), {
  open: false,
  title: undefined,
  placement: 'right',
  width: 360,
  height: 320,
  closable: true,
  maskClosable: true,
  zIndex: undefined,
  ariaLabel: undefined,
  destroyOnClose: false,
})

const emit = defineEmits<DrawerEmits>()

defineSlots<DrawerSlots>()

const ns = useNamespace('drawer')
const config = useConfig()
const locale = useLocale()
const container = usePopupContainer()

const panelRef = ref<HTMLElement | null>(null)
const titleId = nextTitleId()
const rendered = ref(props.open)
let previousActive: HTMLElement | null = null
let locked = false

const rootStyle = computed(() => ({
  zIndex: String(props.zIndex ?? config.zIndex.value),
}))

const panelStyle = computed(() => {
  const vertical = props.placement === 'left' || props.placement === 'right'
  const value = vertical ? props.width : props.height
  const size = typeof value === 'number' ? `${value}px` : value
  return vertical ? { width: size } : { height: size }
})

function lock(): void {
  if (locked) return
  locked = true
  lockScroll()
}

function unlock(): void {
  if (!locked) return
  locked = false
  unlockScroll()
}

function close(): void {
  emit('update:open', false)
  emit('close')
}

function onMask(): void {
  if (!props.maskClosable) return
  close()
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    event.stopPropagation()
    close()
    return
  }
  trapFocus(event, panelRef.value)
}

watch(
  () => props.open,
  (open) => {
    if (typeof document === 'undefined') return
    if (open) {
      rendered.value = true
      previousActive = document.activeElement as HTMLElement | null
      lock()
      void nextTick(() => panelRef.value?.focus())
    } else {
      unlock()
      previousActive?.focus()
      previousActive = null
      if (props.destroyOnClose) rendered.value = false
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  unlock()
})
</script>

<template>
  <Teleport :to="container">
    <Transition :name="ns.m('fade')">
      <div v-if="open" :class="ns.b" :style="rootStyle">
        <div :class="ns.e('mask')" @click="onMask" />

        <Transition :name="ns.em('panel', placement)">
          <div
            v-if="open"
            ref="panelRef"
            :class="[ns.e('panel'), ns.em('panel', placement)]"
            :style="panelStyle"
            role="dialog"
            aria-modal="true"
            :aria-labelledby="title || $slots.title ? titleId : undefined"
            :aria-label="title || $slots.title ? undefined : ariaLabel"
            tabindex="-1"
            @keydown="onKeydown"
          >
            <header v-if="title || $slots.title || closable" :class="ns.e('header')">
              <h2 v-if="title || $slots.title" :id="titleId" :class="ns.e('title')">
                <slot name="title">{{ title }}</slot>
              </h2>
              <div v-if="$slots.extra" :class="ns.e('extra')">
                <slot name="extra" />
              </div>
              <button
                v-if="closable"
                type="button"
                :class="ns.e('close')"
                :aria-label="locale.close"
                @click="close"
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

            <footer v-if="$slots.footer" :class="ns.e('footer')">
              <slot name="footer" />
            </footer>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
