# Popover 气泡卡片

点击或悬停触发的轻量浮层，可承载说明、快捷操作或表单片段。

## 基础用法

<Demo name="popover/basic" />

## 行为约定

- 面板带 `role="dialog"`，打开时聚焦面板，Esc 或点击外部关闭。
- 支持 `top` / `bottom` / `left` / `right` 四个方向，默认 `bottom`。
- 面板使用绝对定位，父级 `overflow: hidden` 可能裁剪；需要更复杂的定位时请改用 Modal。
- `open` 可用于受控模式。

## 引入

```ts
import { VkPopover } from '@vakao/ui/popover'
import '@vakao/ui/popover/style.css'
```

## API

<ApiTable name="Popover" />
