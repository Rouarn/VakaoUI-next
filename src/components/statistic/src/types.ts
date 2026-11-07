import type { VNode } from 'vue'

export interface StatisticProps {
  /** 指标名称 */
  label?: string
  /** 指标数值，数字按千分位格式化，字符串原样输出 */
  value?: number | string
  /** 小数位数，设置后对数字使用 toFixed 处理 */
  precision?: number
  /** 数值前缀，例如货币符号 */
  prefix?: string
  /** 数值后缀，例如百分号 */
  suffix?: string
  /** 千分位分隔符，默认英文逗号 */
  groupSeparator?: string
  /** 使用等宽数字，默认 true */
  tabularNumbers?: boolean
}

export interface StatisticSlots {
  /** 自定义指标名称 */
  label?: () => VNode[] | string
  /** 自定义数值前缀 */
  prefix?: () => VNode[] | string
  /** 自定义数值后缀 */
  suffix?: () => VNode[] | string
}
