import type { ComponentSize, StatusType } from '@/core/types'

export interface SliderProps {
  /** 当前值 */
  modelValue?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  /** 显示当前值提示，默认 true */
  showTooltip?: boolean
  /** 自定义提示文案 */
  formatTooltip?: (value: number) => string
  status?: StatusType
  size?: ComponentSize
  id?: string
  ariaLabel?: string
}

export interface SliderEmits {
  (e: 'update:modelValue', value: number): void
  (e: 'change', value: number): void
}
