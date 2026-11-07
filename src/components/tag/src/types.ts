import type { VNode } from 'vue'

export type TagType = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'

export type TagSize = 'small' | 'medium' | 'large'

export interface TagProps {
  /** 语义类型，默认 default */
  type?: TagType
  /** 尺寸，默认 medium */
  size?: TagSize
  /** 显示边框，默认 true */
  bordered?: boolean
  /** 全圆角 */
  round?: boolean
  /** 显示关闭按钮 */
  closable?: boolean
  /** 禁用态：阻止关闭与交互 */
  disabled?: boolean
}

export interface TagEmits {
  (e: 'close', event: MouseEvent): void
}

export interface TagSlots {
  default?: () => VNode[] | string
  icon?: () => VNode[] | string
}
