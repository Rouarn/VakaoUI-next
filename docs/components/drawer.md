# Drawer 抽屉

从屏幕边缘滑出的浮层面板，用于承载表单、详情或快捷操作。

## 基础用法

<Demo name="drawer/basic" />

## 行为约定

- 默认 Teleport 到 `body`，可用 ConfigProvider 的 `getPopupContainer` 指定容器，避免被父级 `overflow` 裁剪。
- `role="dialog"` + `aria-modal="true"`，有标题时自动关联 `aria-labelledby`；无标题时必须传 `ariaLabel`。
- 打开时锁定页面滚动并接管焦点，关闭后焦点回到触发元素；支持 Esc 关闭、遮罩关闭与 Tab 焦点陷阱。
- 左右方向由 `width` 决定宽度，上下方向由 `height` 决定高度，数字按 px 处理；遮罩覆盖整个视口。
- `destroyOnClose` 默认为 false，关闭后保留内容状态；置为 true 可在关闭时销毁正文。

## 引入

```ts
import { VkDrawer } from '@vakao/ui/drawer'
import '@vakao/ui/drawer/style.css'
```

## API

<ApiTable name="Drawer" />
