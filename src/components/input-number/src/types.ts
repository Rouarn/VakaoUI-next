import type { ComponentSize, StatusType } from '@/core/types'

export interface InputNumberProps {
  /** 当前值，空值为 null */
  modelValue?: number | null
  min?: number
  max?: number
  /** 每次增减的步长 */
  step?: number
  /** 小数位数，未传时不限制 */
  precision?: number
  placeholder?: string
  disabled?: boolean
  /** 显示增减按钮，默认 true */
  controls?: boolean
  size?: ComponentSize
  status?: StatusType
  id?: string
  /** 无可见标签时的可访问名称 */
  ariaLabel?: string
}

export interface InputNumberEmits {
  (e: 'update:modelValue', value: number | null): void
  (e: 'change', value: number | null): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}
