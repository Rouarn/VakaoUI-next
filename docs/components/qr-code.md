# QrCode 二维码

内置编码器，按字节模式生成 SVG 二维码，不依赖 Canvas，可在 SSR 中直接输出。

## 基础用法

<Demo name="qr-code/basic" />

## 纠错等级与容量

支持版本 1–10，按内容长度自动选择最小版本。单段字节模式下的容量上限：

| 等级 | 可容纳字节（约） | 适用场景               |
| ---- | ---------------- | ---------------------- |
| `L`  | 271              | 内容较长、印刷清晰     |
| `M`  | 213              | 默认，兼顾容量与容错   |
| `Q`  | 151              | 需要一定遮挡容忍度     |
| `H`  | 119              | 复杂环境或需要叠加图标 |

内容超出容量时组件不渲染图形，并在控制台给出提示；`encodeQrCode` 会抛出 `RangeError`。

## 行为约定

- 深色模块使用 `currentColor`，默认取 `--vk-text-color-1`；背景默认取 `--vk-color-card`，都可通过属性覆盖。
- `margin` 为四周留白模块数，默认 2；扫描时建议不小于 2。
- 容器带 `role="img"`，`aria-label` 默认取内容本身。
- 输出为纯 SVG，无 Canvas 与 DOM 测量，服务端渲染可用。

## 引入

```ts
import { VkQrCode } from '@vakao/ui/qr-code'
import '@vakao/ui/qr-code/style.css'
```

## API

<ApiTable name="QrCode" />
