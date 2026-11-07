import { computed, unref, type ComputedRef } from 'vue'
import { useFormItem } from '@/components/form/src/context'
import { useComponentSize } from './config'
import type { ComponentSize, MaybeRef } from './types'

export interface FormControlOptions {
  size?: MaybeRef<ComponentSize | undefined>
  disabled?: MaybeRef<boolean | undefined>
  id?: MaybeRef<string | undefined>
}

export interface FormControlState {
  /** 控件 id，与 FormItem 的 label for 对应 */
  inputId: ComputedRef<string | undefined>
  disabled: ComputedRef<boolean>
  size: ComputedRef<ComponentSize>
  ariaDescribedby: ComputedRef<string | undefined>
  ariaInvalid: ComputedRef<true | undefined>
  /** 通知 FormItem 执行校验，非表单场景下为空操作 */
  validate: (trigger?: 'blur' | 'change') => void
}

/**
 * 把表单上下文（id / 禁用 / 尺寸 / aria / 校验）收敛成输入类组件可直接消费的状态。
 * 脱离 FormItem 使用时不产生任何副作用。
 */
export function useFormControl(options: FormControlOptions = {}): FormControlState {
  const formItem = useFormItem()
  const size = useComponentSize(computed(() => unref(options.size)))

  return {
    inputId: computed(() => unref(options.id) ?? formItem?.inputId),
    disabled: computed(() => Boolean(unref(options.disabled) ?? formItem?.disabled.value ?? false)),
    size,
    ariaDescribedby: computed(() => formItem?.ariaDescribedby.value),
    ariaInvalid: computed(() => (formItem?.ariaInvalid.value ? true : undefined)),
    validate: (trigger) => {
      void formItem?.validate(trigger)
    },
  }
}
