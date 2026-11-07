import type { VNode } from 'vue'

export type TypographyType = 'default' | 'secondary' | 'primary' | 'success' | 'warning' | 'error'

export type TypographyAlign = 'start' | 'center' | 'end'

export type TypographyTag =
  'span' | 'div' | 'p' | 'strong' | 'em' | 'u' | 's' | 'code' | 'pre' | 'blockquote' | 'label'

export interface TypographyProps {
  /** 渲染的标签，默认 span */
  tag?: TypographyTag
  /** 语义颜色，默认 default */
  type?: TypographyType
  /** 加粗 */
  strong?: boolean
  /** 斜体 */
  italic?: boolean
  /** 下划线 */
  underline?: boolean
  /** 删除线 */
  deleted?: boolean
  /** 行内代码样式（等宽字体与浅色底） */
  code?: boolean
  /** 单行溢出省略 */
  truncate?: boolean
}

export interface TypographySlots {
  default?: () => VNode[] | string
}

export interface TitleProps {
  /** 标题层级 1–6，对应 h1–h6 */
  level?: 1 | 2 | 3 | 4 | 5 | 6
  /** 语义颜色，默认 default */
  type?: TypographyType
  /** 对齐方式，默认 start */
  align?: TypographyAlign
}

export interface TitleSlots {
  default?: () => VNode[] | string
}

export interface TextProps extends TypographyProps {
  /** 渲染的标签，默认 span */
  tag?: 'span' | 'div' | 'p' | 'label'
}

export interface LinkProps {
  href?: string
  target?: '_self' | '_blank'
  /** 语义颜色，默认 primary */
  type?: TypographyType
  /** 显示下划线，默认 true */
  underline?: boolean
  /** 禁用态：移除 href 并禁用键盘焦点 */
  disabled?: boolean
}

export interface LinkSlots {
  default?: () => VNode[] | string
}
