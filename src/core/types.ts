import type { Ref } from 'vue'

export type ComponentSize = 'small' | 'medium' | 'large'

/** 状态语义，对应四色星映射出的 success / warning / error / info 令牌 */
export type StatusType = 'success' | 'warning' | 'error' | 'info'

export type MaybeRef<T> = T | Ref<T>

export type Nullable<T> = T | null | undefined
