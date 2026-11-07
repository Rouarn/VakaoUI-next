export type ScrollbarSize = 'small' | 'medium' | 'large'

export interface ScrollbarState {
  scrollTop: number
  scrollLeft: number
  scrollHeight: number
  scrollWidth: number
  clientHeight: number
  clientWidth: number
}

export interface ScrollbarProps {
  /** 滚动条粗细 */
  size?: ScrollbarSize
  /** 是否允许横向滚动 */
  xScrollable?: boolean
  /** 是否允许纵向滚动 */
  yScrollable?: boolean
  /** 始终显示滚动条，不随鼠标移出隐藏 */
  always?: boolean
  /** 使用浏览器原生滚动条，并关闭自绘滚动条 */
  native?: boolean
  /** 内容区可访问名称 */
  ariaLabel?: string
  /** 内容区附加类名 */
  contentClass?: string
}

export interface ScrollbarEmits {
  /** 容器滚动时触发 */
  (e: 'scroll', state: ScrollbarState): void
}

export interface ScrollbarSlots {
  /** 滚动内容 */
  default?: () => unknown
}

export interface ScrollbarScrollToOptions {
  top?: number
  left?: number
  behavior?: 'auto' | 'smooth'
}

export interface ScrollbarExpose {
  /** 滚动到指定位置，语义与原生 scrollTo 一致 */
  scrollTo: (options: ScrollbarScrollToOptions | number, y?: number) => void
  /** 重新测量内容与容器尺寸 */
  update: () => void
}
