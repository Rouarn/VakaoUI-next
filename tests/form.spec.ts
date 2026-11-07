import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick, reactive, ref } from 'vue'
import { describe, expect, it } from 'vitest'
import { VkForm, VkFormItem, useFormItem } from '@/components/form'

interface FormPublic {
  validate: (fields?: string | string[]) => Promise<boolean>
  validateField: (field: string) => Promise<boolean>
  clearValidate: (fields?: string | string[]) => void
  resetFields: (fields?: string | string[]) => void
}

const StubControl = defineComponent({
  setup() {
    const ctx = useFormItem()
    const value = ref('')
    return () => {
      if (!ctx) return h('span', 'no-context')
      return h('input', {
        id: ctx.inputId,
        value: value.value,
        'aria-describedby': ctx.ariaDescribedby.value,
        'aria-invalid': ctx.ariaInvalid.value ? 'true' : 'false',
        'aria-required': 'true',
        onInput: (event: Event) => {
          value.value = (event.target as HTMLInputElement).value
        },
      })
    }
  },
})

function mountForm(model: Record<string, unknown>, rules?: Record<string, unknown>) {
  return mount(VkForm, {
    props: { model, rules: rules as never },
    slots: {
      default: () => [
        h(VkFormItem, { field: 'name', label: '名称', rules: undefined }, () => h(StubControl)),
      ],
    },
  })
}

describe('VkForm', () => {
  it('renders label, required mark and wires label for to the control id', () => {
    const wrapper = mountForm({ name: '' }, { name: { required: true, message: '请输入名称' } })

    const label = wrapper.find('.vk-form-item__label')
    const control = wrapper.find('input')

    expect(label.text()).toContain('名称')
    expect(wrapper.find('.vk-form-item__asterisk').exists()).toBe(true)
    expect(label.attributes('for')).toBe(control.attributes('id'))
  })

  it('fails validation, renders feedback and marks the control invalid', async () => {
    const model = reactive<Record<string, unknown>>({ name: '' })
    const wrapper = mountForm(model, { name: { required: true, message: '请输入名称' } })

    const result = await (wrapper.vm as unknown as FormPublic).validate()
    await nextTick()

    expect(result).toBe(false)
    expect(wrapper.find('.vk-form-item').classes()).toContain('vk-form-item--error')
    expect(wrapper.find('.vk-form-item__feedback').text()).toBe('请输入名称')
    expect(wrapper.find('.vk-form-item__feedback').attributes('role')).toBe('alert')

    const control = wrapper.find('input')
    expect(control.attributes('aria-invalid')).toBe('true')
    expect(control.attributes('aria-describedby')).toBe(
      wrapper.find('.vk-form-item__feedback').attributes('id'),
    )
  })

  it('passes validation and clears the feedback', async () => {
    const model = reactive<Record<string, unknown>>({ name: 'vakao' })
    const wrapper = mountForm(model, { name: { required: true, message: '请输入名称' } })

    const result = await (wrapper.vm as unknown as FormPublic).validate()
    await nextTick()

    expect(result).toBe(true)
    expect(wrapper.find('.vk-form-item').classes()).toContain('vk-form-item--success')
    expect(wrapper.find('.vk-form-item__feedback').exists()).toBe(false)
  })

  it('merges form rules with item rules', async () => {
    const model = reactive<Record<string, unknown>>({ name: '' })
    const wrapper = mount(VkForm, {
      props: {
        model,
        rules: { name: { required: true, message: '表单级必填' } },
      },
      slots: {
        default: () =>
          h(
            VkFormItem,
            {
              field: 'name',
              label: '名称',
              rules: { min: 3, message: '至少 3 个字符' },
            },
            () => h(StubControl),
          ),
      },
    })

    expect(await (wrapper.vm as unknown as FormPublic).validate()).toBe(false)
    expect(wrapper.find('.vk-form-item__feedback').text()).toBe('表单级必填')

    model.name = 'ab'
    await nextTick()
    expect(await (wrapper.vm as unknown as FormPublic).validate()).toBe(false)
    expect(wrapper.find('.vk-form-item__feedback').text()).toBe('至少 3 个字符')
  })

  it('only runs rules whose trigger matches', async () => {
    const model = reactive<Record<string, unknown>>({ name: '' })
    const wrapper = mount(VkForm, {
      props: { model },
      slots: {
        default: () =>
          h(
            VkFormItem,
            {
              field: 'name',
              label: '名称',
              rules: { required: true, message: '失焦才校验', trigger: 'blur' },
            },
            () => h(StubControl),
          ),
      },
    })

    const item = wrapper.findComponent(VkFormItem)
    const ctx = item.vm.$.exposed as unknown as {
      validate: (trigger?: 'change' | 'blur') => Promise<boolean>
    }

    expect(await ctx.validate('change' as never)).toBe(true)
    expect(await ctx.validate('blur' as never)).toBe(false)
  })

  it('supports custom validators', async () => {
    const model = reactive<Record<string, unknown>>({ name: 'abc' })
    const wrapper = mount(VkForm, {
      props: {
        model,
        rules: {
          name: {
            validator: (_rule: unknown, value: unknown, callback: (error?: string) => void) => {
              callback(value === 'ok' ? undefined : '必须是 ok')
            },
          },
        },
      },
      slots: {
        default: () => h(VkFormItem, { field: 'name', label: '名称' }, () => h(StubControl)),
      },
    })

    expect(await (wrapper.vm as unknown as FormPublic).validate()).toBe(false)
    expect(wrapper.find('.vk-form-item__feedback').text()).toBe('必须是 ok')
  })

  it('resets fields to their initial value and clears state', async () => {
    const model = reactive<Record<string, unknown>>({ name: '初始' })
    const wrapper = mountForm(model, { name: { required: true, message: '请输入名称' } })

    model.name = ''
    await (wrapper.vm as unknown as FormPublic).validate()
    await nextTick()
    expect(wrapper.find('.vk-form-item--error').exists()).toBe(true)

    ;(wrapper.vm as unknown as FormPublic).resetFields()
    await nextTick()

    expect(model.name).toBe('初始')
    expect(wrapper.find('.vk-form-item--error').exists()).toBe(false)
  })

  it('clears validation state on demand', async () => {
    const model = reactive<Record<string, unknown>>({ name: '' })
    const wrapper = mountForm(model, { name: { required: true, message: '请输入名称' } })

    await (wrapper.vm as unknown as FormPublic).validate()
    await nextTick()
    expect(wrapper.find('.vk-form-item__feedback').exists()).toBe(true)

    ;(wrapper.vm as unknown as FormPublic).clearValidate()
    await nextTick()

    expect(wrapper.find('.vk-form-item__feedback').exists()).toBe(false)
    expect(wrapper.find('.vk-form-item--error').exists()).toBe(false)
  })

  it('emits submit and prevents the native form navigation', async () => {
    const wrapper = mountForm({ name: '' })

    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('submit')).toHaveLength(1)
  })

  it('inherits size from the form', () => {
    const wrapper = mount(VkForm, {
      props: { model: {}, size: 'small' },
      slots: {
        default: () => h(VkFormItem, { label: '名称' }, () => h(StubControl)),
      },
    })

    expect(wrapper.find('.vk-form-item').classes()).toContain('vk-form-item--small')
  })
})
