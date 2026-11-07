export type ProgressType = 'line' | 'circle'

export type ProgressStatus = 'normal' | 'success' | 'warning' | 'error'

export interface ProgressProps {
  /** 百分比，0–100，超出范围会被夹取 */
  value?: number
  /** 展示形态，默认 line */
  type?: ProgressType
  /** 语义状态，默认 normal */
  status?: ProgressStatus
  /** 显示百分比文字，默认 true */
  showLabel?: boolean
  /** 线宽，circle 时作为描边宽度 */
  strokeWidth?: number
  /** 环形直径，仅 circle 生效 */
  size?: number
  /** 自定义文字 */
  format?: (value: number) => string
}

export interface ProgressSlots {
  default?: (props: { value: number }) => unknown
}
