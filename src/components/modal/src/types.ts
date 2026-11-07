export interface ModalProps {
  /** 是否打开 */
  open: boolean
  /** 标题，同时作为对话框的可访问名称 */
  title?: string
  /** 面板宽度，数字按 px 处理 */
  width?: number | string
  /** 显示右上角关闭按钮，默认 true */
  closable?: boolean
  /** 点击遮罩关闭，默认 true */
  maskClosable?: boolean
  /** 显示底部按钮，默认 true */
  footer?: boolean
  confirmText?: string
  cancelText?: string
  /** 确认按钮加载中 */
  loading?: boolean
  /** 关闭时销毁内容，默认 false */
  destroyOnClose?: boolean
  /** 自定义层级 */
  zIndex?: number
  /** 无标题时的可访问名称 */
  ariaLabel?: string
}

export interface ModalEmits {
  (e: 'update:open', value: boolean): void
  (e: 'ok'): void
  (e: 'cancel'): void
  (e: 'close'): void
}

export interface ModalSlots {
  default?: () => unknown
  title?: () => unknown
  footer?: () => unknown
}
