<script setup lang="ts">
import { computed } from 'vue'

/**
 * 示例站用的产品外壳：浏览器窗口栏 + 无内边距的整屏内容。
 * 与 DemoBlock 的区别是不加网格底纹和示例工具栏，避免"控件陈列"感。
 */
const props = withDefaults(
  defineProps<{
    /** demos/examples 下的文件名，例如 login */
    name: string
    /** 地址栏文案 */
    url?: string
  }>(),
  { url: 'app.vakao.cn' },
)

const modules = import.meta.glob('../../../demos/examples/*.vue', { eager: true })
const component = computed(
  () => modules[`../../../demos/examples/${props.name}.vue`]?.default as unknown,
)
</script>

<template>
  <div class="vk-frame">
    <div class="vk-frame__bar">
      <span class="vk-frame__dots" aria-hidden="true"> <span /><span /><span /> </span>
      <span class="vk-frame__url">{{ url }}</span>
    </div>
    <div class="vk-frame__body">
      <component :is="component" v-if="component" />
    </div>
  </div>
</template>
