import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { VkTabs } from '@/components/tabs'
import { VkMenu } from '@/components/menu'
import { VkPagination } from '@/components/pagination'
import { VkSelect } from '@/components/select'
import { VkTable } from '@/components/table'
import { VkRow, VkCol, VkSpace } from '@/components/grid'

describe('VkTabs', () => {
  const items = [
    { key: 'a', label: '概览' },
    { key: 'b', label: '设置' },
    { key: 'c', label: '禁用', disabled: true },
  ]

  it('renders tablist and panels with aria wiring', () => {
    const wrapper = mount(VkTabs, {
      props: { items, modelValue: 'a' },
      slots: { 'panel-a': '<p class="panel-a">A</p>' },
    })
    expect(wrapper.get('[role="tablist"]')).toBeTruthy()
    expect(wrapper.get('[role="tab"][aria-selected="true"]').text()).toBe('概览')
    expect(wrapper.get('[role="tabpanel"]').attributes('aria-labelledby')).toBe(
      wrapper.get('[role="tab"]').attributes('id'),
    )
    expect(wrapper.get('.panel-a').text()).toBe('A')
  })

  it('emits update:modelValue when another tab is clicked', async () => {
    const wrapper = mount(VkTabs, { props: { items, modelValue: 'a' } })
    await wrapper.findAll('[role="tab"]')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['b'])
    expect(wrapper.emitted('change')?.[0]).toEqual(['b'])
  })

  it('moves the selection with arrow keys and skips disabled tabs', async () => {
    const wrapper = mount(VkTabs, { props: { items, modelValue: 'a' } })
    await wrapper.findAll('[role="tab"]')[0].trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['b'])
    await wrapper.setProps({ modelValue: 'b' })
    await wrapper.findAll('[role="tab"]')[1].trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual(['a'])
  })
})

describe('VkMenu', () => {
  const items = [
    { key: 'home', label: '首页' },
    {
      key: 'settings',
      label: '设置',
      children: [
        { key: 'profile', label: '个人资料' },
        { key: 'security', label: '安全' },
      ],
    },
  ]

  it('expands submenu and selects a child', async () => {
    const wrapper = mount(VkMenu, { props: { items } })
    const settings = wrapper.findAll('[role="menuitem"]')[1]
    expect(settings.attributes('aria-expanded')).toBe('false')
    await settings.trigger('click')
    expect(settings.attributes('aria-expanded')).toBe('true')
    const child = wrapper.findAll('[role="menuitem"]')[2]
    await child.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['profile'])
  })
})

describe('VkPagination', () => {
  it('renders a windowed page list with aria-current', () => {
    const wrapper = mount(VkPagination, { props: { total: 300, pageSize: 10, current: 5 } })
    expect(wrapper.get('[aria-current="page"]').text()).toBe('5')
    expect(wrapper.text()).toContain('共 300 条')
  })

  it('emits update:current and change when a page is clicked', async () => {
    const wrapper = mount(VkPagination, { props: { total: 100, pageSize: 10, current: 1 } })
    const page2 = wrapper.findAll('button').find((button) => button.text() === '2')
    await page2?.trigger('click')
    expect(wrapper.emitted('update:current')?.[0]).toEqual([2])
    expect(wrapper.emitted('change')?.[0]).toEqual([2, 10])
  })

  it('resets to the first page when page size changes', async () => {
    const wrapper = mount(VkPagination, {
      props: { total: 100, pageSize: 10, current: 3, showSizeChanger: true },
    })
    await wrapper.get('select').setValue('20')
    expect(wrapper.emitted('update:pageSize')?.[0]).toEqual([20])
    expect(wrapper.emitted('update:current')?.[0]).toEqual([1])
  })
})

describe('VkSelect', () => {
  const options = [
    { label: '北京', value: 'bj' },
    { label: '上海', value: 'sh' },
    { label: '广州', value: 'gz', disabled: true },
  ]

  it('shows placeholder and selected label', () => {
    const empty = mount(VkSelect, { props: { options } })
    expect(empty.text()).toContain('请选择')
    const selected = mount(VkSelect, { props: { options, modelValue: 'sh' } })
    expect(selected.text()).toContain('上海')
  })

  it('opens the listbox and selects an option', async () => {
    const wrapper = mount(VkSelect, { props: { options }, attachTo: document.body })
    const combo = wrapper.get('[role="combobox"]')
    await combo.trigger('click')
    expect(combo.attributes('aria-expanded')).toBe('true')
    const list = document.querySelector('[role="listbox"]')
    expect(list?.querySelectorAll('[role="option"]')).toHaveLength(3)
    ;(list?.querySelectorAll<HTMLElement>('[role="option"]')[1] as HTMLElement).click()
    await nextTick()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['sh'])
    wrapper.unmount()
  })

  it('supports keyboard selection', async () => {
    const wrapper = mount(VkSelect, { props: { options } })
    const combo = wrapper.get('[role="combobox"]')
    await combo.trigger('keydown', { key: 'ArrowDown' })
    await combo.trigger('keydown', { key: 'ArrowDown' })
    await combo.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['sh'])
  })

  it('skips disabled options when moving', async () => {
    const wrapper = mount(VkSelect, { props: { options } })
    const combo = wrapper.get('[role="combobox"]')
    await combo.trigger('keydown', { key: 'ArrowDown' })
    await combo.trigger('keydown', { key: 'ArrowDown' })
    await combo.trigger('keydown', { key: 'ArrowDown' })
    await combo.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['bj'])
  })
})

