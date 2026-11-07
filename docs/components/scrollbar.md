# Scrollbar 滚动条

容器滚动时隐藏浏览器原生滚动条，改用自绘轨道与滑块，视觉与组件库其余部分保持一致。

## 基础用法

<Demo name="scrollbar/basic" />

## 行为约定

- 默认只开启纵向滚动，需要横向时传 `x-scrollable`。
- 指针悬停、聚焦或滚动时滑轨出现，移出后淡出；`always` 常显，`native` 回退到原生滚动条。
- 点击轨道按一屏滚动，按住滑块可拖拽；容器本身可聚焦，方向键、PageUp / PageDown、Home / End 沿用原生键盘行为。
- 通过 `ResizeObserver` 监听容器与内容尺寸变化，组件卸载时释放监听。
- SSR 阶段不测量尺寸，只输出容器与插槽内容。

## 引入

```ts
import { VkScrollbar } from '@vakao/ui/scrollbar'
import '@vakao/ui/scrollbar/style.css'
```

## API

<ApiTable name="Scrollbar" />
