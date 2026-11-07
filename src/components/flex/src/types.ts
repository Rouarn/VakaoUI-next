import type { VNode } from 'vue'

export type FlexJustify =
  'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'

export type FlexAlign = 'start' | 'end' | 'center' | 'stretch' | 'baseline'

export interface FlexProps {
  /** 纵向排列，对应 flex-direction: column */
  vertical?: boolean
  /** 使用 inline-flex 布局，默认 false */
  inline?: boolean
  /** 主轴对齐方式，对应 justify-content */
  justify?: FlexJustify
  /** 交叉轴对齐方式，对应 align-items */
  align?: FlexAlign
  /** 子项间距，数字按 px 处理，字符串原样输出，默认 0 */
  gap?: number | string
  /** 允许换行，对应 flex-wrap: wrap，默认 false */
  wrap?: boolean
}

export interface FlexSlots {
  default?: () => VNode[] | string
}
