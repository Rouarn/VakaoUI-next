import type { PopoverPlacement } from '@/components/popover'

export interface PopconfirmProps {
  /** 受控打开状态 */
  open?: boolean
  /** 标题，必填，同时作为对话框的可访问名称 */
  title: string
  /** 补充说明 */
  content?: string
  confirmText?: string
  cancelText?: string
  /** 确认按钮语义，danger 使用 error 色 */
  confirmType?: 'primary' | 'danger'
  loading?: boolean
  placement?: PopoverPlacement
  disabled?: boolean
}

export interface PopconfirmEmits {
  (e: 'update:open', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}

export interface PopconfirmSlots {
  trigger?: () => unknown
  default?: () => unknown
}
