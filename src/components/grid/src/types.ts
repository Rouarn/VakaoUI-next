export type RowJustify = 'start' | 'center' | 'end' | 'space-between' | 'space-around'
export type RowAlign = 'top' | 'middle' | 'bottom' | 'stretch'

export interface RowProps {
  /** 列间距，数字按 px；数组形式为 [水平, 垂直] */
  gutter?: number | [number, number]
  /** 主轴对齐方式 */
  justify?: RowJustify
  /** 交叉轴对齐方式 */
  align?: RowAlign
  /** 是否换行 */
  wrap?: boolean
  /** 渲染标签 */
  tag?: string
}

export interface ColProps {
  /** 栅格占位，1–24 */
  span?: number
  /** 左侧偏移，1–24 */
  offset?: number
  /** 排列顺序 */
  order?: number
  /** 渲染标签 */
  tag?: string
}

export type SpaceSize = 'small' | 'medium' | 'large'

export interface SpaceProps {
  /** 间距，数字按 px；数组形式为 [水平, 垂直] */
  size?: number | SpaceSize | [number, number]
  direction?: 'horizontal' | 'vertical'
  align?: 'start' | 'center' | 'end' | 'baseline'
  wrap?: boolean
  /** 渲染标签 */
  tag?: string
}
