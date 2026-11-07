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

<style>
.vk-swatches {
  margin: 16px 0 24px;
}

.vk-swatches__label {
  margin: 0 0 8px;
  color: var(--vk-text-color-2);
  font-size: 13px;
}

.vk-swatches__list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.vk-swatches__item {
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 2px 12px;
  align-items: center;
}

.vk-swatches__chip {
  grid-row: span 3;
  width: 28px;
  height: 28px;
  border: 1px solid var(--vk-border-color);
  border-radius: var(--vk-radius-small);
}

.vk-swatches__name {
  color: var(--vk-text-color-1);
  font-size: 13px;
}

.vk-swatches__value {
  color: var(--vk-text-color-3);
  font-size: 12px;
  background: transparent;
  padding: 0;
}

.vk-swatches__note {
  color: var(--vk-text-color-2);
  font-size: 12px;
}
</style>
