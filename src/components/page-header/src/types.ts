import type { VNode } from 'vue'

export interface PageHeaderProps {
  /** 页面标题，必填 */
  title: string
  /** 副标题，用于补充当前页面的说明 */
  subtitle?: string
  /** 显示返回按钮，默认 true */
  back?: boolean
  /** 返回按钮的可访问名称，默认「返回」 */
  backLabel?: string
}

export interface PageHeaderEmits {
  /** 点击返回按钮时触发 */
  (e: 'back'): void
}

export interface PageHeaderSlots {
  /** 面包屑区域 */
  breadcrumb?: () => VNode[] | string
  /** 标题内容，替代 title 属性 */
  title?: () => VNode[] | string
  /** 副标题内容，替代 subtitle 属性 */
  subtitle?: () => VNode[] | string
  /** 标题右侧的操作区 */
  extra?: () => VNode[] | string
  /** 底部操作区 */
  footer?: () => VNode[] | string
}
