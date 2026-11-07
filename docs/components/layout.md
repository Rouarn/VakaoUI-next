# Layout 布局

页面级布局容器，提供 Header / Sider / Content / Footer 四个语义区块，支持可折叠侧边栏与嵌套。

## 基础用法

<Demo name="layout/basic" />

## 行为约定

- `VkLayout` 默认纵向排列；声明 `has-sider` 后切换为横向，Sider 与内容区并排。
- Sider 渲染为 `aside`，Header / Content / Footer 分别使用 `header` / `main` / `footer` 语义标签。
- 折叠只改变宽度并带过渡，内容区通过 `flex` 自适应，不做重排。
- 内层布局可继续嵌套 `VkLayout`，形成“侧边栏 + 顶栏 + 内容”结构。

## 引入

```ts
import {
  VkLayout,
  VkLayoutHeader,
  VkLayoutSider,
  VkLayoutContent,
  VkLayoutFooter,
} from '@vakao/ui/layout'
import '@vakao/ui/layout/style.css'
```

## API

### Layout

<ApiTable name="Layout" />

### LayoutSider

<ApiTable name="LayoutSider" />

### LayoutHeader / LayoutContent / LayoutFooter

<ApiTable name="LayoutHeader" />
