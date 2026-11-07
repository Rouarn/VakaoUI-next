import type { ThemeMode } from '@/core/theme'
import type { LocaleName, VkLocale } from '@/core/locale'
import type { ThemeOverrides } from '@/tokens'
import type { ComponentSize } from '@/core/types'

export interface ConfigProviderProps {
  /** 主题模式，auto 跟随系统 */
  theme?: ThemeMode
  /** 主题变量覆盖，键名与 ThemeCommonVars 一致 */
  themeOverrides?: ThemeOverrides
  /** 子组件的默认尺寸 */
  size?: ComponentSize
  /** 弹层层级基线 */
  zIndex?: number
  /** 浮层挂载容器，默认挂到 body；用于把弹层限定在某个容器内 */
  getPopupContainer?: () => HTMLElement | null
  /** 内置语言或部分文案覆盖 */
  locale?: LocaleName | Partial<VkLocale>
  /** 渲染容器标签，默认 div */
  tag?: string
}
