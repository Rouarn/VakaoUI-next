import type { VNode } from 'vue'
import type { ComponentSize } from '@/core/types'

export type ButtonType = 'default' | 'primary'

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'text'

export interface ButtonProps {
  /** 语义类型，默认 default */
  type?: ButtonType
  /** 视觉变体，默认 solid */
  variant?: ButtonVariant
  /** 尺寸，未传时继承 ConfigProvider */
  size?: ComponentSize
  disabled?: boolean
  loading?: boolean
  /** 占满父容器宽度 */
  block?: boolean
  /** 原生按钮类型 */
  htmlType?: 'button' | 'submit' | 'reset'
  ariaLabel?: string
}

export interface ButtonSlots {
  default?: () => VNode[]
  icon?: () => VNode[]
}
