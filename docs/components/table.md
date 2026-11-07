# Table 表格

数据驱动的表格，支持排序、自定义单元格、加载与空状态。

## 基础用法

<Demo name="table/basic" />

## 行为约定

- 使用原生 `table` 语义，表头 `scope="col"`，可排序列维护 `aria-sort`。
- 排序为受控三态：`asc → desc → 无`，通过 `v-model:sort-key` / `v-model:sort-order` 接管；传入受控值时组件会在本地排序。
- 复杂内容使用 `cell` 插槽，参数为 `{ row, column, index, value }`。
- 加载中容器标记 `aria-busy`，并叠加带 `role="status"` 的遮罩。
- 空数据时渲染 `emptyText` 或语言包中的「暂无数据」。

## 已知限制

- 0.1.0 未实现固定表头、列冻结、行选择与虚拟滚动。
- 大数据量建议配合分页使用。

## 引入

```ts
import { VkTable } from '@vakao/ui/table'
import '@vakao/ui/table/style.css'
```

## API

<ApiTable name="Table" />
