import type { VNode } from 'vue'

export type AvatarSize = 'small' | 'medium' | 'large'

export interface AvatarProps {
  /** 图片地址 */
  src?: string
  /** 替代文本；无图片时也作为文字头像的来源 */
  alt?: string
  /** 尺寸，数字按 px 处理，默认继承 ConfigProvider */
  size?: AvatarSize | number
  /** 圆形头像；默认圆角方形 */
  round?: boolean
  /** 自定义背景色，仅文字头像生效 */
  color?: string
}

export interface AvatarSlots {
  default?: () => VNode[] | string
}
