# Tabs 标签页

在同一区域切换多组内容。

## 基础用法

<Demo name="tabs/basic" />

## 行为约定

- `role="tablist"` / `role="tab"` / `role="tabpanel"` 完整关联，`aria-selected` 与 `aria-controls` 自动维护。
- 方向键左右移动并激活，`Home` / `End` 跳到首尾，禁用项自动跳过。
- 采用 roving tabindex：只有当前标签可被 Tab 聚焦，进入后由方向键切换。
- `type="card"` 提供分段控件外观。

## 引入

```ts
import { VkTabs } from '@vakao/ui/tabs'
import '@vakao/ui/tabs/style.css'
```

## API

<ApiTable name="Tabs" />
