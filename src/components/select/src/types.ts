import type { ComponentSize, StatusType } from '@/core/types'

export type SelectValue = string | number

export interface SelectOption {
  label: string
  value: SelectValue
  disabled?: boolean
}

export interface SelectProps {
  /** 选中值 */
  modelValue?: SelectValue | null
  /** 选项数据 */
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  /** 显示清空按钮 */
  clearable?: boolean
  /** 尺寸，未传时继承 FormItem / ConfigProvider */
  size?: ComponentSize
  /** 校验状态 */
  status?: StatusType
  id?: string
  /** 无可见标签时的可访问名称 */
  ariaLabel?: string
}

export interface SelectEmits {
  (e: 'update:modelValue', value: SelectValue | null): void
  (e: 'change', value: SelectValue | null, option: SelectOption | null): void
  (e: 'clear'): void
}
