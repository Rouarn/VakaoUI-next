export interface BackTopProps {
  /** 滚动超过该距离后显示，默认 200 */
  visibilityHeight?: number
  /** 距视口（或定位容器）右侧距离，数字按 px 处理 */
  right?: number | string
  /** 距视口（或定位容器）底部距离，数字按 px 处理 */
  bottom?: number | string
  /** 监听目标：CSS 选择器或元素；不传时监听 window */
  target?: string | HTMLElement
  /** 定位方式，默认 fixed；配合 target 做局部滚动时用 absolute */
  position?: 'fixed' | 'absolute'
  /** 无障碍名称，默认读取语言包 */
  ariaLabel?: string
}

export interface BackTopEmits {
  (e: 'click', event: MouseEvent): void
}
