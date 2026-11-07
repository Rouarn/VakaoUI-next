<script setup lang="ts">
import { brandTokens } from '@/tokens'

interface Swatch {
  name: string
  value: string
  note?: string
}

const props = withDefaults(
  defineProps<{
    /** 组名，仅用于标题 */
    label?: string
    /** 自定义色板；不传时展示品牌原始色 */
    items?: Swatch[]
  }>(),
  { label: undefined, items: undefined },
)

const brandSwatches: Swatch[] = Object.entries(brandTokens.color).map(([name, value]) => ({
  name,
  value: value as string,
}))

const list = props.items ?? brandSwatches
</script>

<template>
  <div class="vk-swatches">
    <p v-if="label" class="vk-swatches__label">{{ label }}</p>
    <ul class="vk-swatches__list">
      <li v-for="item in list" :key="item.name" class="vk-swatches__item">
        <span class="vk-swatches__chip" :style="{ background: item.value }" />
        <span class="vk-swatches__name">{{ item.name }}</span>
        <code class="vk-swatches__value">{{ item.value }}</code>
        <span v-if="item.note" class="vk-swatches__note">{{ item.note }}</span>
      </li>
    </ul>
  </div>
</template>
