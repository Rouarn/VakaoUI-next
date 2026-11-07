# Watermark 水印

在内容区域上叠加平铺的文字或图片水印，用于标识文档密级、来源与版权信息。

## 基础用法

<Demo name="watermark/basic" />

## 行为约定

- 文字水印在 `onMounted` 后通过 canvas 生成平铺 PNG，并按 `devicePixelRatio` 缩放，保证高分屏下清晰。
- `content` 为数组时逐行绘制；`image` 有值时直接以图片作为平铺单元，`gap` 与 `offset` 控制平铺效果。
- 水印层设置 `aria-hidden="true"` 与 `pointer-events: none`，不参与可访问性树，也不拦截内容交互。
- 仅在挂载后访问 DOM 与 canvas，SSR 下不生成图案；相关属性变化时会重新绘制。
- `fullscreen` 时水印层改为 `position: fixed` 并提升层级；颜色、字号、旋转角均可用 props 覆盖，容器样式沿用 `--vk-font-family` 等令牌。

## 引入

```ts
import { VkWatermark } from '@vakao/ui/watermark'
import '@vakao/ui/watermark/style.css'
```

## API

<ApiTable name="Watermark" />
