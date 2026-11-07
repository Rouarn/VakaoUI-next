import type { VNode } from 'vue'

export type WatermarkGap = number | [number, number]

export interface WatermarkProps {
  /** 水印文字，数组时逐行绘制，默认空字符串 */
  content?: string | string[]
  /** 图片地址，设置后直接以图片作为平铺单元 */
  image?: string
  /** 字号，默认 14 */
  fontSize?: number
  /** 字体，缺省时继承组件计算样式 */
  fontFamily?: string
  /** 字重，默认 normal */
  fontWeight?: 'normal' | 'bold'
  /** 文字颜色，默认 rgba(0, 0, 0, 0.12) */
  color?: string
  /** 旋转角度，默认 -22 */
  rotate?: number
  /** 平铺间距，单值或 [水平, 垂直]，默认 [100, 100] */
  gap?: WatermarkGap
  /** 相对平铺单元的偏移，默认 [0, 0] */
  offset?: [number, number]
  /** 水印层层级，默认 9 */
  zIndex?: number
  /** 是否相对视口全屏铺满，默认 false */
  fullscreen?: boolean
}

export interface WatermarkSlots {
  default?: () => VNode[] | string
}
