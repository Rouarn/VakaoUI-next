<script setup lang="ts">
import { computed } from 'vue'
import { useLocale, useNamespace } from '@/core'
import { encodeQrCode } from './qrcode'
import type { QrCodeProps } from './types'

defineOptions({ name: 'VkQrCode' })

const props = withDefaults(defineProps<QrCodeProps>(), {
  value: '',
  size: 160,
  level: 'M',
  color: 'var(--vk-text-color-1)',
  backgroundColor: 'var(--vk-color-card)',
  margin: 2,
  radius: 0,
  ariaLabel: undefined,
})

const ns = useNamespace('qr-code')
const locale = useLocale()

const matrix = computed(() => {
  try {
    return encodeQrCode(props.value, props.level)
  } catch (error) {
    console.warn('[VkQrCode] 内容超出可编码范围：', error)
    return null
  }
})

const total = computed(() => (matrix.value?.size ?? 0) + props.margin * 2)

const path = computed(() => {
  const data = matrix.value
  if (!data) return ''

  const parts: string[] = []
  data.modules.forEach((row, y) => {
    let x = 0
    while (x < data.size) {
      if (!row[x]) {
        x += 1
        continue
      }
      let end = x
      while (end < data.size && row[end]) end += 1
      parts.push(`M${x} ${y}h${end - x}v1h${x - end}z`)
      x = end
    }
  })

  return parts.join('')
})

const style = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  color: props.color,
  borderRadius: `${props.radius}px`,
}))

const label = computed(() => props.ariaLabel ?? (props.value || locale.value.qrCode))
</script>

<template>
  <div :class="ns.b" :style="style" role="img" :aria-label="label">
    <svg
      v-if="matrix"
      :class="ns.e('svg')"
      :viewBox="`0 0 ${total} ${total}`"
      shape-rendering="crispEdges"
      aria-hidden="true"
    >
      <rect x="0" y="0" :width="total" :height="total" :style="{ fill: backgroundColor }" />
      <g :transform="`translate(${margin} ${margin})`">
        <path :d="path" fill="currentColor" />
      </g>
    </svg>
  </div>
</template>
