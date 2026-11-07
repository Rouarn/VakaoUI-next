# Card 卡片

承载一组相关内容的容器，提供标题、副标题、封面、页脚与额外操作插槽。

## 基础用法

<Demo name="card/basic" />

## 行为约定

- 默认带边框，使用表面色 `--vk-color-card`，不叠加阴影；`hoverable` 时才在悬停时抬升。
- 有 `title` 时根节点输出 `role="group"` 与 `aria-label`，便于按区块跳读。
- `flush` 让内容区去掉内边距，适合直接放表格、列表或图片。
- 标题渲染为普通文本而不是标题标签，避免破坏页面原有的大纲层级。

## 引入

```ts
import { VkCard } from '@vakao/ui/card'
import '@vakao/ui/card/style.css'
```

## API

<ApiTable name="Card" />
