import type { VNode } from 'vue'

export type BadgeType = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'

export interface BadgeProps {
  /** 显示的值；字符串原样展示，数字超过 max 时显示 max+ */
  value?: number | string
  /** 数字上限，默认 99 */
  max?: number
  /** 只显示圆点，不显示数值 */
  dot?: boolean
  /** 语义类型，默认 primary */
  type?: BadgeType
  /** 值为 0 时仍然显示 */
  showZero?: boolean
  /** 呼吸动画，用于“进行中”状态 */
  processing?: boolean
  /** 无障碍名称；圆点模式建议提供 */
  ariaLabel?: string
}

export interface BadgeSlots {
  default?: () => VNode[] | string
}
