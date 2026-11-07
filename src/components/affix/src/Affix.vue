<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, type CSSProperties } from 'vue'
import { useNamespace } from '@/core'
import type { AffixEmits, AffixProps, AffixSlots } from './types'

defineOptions({ name: 'VkAffix' })

const props = withDefaults(defineProps<AffixProps>(), {
  offsetTop: 0,
  offsetBottom: undefined,
  target: undefined,
  zIndex: undefined,
})

const emit = defineEmits<AffixEmits>()

defineSlots<AffixSlots>()

const ns = useNamespace('affix')
const rootRef = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()
const rootStyle = ref<CSSProperties>({})
const contentStyle = ref<CSSProperties>({ position: 'static' })
const fixed = ref(false)
const scroller = ref<HTMLElement | Window>()
let listening = false
let frame = 0

function resolveTarget(): HTMLElement | Window {
  if (!props.target) return window
  return document.querySelector<HTMLElement>(props.target) ?? window
}

function viewportSize(): number {
  if (!scroller.value || scroller.value === window) return window.innerHeight
  return (scroller.value as HTMLElement).clientHeight
}

function relativeRect(rect: DOMRect): { top: number; bottom: number } {
  if (!scroller.value || scroller.value === window) {
    return { top: rect.top, bottom: rect.bottom }
  }
  const containerTop = (scroller.value as HTMLElement).getBoundingClientRect().top
  return { top: rect.top - containerTop, bottom: rect.bottom - containerTop }
}

function targetRect(): DOMRect | null {
  const target = scroller.value
  if (!target || target === window) return null
  return (target as HTMLElement).getBoundingClientRect()
}

function fixedOffset(): { top?: number; bottom?: number } {
  const rect = targetRect()
  if (props.offsetBottom === undefined) {
    return { top: (rect ? rect.top : 0) + props.offsetTop }
  }
  return {
    bottom: (rect ? window.innerHeight - rect.bottom : 0) + props.offsetBottom,
  }
}

function applyStyle(rect: DOMRect, isFixed: boolean): void {
  if (!isFixed) {
    if (contentStyle.value.position === 'static' && contentStyle.value.zIndex === props.zIndex)
      return
    contentStyle.value =
      props.zIndex === undefined
        ? { position: 'static' }
        : { position: 'static', zIndex: props.zIndex }
    return
  }

  const next: CSSProperties = {
    position: 'fixed',
    left: `${rect.left}px`,
    width: `${rect.width}px`,
  }
  const offset = fixedOffset()
  if (offset.top !== undefined) {
    next.top = `${offset.top}px`
  } else {
    next.bottom = `${offset.bottom}px`
  }
  if (props.zIndex !== undefined) next.zIndex = props.zIndex
  contentStyle.value = next
}

function measure(): void {
  const root = rootRef.value
  const content = contentRef.value
  if (!root || !content) return

  const rootRect = root.getBoundingClientRect()
  const relative = relativeRect(rootRect)
  const isFixed =
    props.offsetBottom === undefined
      ? relative.top <= props.offsetTop
      : relative.bottom >= viewportSize() - props.offsetBottom

  let rect = rootRect
  if (isFixed) {
    if (!fixed.value) {
      rect = content.getBoundingClientRect()
      rootStyle.value = { width: `${rect.width}px`, height: `${rect.height}px` }
    }
  } else if (rootStyle.value.width) {
    rootStyle.value = {}
  }

  if (isFixed !== fixed.value) {
    fixed.value = isFixed
    emit('change', isFixed)
  }
  applyStyle(rect, isFixed)
}

function schedule(): void {
  if (frame) return
  frame = requestAnimationFrame(() => {
    frame = 0
    measure()
  })
}

function bind(): void {
  scroller.value = resolveTarget()
  scroller.value.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)
  listening = true
  measure()
}

function unbind(): void {
  if (frame) {
    cancelAnimationFrame(frame)
    frame = 0
  }
  if (!listening) return
  scroller.value?.removeEventListener('scroll', schedule)
  window.removeEventListener('scroll', schedule)
  window.removeEventListener('resize', schedule)
  listening = false
}

onMounted(bind)
onBeforeUnmount(unbind)
</script>

<template>
  <div ref="rootRef" :class="ns.b" :style="rootStyle">
    <div ref="contentRef" :class="ns.e('content')" :style="contentStyle">
      <slot />
    </div>
  </div>
</template>
