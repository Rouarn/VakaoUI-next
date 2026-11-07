import type { RuleItem } from 'async-validator'
import type { VNode } from 'vue'
import type { ComponentSize } from '@/core/types'

export type FormLayout = 'horizontal' | 'vertical'

export type FormLabelAlign = 'left' | 'right'

export type FormValidateTrigger = 'blur' | 'change'

export type FormItemValidateState = '' | 'validating' | 'success' | 'warning' | 'error'

export type FormRule = RuleItem & {
  /** 触发时机；未设置时任意时机都会校验 */
  trigger?: FormValidateTrigger | FormValidateTrigger[]
}

export type FormRules = Record<string, FormRule | FormRule[]>

export interface FormProps {
  /** 表单数据对象，字段路径支持 `user.name` 形式 */
  model: Record<string, unknown>
  /** 表单级校验规则，与 FormItem 的 rules 合并 */
  rules?: FormRules
  /** 布局方向，默认 horizontal */
  layout?: FormLayout
  /** 标签对齐方式，默认 right */
  labelAlign?: FormLabelAlign
  /** 标签宽度，数字按 px 处理；未传时使用令牌中的默认宽度 */
  labelWidth?: string | number
  /** 表单内控件的默认尺寸，未传时继承 ConfigProvider */
  size?: ComponentSize
  /** 禁用表单内所有控件 */
  disabled?: boolean
}

export interface FormSlots {
  default?: () => VNode[]
}

export interface FormEmits {
  /** 原生提交事件，已 preventDefault，交由使用方处理 */
  (e: 'submit', event: Event): void
}

export interface FormItemProps {
  /** 对应 model 的字段路径，同时作为表单项标识 */
  field?: string
  /** 标签文本，也可用 label 插槽 */
  label?: string
  /** 是否必填；未设置时由包含 required 的规则推导 */
  required?: boolean
  /** 表单项规则，与表单级规则合并 */
  rules?: FormRule | FormRule[]
  /** 受控校验状态，传入后覆盖内部状态 */
  validateStatus?: FormItemValidateState
  /** 受控反馈文本，传入后覆盖内部校验消息 */
  feedback?: string
  /** 是否渲染标签，默认 true */
  showLabel?: boolean
  /** 局部禁用，未设置时继承 Form */
  disabled?: boolean
  /** 局部标签宽度，数字按 px 处理 */
  labelWidth?: string | number
  /** 控件 id；未传时自动生成，并通过 context 提供给控件 */
  htmlFor?: string
}

export interface FormItemSlots {
  default?: () => VNode[]
  label?: () => VNode[]
  feedback?: () => VNode[]
}
