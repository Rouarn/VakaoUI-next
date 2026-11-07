import type { VNode } from 'vue'

export type DividerType = 'horizontal' | 'vertical'

export type DividerTitlePlacement = 'left' | 'center' | 'right'

export interface DividerProps {
  /** 方向，默认 horizontal */
  type?: DividerType
  /** 标题位置，默认 center */
  titlePlacement?: DividerTitlePlacement
  /** 虚线 */
  dashed?: boolean
  /** 标题使用次要文本色 */
  plain?: boolean
}

export interface DividerSlots {
  default?: () => VNode[] | string
}
