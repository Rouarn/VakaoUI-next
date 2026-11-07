import type { VNode } from 'vue'

export interface CardProps {
  /** 标题，也可用 header 插槽完全自定义 */
  title?: string
  /** 副标题 */
  subtitle?: string
  /** 显示边框，默认 true */
  bordered?: boolean
  /** 悬停时抬升阴影与边框 */
  hoverable?: boolean
  /** 内容区去掉内边距，用于表格、图片等贴边内容 */
  flush?: boolean
}

export interface CardSlots {
  default?: () => VNode[] | string
  header?: () => VNode[] | string
  extra?: () => VNode[] | string
  cover?: () => VNode[] | string
  footer?: () => VNode[] | string
}
