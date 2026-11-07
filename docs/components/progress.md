# Progress 进度条

展示任务进度，支持线与环形两种形态。

## 基础用法

<Demo name="progress/basic" />

## 行为约定

- `value` 会自动夹取到 0–100，并通过 `role="progressbar"` + `aria-valuenow` 暴露给辅助技术。
- 环形使用 SVG 描边偏移绘制，颜色来自 `--vk-color-*` 令牌。
- `status` 只改变语义色，不改变进度值。

## 引入

```ts
import { VkProgress } from '@vakao/ui/progress'
import '@vakao/ui/progress/style.css'
```

## API

<ApiTable name="Progress" />
