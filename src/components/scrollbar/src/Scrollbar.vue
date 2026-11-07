<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import type { CSSProperties } from 'vue'
import { useNamespace } from '@/core'
import type {
  ScrollbarEmits,
  ScrollbarExpose,
  ScrollbarProps,
  ScrollbarScrollToOptions,
  ScrollbarSlots,
  ScrollbarState,
} from './types'

defineOptions({ name: 'VkScrollbar' })

const props = withDefaults(defineProps<ScrollbarProps>(), {
  size: 'medium',
  xScrollable: false,
  yScrollable: true,
  always: false,
  native: false,
  ariaLabel: undefined,
  contentClass: undefined,
})

const emit = defineEmits<ScrollbarEmits>()

defineSlots<ScrollbarSlots>()

const ns = useNamespace('scrollbar')

const containerRef = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()
const active = ref(false)
const dragging = ref<'x' | 'y' | null>(null)

interface BarState {
  visible: boolean
  size: number
  offset: number
}

const bars = reactive<{ vertical: BarState; horizontal: BarState }>({
  vertical: { visible: false, size: 0, offset: 0 },
  horizontal: { visible: false, size: 0, offset: 0 },
})

let observer: ResizeObserver | undefined
let hideTimer: number | undefined
let drag: {
  axis: 'x' | 'y'
  startPointer: number
  startScroll: number
  maxScroll: number
  track: number
  thumb: number
} | null = null

const classes = computed(() => [
  ns.b,
  ns.m(props.size),
  {
    [ns.m('active')]: active.value,
    [ns.m('always')]: props.always,
    [ns.m('native')]: props.native,
  },
])

const containerStyle = computed<CSSProperties>(() => ({
  overflowX: props.xScrollable ? 'auto' : 'hidden',
  overflowY: props.yScrollable ? 'auto' : 'hidden',
}))

const verticalStyle = computed(() => ({
  height: `${bars.vertical.size}px`,
  transform: `translateY(${bars.vertical.offset}px)`,
}))

const horizontalStyle = computed(() => ({
  width: `${bars.horizontal.size}px`,
  transform: `translateX(${bars.horizontal.offset}px)`,
}))

function measureBar(
  viewport: number,
  content: number,
  scroll: number,
): { visible: boolean; size: number; offset: number } {
  if (viewport <= 0 || content <= viewport) return { visible: false, size: 0, offset: 0 }
  const track = Math.max(0, viewport - 4)
  const size = Math.min(track, Math.max(20, (track * viewport) / content))
  const maxScroll = content - viewport
  const offset = maxScroll > 0 ? (scroll / maxScroll) * (track - size) : 0
  return { visible: track > 0, size, offset }
}

function update(): void {
  const el = containerRef.value
  if (!el) return

  if (props.yScrollable) {
    Object.assign(bars.vertical, measureBar(el.clientHeight, el.scrollHeight, el.scrollTop))
  } else {
    bars.vertical.visible = false
  }

  if (props.xScrollable) {
    Object.assign(bars.horizontal, measureBar(el.clientWidth, el.scrollWidth, el.scrollLeft))
  } else {
    bars.horizontal.visible = false
  }
}

function snapshot(): ScrollbarState {
  const el = containerRef.value
  return {
    scrollTop: el?.scrollTop ?? 0,
    scrollLeft: el?.scrollLeft ?? 0,
    scrollHeight: el?.scrollHeight ?? 0,
    scrollWidth: el?.scrollWidth ?? 0,
    clientHeight: el?.clientHeight ?? 0,
    clientWidth: el?.clientWidth ?? 0,
  }
}

function reveal(): void {
  active.value = true
  if (hideTimer !== undefined) {
    window.clearTimeout(hideTimer)
    hideTimer = undefined
  }
}

function scheduleHide(): void {
  if (props.always) return
  if (hideTimer !== undefined) window.clearTimeout(hideTimer)
  hideTimer = window.setTimeout(() => {
    active.value = false
    hideTimer = undefined
  }, 800)
}

function onScroll(): void {
  update()
  reveal()
  scheduleHide()
  emit('scroll', snapshot())
}

function onPointerEnter(): void {
  reveal()
}

function onPointerLeave(): void {
  if (dragging.value) return
  scheduleHide()
}

function onFocusIn(): void {
  reveal()
}

function onFocusOut(): void {
  scheduleHide()
}

