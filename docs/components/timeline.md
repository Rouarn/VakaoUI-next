# Timeline 时间线

按时间顺序展示事件节点，支持语义类型、自定义圆点与水平排列。

## 基础用法

<Demo name="timeline/basic" />

## 行为约定

- 根节点为有序列表 `ol` 并显式声明 `role="list"`，节点顺序即 DOM 顺序。
- 首尾节点不绘制连接线，垂直模式连接线从圆点下方延伸，水平模式从圆点右侧延伸。
- 圆点仅作装饰，统一设置 `aria-hidden`，可读信息由标题、内容与时间承担。
- `type` 使用语义色令牌（success / warning / error / info），默认节点使用 `--vk-border-color-strong`。
- `#item` 会整体替换节点内容，`#icon` 会替换圆点，两者均提供 `{ item, index }` 作用域。

## 引入

```ts
import { VkTimeline } from '@vakao/ui/timeline'
import '@vakao/ui/timeline/style.css'
```

## API

<ApiTable name="Timeline" />
