import type { VNodeChild } from 'vue'

export type CountdownPrecision = 0 | 1 | 2 | 3

export interface CountdownChunks {
  /** 剩余天数 */
  days: number
  /** 剩余小时数（按天取余） */
  hours: number
  /** 剩余分钟数（按小时取余） */
  minutes: number
  /** 剩余秒数（按分钟取余） */
  seconds: number
  /** 剩余毫秒数（按秒取余） */
  milliseconds: number
  /** 剩余总毫秒数 */
  total: number
}

export interface CountdownProps {
  /** 倒计时总时长，单位毫秒 */
  duration?: number
  /** 是否运行中，设为 false 会暂停并保留剩余时间 */
  active?: boolean
  /** 秒的小数位数，0–3 */
  precision?: CountdownPrecision
  /** 自定义格式，支持 DD / HH / mm / ss / SSS 占位符 */
  format?: string
  /** 自定义渲染函数，返回值会替换默认文本 */
  renderer?: (chunks: CountdownChunks) => VNodeChild
  /** 计时器的可访问名称 */
  ariaLabel?: string
}

export interface CountdownEmits {
  /** 倒计时结束 */
  (e: 'finish'): void
  /** 调用 restart 重置并重新开始 */
  (e: 'restart'): void
}

export interface CountdownSlots {
  /** 作用域插槽，参数为剩余时间片段；存在时覆盖 renderer */
  default?: (chunks: CountdownChunks) => VNodeChild
}

export interface CountdownExpose {
  /** 回到初始时长并重新计时 */
  restart: () => void
}
