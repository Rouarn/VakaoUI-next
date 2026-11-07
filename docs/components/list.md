# List 列表

用于展示一组结构化的条目，支持描述、附加信息与自定义头像区域。

## 基础用法

<Demo name="list/basic" />

## 行为约定

- 每个条目由 `title`、`description`、`extra` 组成，`item` 插槽可整体替换单项内容，`avatar` 与 `extra` 插槽用于补充前置图标和尾部操作。
- `bordered` 为整块列表添加边框与圆角，`split` 用相邻条目的上边框绘制分隔线，`hoverable` 提供悬停反馈，`selectedKey` 标记选中条目。
- 标题、描述、右侧附加信息分别使用主文字、次级文字与三级文字层级；标题单行省略，描述最多两行，超出部分截断。
- `size` 未传时继承 ConfigProvider 的组件尺寸，只影响条目内边距。
- `loading` 时以小型 Spin 占位；数据为空时渲染 Empty，可用 `empty` 插槽覆盖。
- 列表使用 `ul` / `li` 与 `role="list"`，保留原生列表语义，便于读屏按条目浏览。

## 引入

```ts
import { VkList } from '@vakao/ui/list'
import '@vakao/ui/list/style.css'
```

## API

<ApiTable name="List" />
