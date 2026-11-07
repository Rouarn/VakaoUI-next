import type { VNode } from 'vue'

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface TooltipProps {
  /** 提示文本，也可用默认插槽 */
  content?: string
  /** 弹出方向，默认 top */
  placement?: TooltipPlacement
  disabled?: boolean
  /** 显示 / 隐藏延迟（毫秒），默认 80 */
  delay?: number
  /** 面板最大宽度 */
  maxWidth?: number
}

export interface TooltipSlots {
  trigger?: () => VNode[] | string
  default?: () => VNode[] | string
}
