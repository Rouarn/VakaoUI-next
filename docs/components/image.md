# Image 图片

带加载占位、失败回退与全屏预览的图片容器。

## 基础用法

<Demo name="image/basic" />

## 行为约定

- 加载中显示占位与旋转指示，完成后移除；`fit` 直接映射为 `object-fit`，默认 `cover`。
- 加载失败且提供 `fallbackSrc` 时自动换成回退地址重试一次，仍失败才渲染错误占位并展示 `#error` 插槽。
- `preview` 打开全屏预览：锁定页面滚动、支持 Esc 与遮罩关闭、Tab 焦点陷阱，关闭后焦点回到触发图片。
- 预览缩放限制在 0.5–3 之间，步长 0.25，可用工具条的缩小 / 放大 / 重置按钮或鼠标滚轮调整。
- `round` 使用 `--vk-radius-full`；预览层级取自 `ConfigProvider` 的 `zIndex`，预览名默认回退到 `alt` 与「图片预览」。

## 引入

```ts
import { VkImage } from '@vakao/ui/image'
import '@vakao/ui/image/style.css'
```

## API

<ApiTable name="Image" />
