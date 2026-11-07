import type { VNode } from 'vue'

export type StepStatus = 'process' | 'finish' | 'error' | 'wait'

export type StepsDirection = 'horizontal' | 'vertical'

export interface StepItem {
  key?: string | number
  title: string
  description?: string
}

export interface StepsProps {
  items: StepItem[]
  /** 当前步骤索引，从 0 开始 */
  current?: number
  /** 当前步骤状态，默认 process */
  status?: StepStatus
  /** 排列方向，默认 horizontal */
  direction?: StepsDirection
}

export interface StepsSlots {
  [name: string]: (() => VNode[] | string) | undefined
}
