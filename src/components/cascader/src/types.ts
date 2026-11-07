export type CascaderKey = string | number

export interface CascaderOption {
  value: CascaderKey
  label: string
  children?: CascaderOption[]
  disabled?: boolean
  isLeaf?: boolean
}

export interface CascaderProps {
  /** 选项数据 */
  options?: CascaderOption[]
  /** 选中路径，从根到叶子 */
  modelValue?: CascaderKey[] | null
  placeholder?: string
  disabled?: boolean
  /** 显示清空按钮 */
  clearable?: boolean
  /** 点击任意层级即可选中 */
  changeOnSelect?: boolean
  /** 路径分隔符，默认 ' / ' */
  separator?: string
  /** 尺寸，未传时继承 FormItem / ConfigProvider */
  size?: 'small' | 'medium' | 'large'
  /** 校验状态 */
  status?: 'error' | 'warning' | 'success'
  id?: string
  /** 无可见标签时的可访问名称 */
  ariaLabel?: string
}

export interface CascaderEmits {
  (e: 'update:modelValue', value: CascaderKey[] | null): void
  (e: 'change', value: CascaderKey[] | null, selectedOptions: CascaderOption[]): void
  (e: 'clear'): void
}
