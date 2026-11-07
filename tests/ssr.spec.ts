import { createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { describe, expect, it } from 'vitest'
import { VkButton } from '@/components/button'
import { VkConfigProvider } from '@/components/config-provider'
import { VkForm, VkFormItem } from '@/components/form'
import { components } from '@/components'

describe('SSR', () => {
  it('renders provider and button without DOM access', async () => {
    const app = createSSRApp({
      render: () =>
        h(VkConfigProvider, { theme: 'light' }, () =>
          h(VkButton, { type: 'primary' }, () => 'SSR'),
        ),
    })

    const html = await renderToString(app)

    expect(html).toContain('vk-config-provider')
    expect(html).toContain('vk-button--primary')
    expect(html).toContain('SSR')
  })

  it('renders form and form item without DOM access', async () => {
    const app = createSSRApp({
      render: () =>
        h(VkConfigProvider, { theme: 'light' }, () =>
          h(
            VkForm,
            { model: { name: '' }, rules: { name: { required: true, message: '必填' } } },
            () =>
              h(VkFormItem, { field: 'name', label: '名称' }, () => h('input', { id: 'ssr-name' })),
          ),
        ),
    })

    const html = await renderToString(app)

    expect(html).toContain('vk-form')
    expect(html).toContain('vk-form-item')
    expect(html).toContain('名称')
  })

  it('renders every exported component without a browser', async () => {
    const props: Record<string, Record<string, unknown>> = {
      VkCheckbox: { modelValue: false, label: '同意' },
      VkDropdown: { items: [{ key: 'a', label: 'A' }] },
      VkForm: { model: {} },
      VkFormItem: { field: 'name', label: '名称' },
      VkInput: { modelValue: '' },
      VkInputNumber: { modelValue: 0 },
      VkMenu: { items: [{ key: 'a', label: 'A' }] },
      VkPagination: { total: 0 },
      VkProgress: { value: 0 },
      VkRadio: { modelValue: '' },
      VkRadioGroup: { modelValue: '' },
      VkSelect: { options: [], modelValue: null },
      VkSlider: { modelValue: 0 },
      VkSwitch: { modelValue: false },
      VkTable: { columns: [], data: [] },
      VkTabs: { items: [], modelValue: 'a' },
      VkPopconfirm: { title: '确认' },
      VkPopover: { content: '内容' },
      VkModal: { open: false },
    }

    const app = createSSRApp({
      render: () =>
        h(VkConfigProvider, { theme: 'light' }, () =>
          h(
            'main',
            Object.entries(components).map(([name, component]) =>
              h(component as never, props[name] ?? {}, () => name),
            ),
          ),
        ),
    })

    const html = await renderToString(app)

    expect(html).toContain('vk-button')
    expect(html).toContain('vk-table')
    expect(html).toContain('vk-select')
  })
})
