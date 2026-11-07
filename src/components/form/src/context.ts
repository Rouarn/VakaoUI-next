import { inject, type ComputedRef, type InjectionKey } from 'vue'
import type { ComponentSize } from '@/core/types'
import type { FormItemValidateState, FormRule, FormRules, FormValidateTrigger } from './types'

export interface FormItemInstance {
  field: string
  validate: (trigger?: FormValidateTrigger) => Promise<boolean>
  clearValidate: () => void
  resetField: () => void
}

export interface FormContext {
  model: ComputedRef<Record<string, unknown>>
  rules: ComputedRef<FormRules | undefined>
  disabled: ComputedRef<boolean>
  size: ComputedRef<ComponentSize>
  registerItem: (item: FormItemInstance) => void
  unregisterItem: (field: string) => void
}

export interface FormItemContext {
  /** 控件应使用的 id，与 label 的 for 对应 */
  inputId: string
  /** 反馈文本容器的 id，供控件写入 aria-describedby */
  feedbackId: string
  validateState: ComputedRef<FormItemValidateState>
  disabled: ComputedRef<boolean>
  size: ComputedRef<ComponentSize>
  ariaDescribedby: ComputedRef<string | undefined>
  ariaInvalid: ComputedRef<boolean>
  /** 触发本项校验；控件在 change / blur 时调用 */
  validate: (trigger?: FormValidateTrigger) => Promise<boolean>
}

export const formContextInjectionKey: InjectionKey<FormContext> = Symbol('vakao-form')

export const formItemContextInjectionKey: InjectionKey<FormItemContext> = Symbol('vakao-form-item')

/** 供输入类组件消费，独立使用 FormItem 之外时返回 null */
export function useFormItem(): FormItemContext | null {
  return inject(formItemContextInjectionKey, null)
}

export type { FormRule }
