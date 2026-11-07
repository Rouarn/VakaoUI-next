# 主题定制

## 三层机制

1. **令牌**：所有颜色、圆角、间距、动效都是 `--vk-*` CSS 变量，默认值见 [设计令牌](/design/tokens)。
2. **ConfigProvider**：`theme="light | dark | auto"` 切换整套变量，`themeOverrides` 覆盖其中任意一项。
3. **局部覆盖**：组件根节点上的 `class` / `style` 直接写变量，作用范围只到该组件。

## 切换亮暗

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { VkConfigProvider } from '@vakao/ui'

const theme = ref<'light' | 'dark' | 'auto'>('auto')
</script>

<template>
  <VkConfigProvider :theme="theme">
    <slot />
  </VkConfigProvider>
</template>
```

`auto` 使用 `prefers-color-scheme`。ConfigProvider 会给包裹元素生成 `data-vk-theme` 属性，方便调试。

## 覆盖令牌

```vue
<VkConfigProvider
  :theme-overrides="{
    '--vk-color-primary': '#C43A21',
    '--vk-radius-medium': '10px',
    '--vk-font-size-medium': '15px',
  }"
>
  <App />
</VkConfigProvider>
```

`themeOverrides` 的值会写成内联 CSS 变量，优先级高于默认令牌，不会污染全局。可覆盖项建议限制在语义令牌层，不要直接改组件内部变量。

## 只换主色

```vue
<VkConfigProvider
  :theme-overrides="{
    '--vk-color-primary': '#1477D6',
    '--vk-color-primary-hover': '#0F6BC4',
    '--vk-color-primary-pressed': '#0B5AA6',
    '--vk-color-primary-suppl': 'rgba(20, 119, 214, 0.12)',
  }"
>
```

主色同时影响按钮、输入聚焦、链接、进度条与选中态。替换时请同步 `hover`、`pressed`、`suppl` 与 `text-color-on-primary`，并保证正文与按钮文字都达到 4.5:1。

## 品牌色

| 令牌                         | 亮色      | 暗色      | 用途              |
| ---------------------------- | --------- | --------- | ----------------- |
| `--vk-color-primary`         | `#C43A21` | `#FF8A5B` | 交互、链接、选中  |
| `--vk-text-color-on-primary` | `#FFF8F4` | `#171210` | 实心按钮文字      |
| `--vk-color-orange`          | `#F0995F` | 同左      | 四色星（warning） |
| `--vk-color-blue`            | `#5FBEDC` | 同左      | 四色星（info）    |
| `--vk-color-purple`          | `#A27FC2` | 同左      | 四色星（error）   |
| `--vk-color-yellow`          | `#EDDF55` | 同左      | 四色星（success） |

状态色的语义映射与对比度推导见 [状态色](/design/status-colors)。

## 尺寸与圆角

```css
--vk-radius-small: 6px;
--vk-radius-medium: 10px;
--vk-radius-large: 14px;
--vk-radius-full: 999px;

--vk-height-small: 28px;
--vk-height-medium: 36px;
--vk-height-large: 44px;
```

ConfigProvider 的 `size` 会把默认尺寸切到 `small | medium | large`，单个组件传 `size` 时以组件为准。
