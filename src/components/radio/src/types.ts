import type { ComponentSize } from '@/core/types'

export type RadioValue = string | number | boolean

export type RadioDirection = 'horizontal' | 'vertical'

export interface RadioGroupProps {
  /** 当前选中的值 */
  modelValue?: RadioValue | null
  /** 原生 name，同组必须一致；未传时自动生成 */
  name?: string
  disabled?: boolean
  size?: ComponentSize
  /** 排列方向，默认 horizontal */
  direction?: RadioDirection
  /** 无可见标签时的可访问名称 */
  ariaLabel?: string
  /** 局部禁用某一项时使用的整体禁用态 */
  readonly?: boolean
}

export interface RadioGroupEmits {
  (e: 'update:modelValue', value: RadioValue): void
  (e: 'change', value: RadioValue): void
}

export interface RadioProps {
  /** 该选项的值，在 RadioGroup 中必填 */
  value?: RadioValue
  /** 独立使用时的选中态；在 Group 中会被忽略 */
  modelValue?: boolean
  disabled?: boolean
  /** 文字标签，也可用默认插槽 */
  label?: string
  size?: ComponentSize
  id?: string
  ariaLabel?: string
}

export interface RadioEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}
