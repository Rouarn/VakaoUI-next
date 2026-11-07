export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right'

export type PopoverTrigger = 'click' | 'hover'

export interface PopoverProps {
  /** 受控打开状态 */
  open?: boolean
  /** 触发方式，默认 click */
  trigger?: PopoverTrigger
  /** 弹出方向，默认 bottom */
  placement?: PopoverPlacement
  /** 标题 */
  title?: string
  /** 内容文本，也可用默认插槽 */
  content?: string
  disabled?: boolean
  /** 面板宽度 */
  width?: number | string
}

export interface PopoverEmits {
  (e: 'update:open', value: boolean): void
  (e: 'open'): void
  (e: 'close'): void
}

export interface PopoverSlots {
  trigger?: () => unknown
  default?: () => unknown
}
