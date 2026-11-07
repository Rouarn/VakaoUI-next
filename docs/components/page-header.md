# PageHeader 页头

页面顶部的标题区，组合面包屑、返回按钮、副标题与操作区。

## 基础用法

<Demo name="page-header/basic" />

## 行为约定

- 返回按钮默认显示，输出 `type="button"` 与 `aria-label`（取 `backLabel`），点击只发出 `back` 事件，不处理路由。
- 标题渲染为 `h1`，可用 `#title` 插槽整体替换；`#subtitle` 插槽存在时即使没有 `subtitle` 属性也会渲染。
- `#extra` 固定靠右，通过 `margin-left: auto` 与标题保持分离；`#footer` 使用上边框与 `--vk-space-4` 内边距。
- `#breadcrumb` 仅在插槽存在时渲染，适合直接放入 VkBreadcrumb；尺寸、颜色全部来自 `--vk-*` 令牌。

## 引入

```ts
import { VkPageHeader } from '@vakao/ui/page-header'
import '@vakao/ui/page-header/style.css'
```

## API

<ApiTable name="PageHeader" />
