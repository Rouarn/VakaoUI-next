# 常见问题

## 样式没有生效？

先确认引入了 `@vakao/ui/theme.css`（或包含它的 `styles.css`），再确认按需引入时带上了对应组件的 `style.css`。Token 变量缺失时组件会退化为透明背景，但不会报错。

## 为什么没有 CJS？

组件库只面向现代构建工具，ESM-only 可以避免双包带来的一致性问题和体积翻倍。Nuxt 3、Vite、Vue CLI 5 都能直接消费；CJS 环境请升级工具链。

## 可以只引一个组件吗？

可以：

```ts
import { VkButton } from '@vakao/ui'
import '@vakao/ui/button/style.css'
```

`sideEffects` 已声明，打包器不会因为 tree-shaking 丢掉样式。

## ConfigProvider 会不会影响布局？

不会。它渲染一个 `display: contents` 的元素，只负责下发 CSS 变量与上下文。

## 支持 Vue 2 / Vue 3.3 吗？

不支持 Vue 2。Vue 3.3 缺少部分类型能力，peer 依赖声明为 `^3.4`，低于该版本不保证可用。

## 为什么没有内置图标包？

图标与业务语义强相关，内置会强迫使用者接受一套视觉语言。组件只提供结构性的小图标（关闭、箭头、错误），业务图标请通过插槽传入。

## 表格支持虚拟滚动吗？

0.1.0 的 `VkTable` 面向常规数据量（百级行），没有做虚拟滚动。大数据量请配合分页，或等待后续版本。

## 有 i18n 吗？

有基础文案层：ConfigProvider 的 `locale` 支持 `zh-CN` 与 `en-US`，覆盖空状态、分页、确认与关闭提示。业务文案请自行维护。

## 主题切换后图表 / 画布不同步？

CSS 变量只影响 DOM。Canvas / SVG 图表需要读取 `getComputedStyle` 后在主题变化时重绘。

## 发现 bug 怎么反馈？

请附最小复现（Vue SFC + 版本号 + 浏览器），优先在 issue 模板中填写；安全相关问题请按 `SECURITY.md` 私下报告。
