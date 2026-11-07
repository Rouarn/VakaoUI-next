# Spin 加载

包裹内容并展示加载态，或作为独立指示器使用。

## 基础用法

<Demo name="spin/basic" />

## 行为约定

- 加载指示器带 `role="status"`，文案可通过 `tip` 或 `locale.loading` 提供。
- `delay` 用于避免快速请求造成的闪烁；关闭时立即隐藏。
- 遮罩只覆盖组件自身区域，不会锁定页面滚动。

## 引入

```ts
import { VkSpin } from '@vakao/ui/spin'
import '@vakao/ui/spin/style.css'
```

## API

<ApiTable name="Spin" />
