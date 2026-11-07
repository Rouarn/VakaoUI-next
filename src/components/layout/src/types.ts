import type { VNode } from 'vue'

export interface LayoutProps {
  /** 声明子元素包含 Sider，切换为水平布局 */
  hasSider?: boolean
}

export interface LayoutSlots {
  default?: () => VNode[] | string
}

export interface LayoutSiderProps {
  /** 展开宽度，数字按 px 处理，默认 220 */
  width?: number | string
  /** 收起宽度，数字按 px 处理，默认 64 */
  collapsedWidth?: number | string
  /** 收起状态 */
  collapsed?: boolean
  /** 显示右侧分隔线，默认 true */
  bordered?: boolean
}

export interface LayoutSectionSlots {
  default?: () => VNode[] | string
}
