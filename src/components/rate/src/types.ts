export type RateSize = 'small' | 'medium' | 'large'

export interface RateProps {
  /** 当前分值，支持 0.5 步进 */
  modelValue?: number
  /** 星星总数，默认 5 */
  count?: number
  /** 允许半星 */
  allowHalf?: boolean
  /** 再次点击相同分值时清零 */
  clearable?: boolean
  disabled?: boolean
  readonly?: boolean
  /** 尺寸，默认 medium */
  size?: RateSize
  /** 无障碍名称，默认“评分” */
  ariaLabel?: string
}

export interface RateEmits {
  (e: 'update:modelValue', value: number): void
  (e: 'change', value: number): void
}
