export interface EmptyProps {
  /** 描述文字，未传时使用语言包中的“暂无数据” */
  description?: string
  /** 自定义插画图片地址 */
  image?: string
  /** 图片尺寸，数字按 px 处理 */
  imageSize?: number | string
}

export interface EmptySlots {
  default?: () => unknown
  image?: () => unknown
  action?: () => unknown
}
