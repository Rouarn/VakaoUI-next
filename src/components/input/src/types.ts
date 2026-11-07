import type { ComponentSize, StatusType } from '@/core/types'

export type InputType = 'text' | 'password' | 'email' | 'search' | 'tel' | 'url'

export interface InputProps {
  /** 输入值 */
  modelValue?: string
  /** 原生 input 类型，默认 text */
  type?: InputType
  /** 渲染为多行文本域 */
  textarea?: boolean
  /** 多行行数，仅 textarea 生效 */
  rows?: number
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  /** 显示清空按钮 */
  clearable?: boolean
  /** 尺寸，未传时继承 FormItem / ConfigProvider */
  size?: ComponentSize
  /** 校验状态，影响边框与图标 */
  status?: StatusType
  maxlength?: number
  /** 显示字数统计，需同时传 maxlength */
  showCount?: boolean
  /** 原生 id，未传时使用 FormItem 提供的 id */
  id?: string
  /** 原生 name */
  name?: string
  autocomplete?: string
  /** 无可见标签时的可访问名称 */
  ariaLabel?: string
}

export interface InputEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string, event: Event): void
  (e: 'blur', event: FocusEvent): void
  (e: 'focus', event: FocusEvent): void
  (e: 'clear'): void
}

export interface InputSlots {
  prefix?: () => unknown
  suffix?: () => unknown
}
