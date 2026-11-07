<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useLocale, useNamespace } from '@/core'
import type { BackTopEmits, BackTopProps } from './types'

defineOptions({ name: 'VkBackTop' })

const props = withDefaults(defineProps<BackTopProps>(), {
  visibilityHeight: 200,
  right: 24,
  bottom: 24,
  target: undefined,
  position: 'fixed',
  ariaLabel: undefined,
})

const emit = defineEmits<BackTopEmits>()

const ns = useNamespace('back-top')
const locale = useLocale()
const visible = ref(false)
const scroller = ref<HTMLElement | Window>()
let listening = false

function toCssSize(value: number | string): string {
  return typeof value === 'number' ? `${value}px` : value
}

const style = computed(() => ({
  right: toCssSize(props.right),
  bottom: toCssSize(props.bottom),
}))

const classes = computed(() => [ns.b, { [ns.m('absolute')]: props.position === 'absolute' }])

function scrollTopOf(): number {
  if (!scroller.value || scroller.value === window) return window.scrollY
  return (scroller.value as HTMLElement).scrollTop
}

function update(): void {
  visible.value = scrollTopOf() > props.visibilityHeight
}

function onScroll(): void {
  update()
}

function resolveTarget(): HTMLElement | Window {
  if (!props.target) return window
  if (typeof props.target === 'string') {
    return document.querySelector<HTMLElement>(props.target) ?? window
  }
  return props.target
}

function bind(): void {
  scroller.value = resolveTarget()
  scroller.value.addEventListener('scroll', onScroll, { passive: true })
  listening = true
  update()
}

function unbind(): void {
  if (!listening) return
  scroller.value?.removeEventListener('scroll', onScroll)
  listening = false
}

function toTop(event: MouseEvent): void {
  emit('click', event)
  const target = scroller.value ?? window
  target.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(bind)
onBeforeUnmount(unbind)
</script>

<template>
  <Transition :name="ns.m('fade')">
    <button
      v-if="visible"
      type="button"
      :class="classes"
      :style="style"
      :aria-label="ariaLabel ?? locale.backTop"
      @click="toTop"
    >
      <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
        <path
          d="M8 13V4M4 7.5 8 3.5l4 4"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </Transition>
</template>
