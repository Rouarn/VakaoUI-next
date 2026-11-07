import type { VNode } from 'vue'

export type ImageFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'

export interface ImageProps {
  /** 图片地址，必填 */
  src: string
  /** 替代文本，同时作为预览对话框名称的默认来源 */
  alt?: string
  /** 宽度，数字按 px 处理 */
  width?: number | string
  /** 高度，数字按 px 处理 */
  height?: number | string
  /** 图片填充方式，默认 cover */
  fit?: ImageFit
  /** 使用圆形裁切 */
  round?: boolean
  /** 点击图片打开全屏预览 */
  preview?: boolean
  /** 预览时使用的高清图地址，未传时使用 src */
  previewSrc?: string
  /** 加载失败时自动重试的回退图片地址 */
  fallbackSrc?: string
  /** 预览对话框的可访问名称，默认取 alt，仍为空时使用「图片预览」 */
  previewLabel?: string
}

export interface ImageEmits {
  /** 图片加载完成 */
  (e: 'load', event: Event): void
  /** 图片加载失败，使用回退图片前触发 */
  (e: 'error', event: Event): void
}

export interface ImageSlots {
  /** 加载失败且没有可用回退时展示的内容 */
  error?: () => VNode[] | string
}
