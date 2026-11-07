import { h } from 'vue'
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { VkInput } from '@/components/input'
import { VkInputNumber } from '@/components/input-number'
import { VkSwitch } from '@/components/switch'
import { VkCheckbox } from '@/components/checkbox'
import { VkRadio, VkRadioGroup } from '@/components/radio'
import { VkSlider } from '@/components/slider'

describe('VkInput', () => {
  it('emits update:modelValue on input and renders value', async () => {
    const wrapper = mount(VkInput, { props: { modelValue: 'hello' } })
    const input = wrapper.get('input')
    expect((input.element as HTMLInputElement).value).toBe('hello')

    await input.setValue('world')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['world'])
  })

  it('exposes an accessible name, clear button and error state', async () => {
    const wrapper = mount(VkInput, {
      props: { modelValue: 'x', clearable: true, status: 'error', ariaLabel: '搜索' },
    })
    expect(wrapper.get('input').attributes('aria-label')).toBe('搜索')
    expect(wrapper.get('input').attributes('aria-invalid')).toBe('true')

    await wrapper.get('button[aria-label="清空输入"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
    expect(wrapper.emitted('clear')).toHaveLength(1)
  })

  it('supports textarea and disabled state', () => {
    const wrapper = mount(VkInput, { props: { textarea: true, disabled: true } })
    const textarea = wrapper.get('textarea')
    expect(textarea.attributes('disabled')).toBeDefined()
  })
})

describe('VkInputNumber', () => {
  it('increments and clamps to max', async () => {
    const wrapper = mount(VkInputNumber, { props: { modelValue: 9, max: 10, step: 1 } })
    await wrapper.get('button[aria-label="增加数值"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([10])

    await wrapper.setProps({ modelValue: 10 })
    expect(wrapper.get('button[aria-label="增加数值"]').attributes('disabled')).toBeDefined()
  })

  it('rounds according to precision on blur', async () => {
    const wrapper = mount(VkInputNumber, { props: { modelValue: 1, precision: 2 } })
    const input = wrapper.get('input')
    await input.setValue('2.345')
    await input.trigger('blur')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([2.35])
  })

  it('supports keyboard stepping with aria-valuenow', async () => {
    const wrapper = mount(VkInputNumber, { props: { modelValue: 1, ariaLabel: '数量' } })
    const input = wrapper.get('input')
    expect(input.attributes('role')).toBe('spinbutton')
    expect(input.attributes('aria-valuenow')).toBe('1')

    await input.trigger('keydown', { key: 'ArrowUp' })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([2])
  })
})

describe('VkSwitch', () => {
  it('toggles with role=switch and aria-checked', async () => {
    const wrapper = mount(VkSwitch, { props: { modelValue: false, ariaLabel: '通知' } })
    const button = wrapper.get('button')
    expect(button.attributes('role')).toBe('switch')
    expect(button.attributes('aria-checked')).toBe('false')

    await button.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    expect(wrapper.emitted('change')?.[0]).toEqual([true])
  })

  it('does not toggle when disabled', async () => {
    const wrapper = mount(VkSwitch, { props: { disabled: true } })
    await wrapper.get('button').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})

describe('VkCheckbox', () => {
  it('emits change and marks indeterminate', async () => {
    const wrapper = mount(VkCheckbox, {
      props: { modelValue: false, indeterminate: true, label: '全选' },
    })
    const input = wrapper.get('input')
    expect(input.attributes('aria-checked')).toBe('mixed')

    await input.setValue(true)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })
})

describe('VkRadio', () => {
  it('selects a value inside a group', async () => {
    const wrapper = mount(VkRadioGroup, {
      props: { modelValue: 'a', ariaLabel: '选项' },
      slots: {
        default: () => [
          h(VkRadio, { value: 'a', label: 'A' }),
          h(VkRadio, { value: 'b', label: 'B' }),
        ],
      },
    })
    expect(wrapper.get('[role="radiogroup"]').attributes('aria-label')).toBe('选项')

    const inputs = wrapper.findAll('input[type="radio"]')
    expect((inputs[0].element as HTMLInputElement).checked).toBe(true)

    await inputs[1].setValue(true)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['b'])
  })
})

describe('VkSlider', () => {
  it('exposes a native range with aria-valuetext', async () => {
    const wrapper = mount(VkSlider, {
      props: { modelValue: 30, formatTooltip: (value: number) => `${value}%` },
    })
    const input = wrapper.get('input[type="range"]')
    expect(input.attributes('aria-valuetext')).toBe('30%')

    await input.setValue('55')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([55])
  })
})
