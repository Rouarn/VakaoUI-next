import type { ComponentSize } from '@/core/types'

export type TableAlign = 'left' | 'center' | 'right'
export type SortOrder = 'asc' | 'desc' | null

export interface TableColumn {
  /** 数据字段名，同时作为列标识 */
  key: string
  /** 表头文案 */
  title: string
  width?: number | string
  align?: TableAlign
  /** 超长内容省略 */
  ellipsis?: boolean
  /** 是否可排序 */
  sortable?: boolean
  /** 简单的文本渲染函数，复杂内容请使用 cell 插槽 */
  render?: (row: Record<string, unknown>, index: number) => string
}

export type TableRow = Record<string, unknown>

export interface TableProps {
  columns: TableColumn[]
  data: TableRow[]
  /** 行唯一标识字段，未传时使用索引 */
  rowKey?: string
  loading?: boolean
  /** 无数据时的文案 */
  emptyText?: string
  size?: ComponentSize
  striped?: boolean
  bordered?: boolean
  /** 受控排序字段 */
  sortKey?: string | null
  /** 受控排序方向 */
  sortOrder?: SortOrder
  /** 表格的可访问名称 */
  ariaLabel?: string
}

export interface TableEmits {
  (e: 'update:sortKey', value: string | null): void
  (e: 'update:sortOrder', value: SortOrder): void
  (e: 'sort-change', key: string | null, order: SortOrder): void
}
