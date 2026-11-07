import { computed, inject, unref, type ComputedRef, type InjectionKey } from 'vue'
import { useFormControl } from '@/core'
import type { ComponentSize, MaybeRef } from '@/core/types'
import type { RadioValue } from './types'

export interface RadioGroupContext {
  modelValue: ComputedRef<RadioValue | null>
  name: string
  disabled: ComputedRef<boolean>
  size: ComputedRef<ComponentSize | undefined>
  select: (value: RadioValue) => void
}

export const radioGroupInjectionKey: InjectionKey<RadioGroupContext> = Symbol('vakao-radio-group')

export function useRadioGroup(): RadioGroupContext | null {
  return inject(radioGroupInjectionKey, null)
}

export function useRadioControl(props: {
  size?: MaybeRef<ComponentSize | undefined>
  disabled?: MaybeRef<boolean | undefined>
  id?: MaybeRef<string | undefined>
}) {
  const group = useRadioGroup()
  const control = useFormControl({
    size: computed(() => unref(props.size) ?? group?.size.value),
    disabled: computed(() => unref(props.disabled) ?? group?.disabled.value ?? false),
    id: computed(() => unref(props.id)),
  })
  return { group, control }
}
