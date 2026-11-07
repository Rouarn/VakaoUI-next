<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch, type CSSProperties } from 'vue'
import {
  lockScroll,
  trapFocus,
  unlockScroll,
  useConfig,
  useLocale,
  useNamespace,
  usePopupContainer,
} from '@/core'
import type { ImageEmits, ImageProps, ImageSlots } from './types'

const MIN_ZOOM = 0.5
const MAX_ZOOM = 3
const ZOOM_STEP = 0.25

defineOptions({ name: 'VkImage' })

const props = withDefaults(defineProps<ImageProps>(), {
  alt: '',
  width: undefined,
  height: undefined,
  fit: 'cover',
  round: false,
  preview: false,
  previewSrc: undefined,
  fallbackSrc: undefined,
  previewLabel: undefined,
})

const emit = defineEmits<ImageEmits>()

defineSlots<ImageSlots>()

const ns = useNamespace('image')
const config = useConfig()
const locale = useLocale()
const container = usePopupContainer()

type ImageStatus = 'loading' | 'loaded' | 'error'

const status = ref<ImageStatus>('loading')
const usingFallback = ref(false)
const previewOpen = ref(false)
const zoom = ref(1)
const previewRef = ref<HTMLElement | null>(null)
let previousActive: HTMLElement | null = null
let locked = false

const displaySrc = computed(() =>
  usingFallback.value && props.fallbackSrc ? props.fallbackSrc : props.src,
)

const previewLabelText = computed(() => props.previewLabel || props.alt || '图片预览')

const classes = computed(() => [
  ns.b,
  {
    [ns.m('round')]: props.round,
    [ns.m('preview')]: props.preview,
    [ns.m('loading')]: status.value === 'loading',
    [ns.m('error')]: status.value === 'error',
  },
])

const sizeStyle = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
}))

const previewStyle = computed(() => ({ zIndex: String(config.zIndex.value) }))

const previewImgStyle = computed(() => ({ '--vk-image-zoom': String(zoom.value) }) as CSSProperties)

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

function onLoad(event: Event): void {
  status.value = 'loaded'
  emit('load', event)
}

function onError(event: Event): void {
  emit('error', event)
  if (props.fallbackSrc && !usingFallback.value) {
    usingFallback.value = true
    status.value = 'loading'
    return
  }
  status.value = 'error'
}

function openPreview(): void {
  if (!props.preview || status.value === 'error') return
  previewOpen.value = true
  previousActive = document.activeElement as HTMLElement | null
  lock()
  void nextTick(() => previewRef.value?.focus())
}

function closePreview(): void {
  if (!previewOpen.value) return
  previewOpen.value = false
  unlock()
  previousActive?.focus()
  previousActive = null
  zoom.value = 1
}

function zoomBy(delta: number): void {
  const next = Math.round((zoom.value + delta) * 100) / 100
  zoom.value = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, next))
}

function zoomIn(): void {
  zoomBy(ZOOM_STEP)
}

function zoomOut(): void {
  zoomBy(-ZOOM_STEP)
}

function resetZoom(): void {
  zoom.value = 1
}

function onWheel(event: WheelEvent): void {
  zoomBy(event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP)
}

function onPreviewKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    event.stopPropagation()
    closePreview()
    return
  }
  trapFocus(event, previewRef.value)
}

watch(
  () => props.src,
  () => {
    usingFallback.value = false
    status.value = 'loading'
  },
)

watch(
  () => props.preview,
  (value) => {
    if (!value) closePreview()
  },
)

onBeforeUnmount(() => {
  unlock()
})
</script>

<template>
  <figure
    :class="classes"
    :style="sizeStyle"
    :tabindex="preview ? 0 : undefined"
    :role="preview ? 'button' : undefined"
    :aria-label="preview ? previewLabelText : undefined"
    @click="openPreview"
    @keydown.enter.prevent="openPreview"
    @keydown.space.prevent="openPreview"
  >
    <img
      v-if="status !== 'error'"
      :class="ns.e('img')"
      :src="displaySrc"
      :alt="alt"
      :style="{ objectFit: fit }"
      @load="onLoad"
      @error="onError"
    />

    <div v-if="status === 'loading'" :class="ns.e('placeholder')" aria-hidden="true">
      <span :class="ns.e('spinner')" />
    </div>

    <div
      v-else-if="status === 'error'"
      :class="ns.e('error')"
      role="img"
      :aria-label="alt || '图片加载失败'"
    >
      <slot name="error">
        <svg viewBox="0 0 32 32" width="28" height="28" fill="none" aria-hidden="true">
          <rect
            x="4.5"
            y="6.5"
            width="23"
            height="19"
            rx="2"
            stroke="currentColor"
            stroke-width="1.6"
          />
          <path
            d="m6 22 6.5-6.5 5 5L21 17l5 5"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <circle cx="20.5" cy="12" r="1.6" fill="currentColor" />
          <path d="M6 6l20 20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
        </svg>
        <span :class="ns.e('error-text')">{{ alt || '图片加载失败' }}</span>
      </slot>
    </div>
  </figure>

  <Teleport :to="container">
    <Transition name="vk-image-preview--fade">
      <div
        v-if="previewOpen"
        ref="previewRef"
        class="vk-image-preview"
        :style="previewStyle"
        role="dialog"
        aria-modal="true"
        :aria-label="previewLabelText"
        tabindex="-1"
        @keydown="onPreviewKeydown"
        @wheel.prevent="onWheel"
      >
        <div class="vk-image-preview__mask" @click="closePreview" />

        <div class="vk-image-preview__toolbar">
          <button type="button" class="vk-image-preview__button" aria-label="缩小" @click="zoomOut">
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
              <path d="M4 8h8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
            </svg>
          </button>
          <button type="button" class="vk-image-preview__button" aria-label="放大" @click="zoomIn">
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
              <path
                d="M4 8h8M8 4v8"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
              />
            </svg>
          </button>
          <button
            type="button"
            class="vk-image-preview__button"
            aria-label="重置"
            @click="resetZoom"
          >
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
              <path
                d="M13 8a5 5 0 1 1-1.46-3.54"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
              />
              <path
                d="M13 3.5V6h-2.5"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            class="vk-image-preview__button"
            :aria-label="locale.close"
            @click="closePreview"
          >
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
              <path
                d="M4 4l8 8M12 4l-8 8"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>

        <img
          class="vk-image-preview__img"
          :src="previewSrc ?? src"
          :alt="alt"
          :style="previewImgStyle"
        />
      </div>
    </Transition>
  </Teleport>
</template>
