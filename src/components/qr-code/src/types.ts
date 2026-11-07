import type { QrCodeLevel } from './qrcode'

export type { QrCodeLevel } from './qrcode'

export interface QrCodeProps {
  /** 需要编码的内容，支持 UTF-8 文本与链接 */
  value?: string
  /** 绘制尺寸（正方形边长），单位 px */
  size?: number
  /** 纠错等级，等级越高可容纳的内容越少 */
  level?: QrCodeLevel
  /** 深色模块颜色，默认跟随正文颜色令牌 */
  color?: string
  /** 背景色，默认跟随卡片颜色令牌 */
  backgroundColor?: string
  /** 四周留白模块数，默认 2 */
  margin?: number
  /** 容器圆角，单位 px */
  radius?: number
  /** 可访问名称，默认取 value */
  ariaLabel?: string
}
