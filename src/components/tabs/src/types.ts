export type TabKey = string | number

export interface TabItem {
  key: TabKey
  label: string
  disabled?: boolean
}

export interface TabsProps {
  /** 当前激活的标签 key */
  modelValue?: TabKey
  /** 标签数据 */
  items: TabItem[]
  /** 视觉样式 */
  type?: 'line' | 'card'
  /** 是否撑满父容器 */
  block?: boolean
  /** 标签栏的可访问名称 */
  ariaLabel?: string
}

export interface TabsEmits {
  (e: 'update:modelValue', value: TabKey): void
  (e: 'change', value: TabKey): void
}
