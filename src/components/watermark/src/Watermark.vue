<script setup lang="ts">
import { computed, onMounted, ref, watch, type CSSProperties } from 'vue'
import { useNamespace } from '@/core'
import type { WatermarkProps, WatermarkSlots } from './types'

defineOptions({ name: 'VkWatermark' })

const props = withDefaults(defineProps<WatermarkProps>(), {
  content: '',
  image: undefined,
  fontSize: 14,
  fontFamily: undefined,
  fontWeight: 'normal',
  color: 'rgba(0, 0, 0, 0.12)',
  rotate: -22,
  gap: () => [100, 100],
  offset: () => [0, 0],
  zIndex: 9,
  fullscreen: false,
})

defineSlots<WatermarkSlots>()

const ns = useNamespace('watermark')
const layerRef = ref<HTMLElement>()

const classes = computed(() => [ns.b, { [ns.m('fullscreen')]: props.fullscreen }])

const layerStyle = computed<CSSProperties>(() => ({
  zIndex: props.fullscreen ? Math.max(props.zIndex, 9999) : props.zIndex,
}))

function gapOf(): [number, number] {
  return Array.isArray(props.gap) ? props.gap : [props.gap, props.gap]
}

function clearBackground(layer: HTMLElement): void {
  layer.style.backgroundImage = 'none'
  layer.style.backgroundSize = ''
  layer.style.backgroundPosition = ''
}

function generate(): void {
  if (typeof document === 'undefined') return
  const layer = layerRef.value
  if (!layer) return

  const [gapX, gapY] = gapOf()
  const [offsetX, offsetY] = props.offset

  if (props.image) {
    layer.style.backgroundImage = `url(${JSON.stringify(props.image)})`
    layer.style.backgroundSize = ''
    layer.style.backgroundPosition = `${offsetX}px ${offsetY}px`
    return
  }

  const lines = (Array.isArray(props.content) ? props.content : [props.content]).filter(
    (line) => line !== '',
  )
  if (lines.length === 0) {
    clearBackground(layer)
    return
  }

  const fontSize = props.fontSize
  const lineHeight = fontSize + 8
  const fontFamily = props.fontFamily || getComputedStyle(layer).fontFamily || 'sans-serif'
  const font = `${props.fontWeight} ${fontSize}px ${fontFamily}`

  const measureCtx = document.createElement('canvas').getContext('2d')
  if (!measureCtx) return
  measureCtx.font = font
  const maxWidth = Math.max(...lines.map((line) => measureCtx.measureText(line).width))

  const tileWidth = Math.max(1, Math.ceil(maxWidth + gapX))
  const tileHeight = Math.max(1, Math.ceil(lines.length * lineHeight + gapY))
  const dpr = window.devicePixelRatio || 1
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.floor(tileWidth * dpr))
  canvas.height = Math.max(1, Math.floor(tileHeight * dpr))

  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.scale(dpr, dpr)
  ctx.font = font
  ctx.fillStyle = props.color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.translate(tileWidth / 2, tileHeight / 2)
  ctx.rotate((props.rotate * Math.PI) / 180)
  lines.forEach((line, index) => {
    const y = (index - (lines.length - 1) / 2) * lineHeight
    ctx.fillText(line, 0, y)
  })

  layer.style.backgroundImage = `url(${canvas.toDataURL('image/png')})`
  layer.style.backgroundSize = `${tileWidth}px ${tileHeight}px`
  layer.style.backgroundPosition = `${offsetX}px ${offsetY}px`
}

watch(
  () => [
    props.content,
    props.image,
    props.fontSize,
    props.fontFamily,
    props.fontWeight,
    props.color,
    props.rotate,
    props.gap,
    props.offset,
  ],
  () => generate(),
  { deep: true },
)

onMounted(generate)
</script>

<template>
  <div :class="classes">
    <slot />
    <div ref="layerRef" :class="ns.e('layer')" aria-hidden="true" :style="layerStyle" />
  </div>
</template>
