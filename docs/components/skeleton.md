# Skeleton 骨架屏

在内容加载完成前占位，降低布局跳动。

## 基础用法

<Demo name="skeleton/basic" />

## 行为约定

- 加载中容器标记 `aria-busy="true"`，占位块对读屏软件隐藏。
- `prefers-reduced-motion: reduce` 下关闭呼吸动画。
- 加载完成后直接渲染默认插槽内容，不保留占位节点。

## 引入

```ts
import { VkSkeleton } from '@vakao/ui/skeleton'
import '@vakao/ui/skeleton/style.css'
```

## API

<ApiTable name="Skeleton" />
