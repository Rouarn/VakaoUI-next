# 快速开始

## 环境要求

| 依赖     | 版本                                                              |
| -------- | ----------------------------------------------------------------- |
| Vue      | `^3.4`（推荐 3.5+）                                               |
| Node     | `>=20.19`（仅构建需要）                                           |
| 包管理器 | pnpm 10+                                                          |
| 浏览器   | 现代常青浏览器（Chrome / Edge / Safari / Firefox 最近两个大版本） |

组件库以 ESM-only 发布，不提供 CJS 入口。Vite、Nuxt 3、Vue CLI 5 等现代构建工具可以直接消费。

## 安装

```bash
pnpm add @vakao/ui
```

## 引入样式

组件样式只消费 CSS 变量，变量来自 `@vakao/ui/theme.css`。

```ts
// 全量：主题变量 + 全部组件样式
import '@vakao/ui/styles.css'
```

```ts
// 按需：主题变量 + 单个组件样式（可配合 unplugin-vue-components）
import '@vakao/ui/theme.css'
import '@vakao/ui/button/style.css'
```

`styles.css` 已包含 `theme.css`，不要重复引入。

## 全量注册

```ts
import { createApp } from 'vue'
import VaKaoUI from '@vakao/ui'
import '@vakao/ui/styles.css'
import App from './App.vue'

createApp(App).use(VaKaoUI).mount('#app')
```

## 按需引入

```vue
<script setup lang="ts">
import { VkButton, VkInput } from '@vakao/ui'
</script>

<template>
  <VkButton type="primary">保存</VkButton>
  <VkInput placeholder="请输入" />
</template>
```

## 自动按需（unplugin-vue-components）

```ts
// vite.config.ts
import Components from 'unplugin-vue-components/vite'
import { VakaoUiResolver } from '@vakao/ui/resolver'

export default defineConfig({
  plugins: [
    Components({
      resolvers: [VakaoUiResolver()],
    }),
  ],
})
```

解析器会同时注入 `@vakao/ui/<component>/style.css`，因此只需要全局引一次 `@vakao/ui/theme.css`。

## 包一层 ConfigProvider

`VkConfigProvider` 负责主题、尺寸、语言与 z-index 基准。它使用 `display: contents`，不产生额外布局盒子。

```vue
<script setup lang="ts">
import { VkConfigProvider } from '@vakao/ui'
</script>

<template>
  <VkConfigProvider theme="auto" size="medium">
    <RouterView />
  </VkConfigProvider>
</template>
```

## SSR / Nuxt

组件库没有在模块顶层访问 `window` 或 `document`，可以直接在 SSR 中渲染。弹层类组件（Modal、Popover 等）的内容使用 `<Teleport to="body">`，服务端渲染时不会输出，客户端挂载后再出现。

Nuxt 3 需要把 `@vakao/ui` 加入 `build.transpile`：

```ts
export default defineNuxtConfig({
  build: { transpile: ['@vakao/ui'] },
  css: ['@vakao/ui/styles.css'],
})
```

## 文案与 i18n

内置 `zh-CN` 与 `en-US`，覆盖空状态、选择器占位、分页、确认 / 取消 / 关闭等结构性文案：

```vue
<VkConfigProvider locale="en-US">
  <App />
</VkConfigProvider>
```

也可以只覆盖部分字段：

```vue
<VkConfigProvider :locale="{ empty: '这里空空如也', confirm: '好的' }">
  <App />
</VkConfigProvider>
```

业务文案（按钮文字、表单标签、提示语）不在组件库范围内，请由应用自身维护。

## 图标

组件库不内置图标包，避免与业务视觉强耦合。关闭、箭头、错误等结构性图标由组件内部以 SVG 绘制；业务图标通过插槽传入：

```vue
<VkButton>
  <template #icon><MyIcon name="plus" /></template>
  新建
</VkButton>
```

图标装饰性场景请加 `aria-hidden="true"`；承载语义的图标请提供可访问名称。

## 下一步

- [主题定制](/guide/theming)
- [组件总览](/components/)
- [组件状态与完成度](/guide/components-status)
- [设计令牌](/design/tokens)