function onThumbPointerDown(axis: 'x' | 'y', event: PointerEvent): void {
  const el = containerRef.value
  if (!el || event.button !== 0) return

  const thumb = event.currentTarget as HTMLElement
  const track = axis === 'y' ? el.clientHeight - 4 : el.clientWidth - 4
  const size = axis === 'y' ? bars.vertical.size : bars.horizontal.size
  const maxScroll =
    axis === 'y' ? el.scrollHeight - el.clientHeight : el.scrollWidth - el.clientWidth
  if (track <= size || maxScroll <= 0) return

  event.preventDefault()
  event.stopPropagation()

  drag = {
    axis,
    startPointer: axis === 'y' ? event.clientY : event.clientX,
    startScroll: axis === 'y' ? el.scrollTop : el.scrollLeft,
    maxScroll,
    track,
    thumb: size,
  }
  dragging.value = axis
  thumb.setPointerCapture?.(event.pointerId)
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)
  window.addEventListener('pointercancel', onPointerUp)
}

function onPointerMove(event: PointerEvent): void {
  const el = containerRef.value
  if (!el || !drag) return

  const delta = (drag.axis === 'y' ? event.clientY : event.clientX) - drag.startPointer
  const ratio = drag.maxScroll / (drag.track - drag.thumb)
  const next = drag.startScroll + delta * ratio
  const clamped = Math.min(drag.maxScroll, Math.max(0, next))

  if (drag.axis === 'y') el.scrollTop = clamped
  else el.scrollLeft = clamped
}

function onPointerUp(event: PointerEvent): void {
  const thumb = event.target as HTMLElement | null
  thumb?.releasePointerCapture?.(event.pointerId)
  drag = null
  dragging.value = null
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
  window.removeEventListener('pointercancel', onPointerUp)
  scheduleHide()
}

function onTrackPointerDown(axis: 'x' | 'y', event: PointerEvent): void {
  const el = containerRef.value
  if (!el || event.target !== event.currentTarget) return

  const bar = event.currentTarget as HTMLElement
  const thumb = bar.firstElementChild as HTMLElement | null
  const rect = bar.getBoundingClientRect()

  if (axis === 'y') {
    const pointer = event.clientY - rect.top
    const offset = thumb?.offsetTop ?? 0
    el.scrollTop += (pointer < offset ? -1 : 1) * el.clientHeight * 0.9
  } else {
    const pointer = event.clientX - rect.left
    const offset = thumb?.offsetLeft ?? 0
    el.scrollLeft += (pointer < offset ? -1 : 1) * el.clientWidth * 0.9
  }

  reveal()
  scheduleHide()
}

function scrollTo(options: ScrollbarScrollToOptions | number, y?: number): void {
  const el = containerRef.value
  if (!el) return
  const target = typeof options === 'number' ? { left: options, top: y ?? 0 } : options
  if (typeof el.scrollTo === 'function') el.scrollTo(target)
  else {
    el.scrollLeft = target.left ?? el.scrollLeft
    el.scrollTop = target.top ?? el.scrollTop
  }
  update()
}

function attachObserver(): void {
  if (typeof ResizeObserver === 'undefined') {
    window.addEventListener('resize', update)
    return
  }
  observer = new ResizeObserver(() => update())
  if (containerRef.value) observer.observe(containerRef.value)
  if (contentRef.value) observer.observe(contentRef.value)
}

function detachObserver(): void {
  observer?.disconnect()
  observer = undefined
  window.removeEventListener('resize', update)
}

watch(
  () => [props.xScrollable, props.yScrollable],
  () => {
    void nextTick(update)
  },
)

onMounted(() => {
  update()
  attachObserver()
})

onBeforeUnmount(() => {
  detachObserver()
  if (hideTimer !== undefined) window.clearTimeout(hideTimer)
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
  window.removeEventListener('pointercancel', onPointerUp)
})

defineExpose<ScrollbarExpose>({ scrollTo, update })
</script>

<template>
  <div
    :class="classes"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
    @focusin="onFocusIn"
    @focusout="onFocusOut"
  >
    <div
      ref="containerRef"
      :class="ns.e('container')"
      :style="containerStyle"
      tabindex="0"
      :aria-label="ariaLabel"
      @scroll.passive="onScroll"
    >
      <div ref="contentRef" :class="[ns.e('content'), contentClass]">
        <slot />
      </div>
    </div>

    <div
      v-show="bars.vertical.visible && (active || always)"
      :class="[ns.e('bar'), ns.em('bar', 'vertical')]"
      aria-hidden="true"
      @pointerdown="onTrackPointerDown('y', $event)"
    >
      <div
        :class="[ns.e('thumb'), { [ns.em('thumb', 'dragging')]: dragging === 'y' }]"
        :style="verticalStyle"
        @pointerdown="onThumbPointerDown('y', $event)"
      />
    </div>

    <div
      v-show="bars.horizontal.visible && (active || always)"
      :class="[ns.e('bar'), ns.em('bar', 'horizontal')]"
      aria-hidden="true"
      @pointerdown="onTrackPointerDown('x', $event)"
    >
      <div
        :class="[ns.e('thumb'), { [ns.em('thumb', 'dragging')]: dragging === 'x' }]"
        :style="horizontalStyle"
        @pointerdown="onThumbPointerDown('x', $event)"
      />
    </div>
  </div>
</template>
