import type { VNode } from 'vue'
import type { CollapseName } from './context'

export interface CollapseProps {
  /** 展开项，支持 v-model；不传时组件内部维护状态 */
  modelValue?: CollapseName[]
  /** 手风琴模式，只允许同时展开一项 */
  accordion?: boolean
  /** 显示外边框，默认 true */
  bordered?: boolean
}

export interface CollapseEmits {
  (e: 'update:modelValue', value: CollapseName[]): void
  (e: 'change', value: CollapseName[]): void
}

export interface CollapseSlots {
  default?: () => VNode[] | string
}

export interface CollapseItemProps {
  /** 唯一标识 */
  name: CollapseName
  /** 标题；也可用 header 插槽 */
  title?: string
  disabled?: boolean
}

export interface CollapseItemSlots {
  default?: () => VNode[] | string
  header?: () => VNode[] | string
  extra?: () => VNode[] | string
}
