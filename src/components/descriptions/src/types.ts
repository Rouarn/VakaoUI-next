import type { VNode } from 'vue'

export type DescriptionsSize = 'small' | 'medium' | 'large'

export type DescriptionsLabelPlacement = 'left' | 'top'

export interface DescriptionItem {
  /** 唯一标识，同时用于 `item-{key}` 插槽名 */
  key?: string | number
  /** 字段名 */
  label: string
  /** 字段值，也可用插槽自定义 */
  value?: string | number
  /** 占用的列数，默认 1 */
  span?: number
}

export interface DescriptionsProps {
  /** 描述项 */
  items: DescriptionItem[]
  /** 每行列数，默认 3 */
  column?: number
  /** 表格化边框 */
  bordered?: boolean
  /** 尺寸，默认 medium */
  size?: DescriptionsSize
  /** 标签位置，默认 left */
  labelPlacement?: DescriptionsLabelPlacement
}

export interface DescriptionsSlots {
  [name: string]: (() => VNode[] | string) | undefined
}
