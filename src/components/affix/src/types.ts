import type { VNode } from 'vue'

export interface AffixProps {
  /** 距离顶部多少像素时固定，默认 0 */
  offsetTop?: number
  /** 距离底部多少像素时贴底固定；设置后按底部条件判断 */
  offsetBottom?: number
  /** 滚动容器选择器，缺省监听 window */
  target?: string
  /** 固定时的层级；不传时沿用样式表默认值 */
  zIndex?: number
}

export interface AffixEmits {
  (e: 'change', fixed: boolean): void
}

export interface AffixSlots {
  default?: () => VNode[] | string
}
