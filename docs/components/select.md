# Select 选择器

从预置选项中选择单个值，支持键盘操作与清空。

## 基础用法

<Demo name="select/basic" />

## 行为约定

- 触发器使用 `role="combobox"`，列表为 `role="listbox"`，选项为 `role="option"`。
- 支持 `ArrowUp` / `ArrowDown` / `Home` / `End` / `Enter` / `Space` / `Escape`，并跳过禁用项。
- `aria-activedescendant` 指向当前高亮项，焦点始终停留在触发器上。
- 与 FormItem 联动时会继承 `id`、`disabled`、`size` 与 `aria-describedby`，并在选择后触发校验。

## 已知限制

- 0.1.0 仅支持单选，多选与远程搜索在 Roadmap 中。

## 引入

```ts
import { VkSelect } from '@vakao/ui/select'
import '@vakao/ui/select/style.css'
```

## API

<ApiTable name="Select" />
