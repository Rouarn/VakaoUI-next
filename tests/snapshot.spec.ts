import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { VkAlert } from '@/components/alert'
import { VkButton } from '@/components/button'
import { VkCheckbox } from '@/components/checkbox'
import { VkInput } from '@/components/input'
import { VkPagination } from '@/components/pagination'
import { VkProgress } from '@/components/progress'
import { VkTable } from '@/components/table'
import { VkTabs } from '@/components/tabs'

describe('snapshot regression', () => {
  it('kitchen sink markup is stable', () => {
    const wrapper = mount({
      render: () =>
        h('section', { class: 'sink' }, [
          h(VkButton, { type: 'primary' }, () => '主要按钮'),
          h(VkButton, { loading: true }, () => '加载中'),
          h(VkInput, { modelValue: 'hello', placeholder: '请输入' }),
          h(VkCheckbox, { modelValue: true, label: '同意条款' }),
          h(VkProgress, { value: 42, showLabel: true }),
          h(VkAlert, { type: 'warning', title: '注意', description: '内容' }),
          h(VkTabs, {
            items: [
              { key: 'a', label: '概览' },
              { key: 'b', label: '设置' },
            ],
            modelValue: 'a',
          }),
          h(VkTable, {
            columns: [{ key: 'name', title: '名称' }],
            data: [{ name: '项目 A' }],
            striped: true,
          }),
          h(VkPagination, { total: 42, pageSize: 10, current: 2 }),
        ]),
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
