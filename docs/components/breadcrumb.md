# Breadcrumb 面包屑

展示页面层级路径，支持数据驱动与组合式两种写法。

## 基础用法

<Demo name="breadcrumb/basic" />

## 行为约定

- 根节点为 `nav`，通过语言包输出“面包屑”名称；层级使用有序列表 `ol`。
- 数据驱动模式下最后一项自动标记 `aria-current="page"`；组合式写法通过 `current` 显式指定。
- 分隔符通过 CSS 变量注入，空字符串可隐藏分隔符。
- 当前页渲染为纯文本，不可点击。

## 引入

```ts
import { VkBreadcrumb, VkBreadcrumbItem } from '@vakao/ui/breadcrumb'
import '@vakao/ui/breadcrumb/style.css'
```

## API

### Breadcrumb

<ApiTable name="Breadcrumb" />

### BreadcrumbItem

<ApiTable name="BreadcrumbItem" />
