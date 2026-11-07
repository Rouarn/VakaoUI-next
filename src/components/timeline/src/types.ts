import type { VNode } from 'vue'

export type TimelineItemType = 'default' | 'success' | 'error' | 'warning' | 'info'

export interface TimelineItem {
  /** 唯一标识，缺省时使用数组索引 */
  key?: string | number
  /** 节点标题 */
  title?: string
  /** 节点描述内容 */
  content?: string
  /** 节点时间或其他辅助信息 */
  time?: string
  /** 节点语义类型，影响圆点与连接线颜色，默认 default */
  type?: TimelineItemType
  /** 自定义圆点图标，渲染在圆点内部 */
  icon?: VNode
}

export interface TimelineProps {
  /** 时间线节点数据 */
  items?: TimelineItem[]
  /** 水平排列，默认 false */
  horizontal?: boolean
}

export interface TimelineSlotScope {
  /** 当前节点数据 */
  item: TimelineItem
  /** 当前节点索引，从 0 开始 */
  index: number
}

export interface TimelineSlots {
  /** 替换整项内容，作用域参数为 { item, index } */
  item?: (scope: TimelineSlotScope) => VNode[] | string
  /** 替换节点圆点，作用域参数为 { item, index } */
  icon?: (scope: TimelineSlotScope) => VNode[] | string
}
