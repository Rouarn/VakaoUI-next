import axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import { VkAlert } from '@/components/alert'
import { VkButton } from '@/components/button'
import { VkCheckbox } from '@/components/checkbox'
import { VkInput } from '@/components/input'
import { VkPagination } from '@/components/pagination'
import { VkSelect } from '@/components/select'
import { VkTable } from '@/components/table'
import { VkTabs } from '@/components/tabs'

async function expectNoViolations(element: Element): Promise<void> {
  const result = await axe.run(element, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] },
    rules: {
      // jsdom 没有布局与画布，无法计算对比度；对比度由令牌脚本单独校验。
      'color-contrast': { enabled: false },
      region: { enabled: false },
    },
  })
  const serious = result.violations.filter(
    (violation) => violation.impact === 'serious' || violation.impact === 'critical',
  )
  expect(
    serious.map((violation) => `${violation.id}: ${violation.help}`),
    JSON.stringify(result.violations, null, 2),
  ).toEqual([])
}

describe('a11y (axe)', () => {
  it('button, alert and input have no serious violations', async () => {
    const wrapper = mount(
      {
        render: () =>
          h('main', [
            h(VkButton, { type: 'primary' }, () => '保存'),
            h(VkAlert, { type: 'error', title: '保存失败', description: '请重试' }),
            h('label', { for: 'email' }, '邮箱'),
            h(VkInput, { id: 'email', modelValue: '' }),
          ]),
      },
      { attachTo: document.body },
    )
    await nextTick()
    await expectNoViolations(wrapper.element)
    wrapper.unmount()
  })

  it('form controls keep programmatic labels', async () => {
    const wrapper = mount(
      {
        render: () =>
          h('main', [
            h(VkCheckbox, { modelValue: true, label: '保持登录' }),
            h(VkSelect, {
              options: [{ label: '杭州', value: 'hz' }],
              ariaLabel: '城市',
              modelValue: 'hz',
            }),
          ]),
      },
      { attachTo: document.body },
    )
    await nextTick()
    await expectNoViolations(wrapper.element)
    wrapper.unmount()
  })

  it('tabs, table and pagination expose correct semantics', async () => {
    const wrapper = mount(
      {
        render: () =>
          h('main', [
            h(VkTabs, {
              items: [
                { key: 'a', label: '概览' },
                { key: 'b', label: '设置' },
              ],
              modelValue: 'a',
              ariaLabel: '视图',
            }),
            h(VkTable, {
              columns: [{ key: 'name', title: '名称' }],
              data: [{ name: '项目 A' }],
              ariaLabel: '项目列表',
            }),
            h(VkPagination, { total: 50, pageSize: 10, current: 1, ariaLabel: '分页' }),
          ]),
      },
      { attachTo: document.body },
    )
    await nextTick()
    await expectNoViolations(wrapper.element)
    wrapper.unmount()
  })
})
