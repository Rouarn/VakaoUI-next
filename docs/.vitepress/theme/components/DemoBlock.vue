<script setup lang="ts">
import { computed, ref } from 'vue'

interface DemoBlockProps {
  /** demos 目录下的相对路径，例如 button/basic */
  name: string
  /** 示例说明，显示在工具栏左侧 */
  title?: string
  /** 示例容器改为纵向排列 */
  stack?: boolean
}

const props = withDefaults(defineProps<DemoBlockProps>(), {
  title: undefined,
  stack: false,
})

const modules = import.meta.glob('../../../demos/**/*.vue', { eager: true })
const sources = import.meta.glob('../../../demos/**/*.vue', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const key = computed(() => `../../../demos/${props.name}.vue`)
const component = computed(() => modules[key.value]?.default)
const source = computed(() => sources[key.value] as string | undefined)
const open = ref(false)
const copied = ref(false)

if (!component.value) {
  console.warn(`[Demo] 找不到示例：${props.name}`)
}

async function copy(): Promise<void> {
  if (!source.value) return
  try {
    await navigator.clipboard.writeText(source.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 1600)
  } catch {
    copied.value = false
  }
}
</script>

<template>
  <figure class="vk-demo">
    <div :class="['vk-demo__preview', { 'vk-demo__preview--stack': stack }]">
      <component :is="component" v-if="component" />
    </div>
    <figcaption class="vk-demo__bar">
      <span class="vk-demo__file">{{ title ?? `${name}.vue` }}</span>
      <span class="vk-demo__actions">
        <button v-if="source" type="button" class="vk-demo__btn" @click="copy">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" stroke="currentColor" />
            <path d="M10.5 3.5h-6a1 1 0 0 0-1 1v6" stroke="currentColor" stroke-linecap="round" />
          </svg>
          {{ copied ? '已复制' : '复制' }}
        </button>
        <button
          v-if="source"
          type="button"
          :class="['vk-demo__btn', { 'vk-demo__btn--open': open }]"
          :aria-expanded="open"
          @click="open = !open"
        >
          {{ open ? '收起代码' : '查看代码' }}
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M4 6.5 8 10.5l4-4"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </span>
    </figcaption>
    <pre v-if="open && source" class="vk-demo__code"><code>{{ source }}</code></pre>
  </figure>
</template>
