# Pagination 分页

数据列表的分页导航，包含页码窗口、总数与每页条数切换。

## 基础用法

<Demo name="pagination/basic" />

## 行为约定

- 使用 `nav` 语义，当前页标记 `aria-current="page"`。
- 上一页 / 下一页按钮有独立 `aria-label`，无更多页时禁用。
- 页码过长时折叠为省略号，始终保留首页与末页。
- 切换每页条数会同时把当前页重置为 1。

## 引入

```ts
import { VkPagination } from '@vakao/ui/pagination'
import '@vakao/ui/pagination/style.css'
```

## API

<ApiTable name="Pagination" />
