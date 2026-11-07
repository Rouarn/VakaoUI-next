# Dropdown 下拉菜单

承载一组操作命令的菜单，支持分割线、禁用与危险操作。

## 基础用法

<Demo name="dropdown/basic" />

## 行为约定

- 面板使用 `role="menu"`，选项为 `role="menuitem"`；打开后焦点进入首个可用项。
- 支持 `ArrowUp` / `ArrowDown` / `Home` / `End` / `Escape`。
- `danger: true` 的选项使用 `error` 语义色，并保留可读文案。
- 默认 `trigger="click"`，可切换为 `hover`。

## 引入

```ts
import { VkDropdown } from '@vakao/ui/dropdown'
import '@vakao/ui/dropdown/style.css'
```

## API

<ApiTable name="Dropdown" />
