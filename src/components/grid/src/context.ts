import type { ComputedRef, InjectionKey } from 'vue'

export interface RowContext {
  /** [水平间距, 垂直间距]，单位 px */
  gutter: ComputedRef<[number, number]>
}

export const rowContextKey: InjectionKey<RowContext> = Symbol('vk-row')
