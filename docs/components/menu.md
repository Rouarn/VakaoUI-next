# Menu 菜单

侧边导航或多级命令菜单，支持一层子菜单。

## 基础用法

<Demo name="menu/basic" />

## 行为约定

- 根容器 `role="menubar"`，条目 `role="menuitem"`，子菜单为嵌套 `role="menu"`。
- `ArrowUp` / `ArrowDown` 在可见条目间移动，`Home` / `End` 跳到首尾。
- `ArrowRight` 展开子菜单，`ArrowLeft` 收起并回到父项。
- 选中项同时使用背景、文字色与字重区分，不只依赖颜色。

## 引入

```ts
import { VkMenu } from '@vakao/ui/menu'
import '@vakao/ui/menu/style.css'
```

## API

<ApiTable name="Menu" />
