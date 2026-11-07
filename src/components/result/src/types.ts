import type { VNode } from 'vue'

export type ResultStatus = 'success' | 'warning' | 'error' | 'info' | '403' | '404' | '500'

export interface ResultProps {
  /** 结果状态，默认 info */
  status?: ResultStatus
  /** 标题，未传时使用语言包默认文案 */
  title?: string
  /** 补充说明 */
  description?: string
}

export interface ResultSlots {
  default?: () => VNode[] | string
  icon?: () => VNode[] | string
  title?: () => VNode[] | string
  description?: () => VNode[] | string
  extra?: () => VNode[] | string
}
