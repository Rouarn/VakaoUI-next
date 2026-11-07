import type { ComponentSize } from '@/core/types'

export interface CheckboxProps {
  /** 是否选中 */
  modelValue?: boolean
  /** 半选状态，优先级低于 indeterminate 的视觉表达 */
  indeterminate?: boolean
  disabled?: boolean
  /** 文字标签，也可用默认插槽 */
  label?: string
  size?: ComponentSize
  id?: string
  /** 无可见标签时的可访问名称 */
  ariaLabel?: string
}

export interface CheckboxEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}
