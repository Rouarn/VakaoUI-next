import type { ComponentSize } from '@/core/types'

export interface SwitchProps {
  /** 开关状态 */
  modelValue?: boolean
  disabled?: boolean
  /** 加载中，交互被禁用 */
  loading?: boolean
  /** 开关标签文字，也可用默认插槽 */
  label?: string
  size?: ComponentSize
  id?: string
  ariaLabel?: string
}

export interface SwitchEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}
