# Transfer 穿梭框

在左右两栏之间移动候选项，支持搜索、全选与禁用项。

## 基础用法

<Demo name="transfer/basic" />

## 行为约定

- 左侧为未在 `modelValue` 中的选项，右侧为已选项，两侧均保持 `options` 原有顺序。
- 勾选任意条目立即移动到另一侧，并触发 `update:modelValue` 与 `change(value, direction, movedKeys)`。
- `searchable` 默认开启，按 `label` 大小写不敏感过滤；搜索不改变已选集合。
- 开启 `showSelectAll` 时提供原生全选 checkbox，支持 `indeterminate` 状态，全选仅作用于当前过滤结果并跳过禁用项。
- 列表使用 `role="listbox"`，条目使用 `role="option"` 与 `aria-selected`，原生 checkbox 保证键盘可操作。
- 整体 `disabled` 时搜索框、全选与所有条目均不可交互。

## 引入

```ts
import { VkTransfer } from '@vakao/ui/transfer'
import '@vakao/ui/transfer/style.css'
```

## API

<ApiTable name="Transfer" />
