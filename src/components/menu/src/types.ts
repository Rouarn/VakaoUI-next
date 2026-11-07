export interface MenuItem {
  key: string
  label: string
  disabled?: boolean
  children?: MenuItem[]
}

export type MenuMode = 'vertical' | 'horizontal'

export interface MenuProps {
  items: MenuItem[]
  /** 当前选中项 */
  modelValue?: string
  mode?: MenuMode
  /** 菜单的可访问名称 */
  ariaLabel?: string
}

export interface MenuEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'select', item: MenuItem): void
}
