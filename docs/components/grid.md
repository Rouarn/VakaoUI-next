# Grid 栅格

24 栅格布局与间距容器。

## 基础用法

<Demo name="grid/basic" />

## 行为约定

- `VkRow` 通过负外边距抵消 `VkCol` 的内边距，`gutter` 支持 `[水平, 垂直]`。
- `VkCol` 使用 `flex: 0 0 百分比`，`span` 与 `offset` 均按 24 栅格计算。
- `VkSpace` 提供 `small` / `medium` / `large` 预设，也可传数字或 `[水平, 垂直]`。
- 三个组件都支持 `tag` 自定义渲染标签。

## 已知限制

- 0.1.0 未提供响应式断点（`xs` / `md` 等），需要时请结合 CSS 媒体查询自行覆盖。

## 引入

```ts
import { VkRow, VkCol, VkSpace } from '@vakao/ui/grid'
import '@vakao/ui/grid/style.css'
```

## API

### Row

<ApiTable name="Row" />

### Col

<ApiTable name="Col" />

### Space

<ApiTable name="Space" />
