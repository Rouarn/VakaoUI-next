export type AlertType = 'success' | 'warning' | 'error' | 'info'

export interface AlertProps {
  /** 语义类型，默认 info */
  type?: AlertType
  /** 标题 */
  title?: string
  /** 描述文本，也可用默认插槽 */
  description?: string
  /** 显示语义图标，默认 true */
  showIcon?: boolean
  /** 显示关闭按钮 */
  closable?: boolean
  /** 显示边框，默认 true */
  bordered?: boolean
}

export interface AlertEmits {
  (e: 'close'): void
}
