# Popover 气泡卡片

点击或悬停触发的轻量浮层，可承载说明、快捷操作或表单片段。

## 基础用法

<Demo name="popover/basic" />

## 行为约定

- 面板带 `role="dialog"`，打开时聚焦面板，Esc 或点击外部关闭。
- 支持 `top` / `bottom` / `left` / `right` 四个方向，默认 `bottom`；空间不足时自动翻转并在视口内收敛。
- 面板 Teleport 到 `body`，以触发元素为锚点定位，不受父级 `overflow: hidden`、`transform` 影响；需要挂到指定容器时使用 ConfigProvider 的 `getPopupContainer`。
- 面板宽度不小于触发元素，内容超出视口时在面板内部滚动。
- `open` 可用于受控模式。

## 引入

```ts
import { VkPopover } from '@vakao/ui/popover'
import '@vakao/ui/popover/style.css'
```

## API

<ApiTable name="Popover" />
