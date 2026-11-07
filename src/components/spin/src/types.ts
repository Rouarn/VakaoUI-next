import type { ComponentSize } from '@/core/types'

export interface SpinProps {
  /** 是否处于加载中 */
  spinning?: boolean
  size?: ComponentSize
  /** 加载提示文字 */
  tip?: string
  /** 延迟显示的毫秒数，避免闪烁 */
  delay?: number
  /** 显示遮罩，默认 true */
  overlay?: boolean
}

export interface SpinSlots {
  default?: () => unknown
}
