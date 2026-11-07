export type ListSize = 'small' | 'medium' | 'large'

export interface ListItem {
  /** 唯一标识，未传时使用数组下标 */
  key?: string | number
  /** 主标题 */
  title?: string
  /** 辅助描述 */
  description?: string
  /** 右侧附加信息 */
  extra?: string | number
}

export interface ListProps {
  /** 列表数据 */
  items?: ListItem[]
  /** 显示外边框 */
  bordered?: boolean
  /** 相邻条目之间显示分隔线，默认 true */
  split?: boolean
  /** 加载中，只展示加载态 */
  loading?: boolean
  /** 条目悬停时显示背景 */
  hoverable?: boolean
  /** 当前选中条目的 key，用于展示选中态 */
  selectedKey?: string | number
  /** 条目尺寸，未传时继承 ConfigProvider */
  size?: ListSize
  /** 空数据文案，未传时使用语言包默认值 */
  emptyText?: string
}

export interface ListSlots {
  /** 完全替换单项内容 */
  item?: (scope: { item: ListItem; index: number }) => unknown
  /** 单项左侧头像区域 */
  avatar?: (scope: { item: ListItem; index: number }) => unknown
  /** 单项右侧附加区域 */
  extra?: (scope: { item: ListItem; index: number }) => unknown
  /** 空数据占位 */
  empty?: () => unknown
}
