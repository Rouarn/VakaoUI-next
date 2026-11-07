export interface DropdownItem {
  /** 唯一标识，选择时回传 */
  key: string
  label: string
  disabled?: boolean
  /** 危险操作，使用 error 语义色 */
  danger?: boolean
  /** 渲染为分割线，其他字段被忽略 */
  divider?: boolean
}

export type DropdownPlacement = 'bottom' | 'top'

export interface DropdownProps {
  items: DropdownItem[]
  /** 受控打开状态 */
  open?: boolean
  trigger?: 'click' | 'hover'
  placement?: DropdownPlacement
  disabled?: boolean
  /** 无可见标签时的可访问名称 */
  ariaLabel?: string
}

export interface DropdownEmits {
  (e: 'update:open', value: boolean): void
  (e: 'select', key: string, item: DropdownItem): void
  (e: 'open'): void
  (e: 'close'): void
}
