# Divider 分割线

分隔内容区块，支持水平 / 垂直方向、标题位置与虚线样式。

## 基础用法

<Demo name="divider/basic" />

## 行为约定

- 根节点使用 `role="separator"`，并按方向输出 `aria-orientation`。
- 水平分割线始终渲染两侧线条，标题只是中间的可选内容，保证有无标题时占位一致。
- 垂直分割线高度跟随当前行高（`1em`），适合放在行内文本或操作之间。

## 引入

```ts
import { VkDivider } from '@vakao/ui/divider'
import '@vakao/ui/divider/style.css'
```

## API

<ApiTable name="Divider" />
