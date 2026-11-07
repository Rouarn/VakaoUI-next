import type { VNode } from 'vue'

export interface BreadcrumbItemData {
  key?: string | number
  label: string
  href?: string
}

export interface BreadcrumbProps {
  /** 数据驱动模式；也可用默认插槽组合 BreadcrumbItem */
  items?: BreadcrumbItemData[]
  /** 分隔符，默认 / */
  separator?: string
}

export interface BreadcrumbSlots {
  default?: () => VNode[] | string
}

export interface BreadcrumbItemProps {
  href?: string
  /** 标记为当前页，输出 aria-current="page" */
  current?: boolean
}

export interface BreadcrumbItemSlots {
  default?: () => VNode[] | string
}
