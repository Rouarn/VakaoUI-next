export interface PaginationProps {
  /** 数据总数 */
  total: number
  /** 每页条数 */
  pageSize?: number
  /** 当前页，从 1 开始 */
  current?: number
  /** 左右各展示的页码数量 */
  siblingCount?: number
  /** 展示总数文案 */
  showTotal?: boolean
  /** 展示每页条数切换 */
  showSizeChanger?: boolean
  /** 每页条数候选 */
  pageSizeOptions?: number[]
  disabled?: boolean
  /** 导航区域的可访问名称 */
  ariaLabel?: string
}

export interface PaginationEmits {
  (e: 'update:current', value: number): void
  (e: 'update:pageSize', value: number): void
  (e: 'change', page: number, pageSize: number): void
}
