export type TransferKey = string | number

export interface TransferOption {
  /** 选项值 */
  value: TransferKey
  /** 选项文本 */
  label: string
  /** 是否禁用该选项 */
  disabled?: boolean
}

export type TransferDirection = 'left' | 'right'

export interface TransferProps {
  /** 全部候选项 */
  options?: TransferOption[]
  /** 右侧已选值（受控） */
  modelValue?: TransferKey[]
  /** 两侧标题，默认读取语言包 */
  titles?: [string, string]
  /** 是否显示搜索框，默认 true */
  searchable?: boolean
  /** 列表可视高度（px），默认 240 */
  listHeight?: number
  /** 禁用全部交互 */
  disabled?: boolean
  /** 是否显示全选 checkbox，默认 true */
  showSelectAll?: boolean
  /** 无可见标签时的可访问名称 */
  ariaLabel?: string
}

export interface TransferEmits {
  (e: 'update:modelValue', value: TransferKey[]): void
  (e: 'change', value: TransferKey[], direction: TransferDirection, movedKeys: TransferKey[]): void
}
