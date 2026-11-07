import type { ComputedRef, InjectionKey } from 'vue'

export type CollapseName = string | number

export interface CollapseContext {
  isExpanded: (name: CollapseName) => boolean
  toggle: (name: CollapseName) => void
  idOf: (name: CollapseName) => string
  expanded: ComputedRef<CollapseName[]>
}

export const collapseContextKey: InjectionKey<CollapseContext> = Symbol('vk-collapse')