describe('VkTable', () => {
  const columns = [
    { key: 'name', title: '姓名', sortable: true },
    { key: 'age', title: '年龄', align: 'right' as const },
  ]
  const data = [
    { name: '张三', age: 28 },
    { name: '李四', age: 34 },
  ]

  it('renders headers and rows', () => {
    const wrapper = mount(VkTable, { props: { columns, data } })
    expect(wrapper.findAll('th')).toHaveLength(2)
    expect(wrapper.findAll('tbody tr')).toHaveLength(2)
    expect(wrapper.text()).toContain('张三')
    expect(wrapper.get('th').attributes('aria-sort')).toBe('none')
  })

  it('emits sort changes in a three-state cycle', async () => {
    const wrapper = mount(VkTable, { props: { columns, data } })
    const sortButton = wrapper.get('.vk-table__sort')
    await sortButton.trigger('click')
    expect(wrapper.emitted('sort-change')?.[0]).toEqual(['name', 'asc'])
    await wrapper.setProps({ sortKey: 'name', sortOrder: 'desc' })
    await sortButton.trigger('click')
    expect(wrapper.emitted('sort-change')?.[1]).toEqual([null, null])
  })

  it('sorts rows internally for the controlled sort', () => {
    const wrapper = mount(VkTable, {
      props: { columns, data, sortKey: 'age', sortOrder: 'desc' },
    })
    const firstRow = wrapper.findAll('tbody tr')[0]
    expect(firstRow.text()).toContain('李四')
  })

  it('shows the empty state', () => {
    const wrapper = mount(VkTable, { props: { columns, data: [] } })
    expect(wrapper.get('.vk-table__empty').text()).toBe('暂无数据')
  })
})

describe('Grid', () => {
  it('computes column width and offset from a 24-column grid', () => {
    const wrapper = mount({
      components: { VkRow, VkCol },
      template: '<VkRow :gutter="[16, 8]"><VkCol :span="12" :offset="6" /></VkRow>',
    })
    const col = wrapper.get('.vk-col').element as HTMLElement
    expect(col.style.flex).toBe('0 0 50%')
    expect(col.style.marginLeft).toBe('25%')
    expect(col.style.paddingLeft).toBe('8px')
    const row = wrapper.get('.vk-row').element as HTMLElement
    expect(row.style.marginLeft).toBe('-8px')
    expect(row.style.rowGap).toBe('8px')
  })

  it('maps Space size presets to gaps', () => {
    const wrapper = mount(VkSpace, { props: { size: 'large' } })
    const element = wrapper.get('.vk-space').element as HTMLElement
    expect(element.style.columnGap).toBe('16px')
  })
})

describe('navigation a11y', () => {
  it('keeps roving tabindex in tabs', async () => {
    const wrapper = mount(VkTabs, {
      props: {
        items: [
          { key: 'a', label: 'A' },
          { key: 'b', label: 'B' },
        ],
        modelValue: 'a',
      },
    })
    const tabs = wrapper.findAll('[role="tab"]')
    expect(tabs[0].attributes('tabindex')).toBe('0')
    expect(tabs[1].attributes('tabindex')).toBe('-1')
  })

  it('marks pagination disabled state', async () => {
    const wrapper = mount(VkPagination, { props: { total: 20, pageSize: 10, current: 1 } })
    expect(wrapper.get('[aria-label="上一页"]').attributes('disabled')).toBeDefined()
    expect(wrapper.get('[aria-label="下一页"]').attributes('disabled')).toBeUndefined()
  })
})

describe('select focus', () => {
  it('keeps focus on the combobox after selection', async () => {
    const wrapper = mount(VkSelect, {
      props: {
        options: [{ label: 'A', value: 'a' }],
      },
      attachTo: document.body,
    })
    const combo = wrapper.get('[role="combobox"]')
    await combo.trigger('click')
    ;(document.querySelector<HTMLElement>('[role="option"]') as HTMLElement).click()
    await nextTick()
    expect(document.activeElement).toBe(combo.element)
    wrapper.unmount()
  })
})
