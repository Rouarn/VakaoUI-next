export type DrawerPlacement = 'right' | 'left' | 'top' | 'bottom'

export interface DrawerProps {
  /** 是否打开，默认 false */
  open?: boolean
  /** 标题，同时作为对话框的可访问名称 */
  title?: string
  /** 抽屉从哪一侧滑出，默认 right */
  placement?: DrawerPlacement
  /** 左右抽屉的宽度，数字按 px 处理，默认 360 */
  width?: number | string
  /** 上下抽屉的高度，数字按 px 处理，默认 320 */
  height?: number | string
  /** 显示关闭按钮，默认 true */
  closable?: boolean
  /** 点击遮罩关闭，默认 true */
  maskClosable?: boolean
  /** 自定义层级，未传时使用 ConfigProvider 的 zIndex */
  zIndex?: number
  /** 无标题时的可访问名称 */
  ariaLabel?: string
  /** 关闭后销毁内容，默认 false */
  destroyOnClose?: boolean
}

export interface DrawerEmits {
  (e: 'update:open', value: boolean): void
  (e: 'close'): void
}

export interface DrawerSlots {
  default?: () => unknown
  title?: () => unknown
  extra?: () => unknown
  footer?: () => unknown
}
