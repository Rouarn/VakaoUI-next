export interface AnchorItem {
  /** 唯一标识，用于激活态与事件 */
  key: string
  /** 目标锚点，形如 `#section-id` */
  href: string
  /** 显示文案 */
  title: string
  /** 子级锚点 */
  children?: AnchorItem[]
}

export interface AnchorProps {
  /** 锚点数据 */
  items?: AnchorItem[]
  /** 滚动容器选择器，缺省监听 window */
  container?: string
  /** 目标距离容器顶部多少像素时视为激活，默认 0 */
  offsetTop?: number
  /** 是否使用 sticky 吸附，默认 true */
  affix?: boolean
  /** 点击时是否平滑滚动，默认 true */
  smooth?: boolean
  /** 导航的无障碍名称，默认「页内导航」 */
  ariaLabel?: string
}

export interface AnchorClickPayload {
  /** 被点击的锚点项 */
  item: AnchorItem
  /** 原始点击事件 */
  event: MouseEvent
}

export interface AnchorEmits {
  (e: 'click', payload: AnchorClickPayload): void
  (e: 'change', activeKey: string): void
}
