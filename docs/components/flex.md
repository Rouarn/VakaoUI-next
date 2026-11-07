# Flex 弹性布局

用声明式的 props 替代重复的 flex 内联样式，快速完成对齐与间距控制。

## 基础用法

<Demo name="flex/basic" />

## 行为约定

- 根节点固定为 `div`，默认 `display: flex`，设置 `inline` 后切换为 `inline-flex`。
- `justify` / `align` 映射为 `justify-content` / `align-items`，其中 `start`、`end` 分别对应 `flex-start`、`flex-end`。
- `gap` 传数字时按 px 内联，传字符串时原样输出，可直接使用 `var(--vk-space-4)` 之类的令牌。
- 纯布局容器，不附加任何 ARIA 语义，读屏顺序仍由 DOM 顺序决定。

## 引入

```ts
import { VkFlex } from '@vakao/ui/flex'
import '@vakao/ui/flex/style.css'
```

## API

<ApiTable name="Flex" />
