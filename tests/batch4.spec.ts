import { afterEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import { VkFlex } from '@/components/flex'
import { VkList } from '@/components/list'
import { VkStatistic } from '@/components/statistic'
import { VkTimeline } from '@/components/timeline'
import { VkDrawer } from '@/components/drawer'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('VkFlex', () => {
  it('maps layout props to modifiers and inline gap', () => {
    const wrapper = mount(VkFlex, {
      props: { justify: 'space-between', align: 'center', gap: 16, wrap: true },
      slots: { default: () => '内容' },
    })

    const classes = wrapper.classes()
    expect(classes).toContain('vk-flex')
    expect(classes).toContain('vk-flex--justify-space-between')
    expect(classes).toContain('vk-flex--align-center')
    expect(classes).toContain('vk-flex--wrap')
    expect(wrapper.attributes('style')).toContain('gap: 16px')
  })

  it('supports vertical and inline modes', () => {
    const wrapper = mount(VkFlex, { props: { vertical: true, inline: true, gap: '1rem' } })
    expect(wrapper.classes()).toContain('vk-flex--vertical')
    expect(wrapper.classes()).toContain('vk-flex--inline')
    expect(wrapper.attributes('style')).toContain('gap: 1rem')
  })
})

describe('VkTimeline', () => {
  it('renders an ordered list with typed nodes', () => {
    const wrapper = mount(VkTimeline, {
      props: {
        items: [
          { title: '提交', time: '09:00', type: 'success' },
          { title: '审核中', content: '等待负责人确认' },
        ],
      },
    })

    expect(wrapper.element.tagName).toBe('OL')
    expect(wrapper.attributes('role')).toBe('list')
    expect(wrapper.findAll('li')).toHaveLength(2)
    expect(wrapper.findAll('.vk-timeline__dot')[0].attributes('aria-hidden')).toBe('true')
    expect(wrapper.findAll('.vk-timeline__item')[0].classes()).toContain(
      'vk-timeline__item--success',
    )
    expect(wrapper.text()).toContain('等待负责人确认')
  })

  it('switches to a horizontal layout', () => {
    const wrapper = mount(VkTimeline, { props: { horizontal: true, items: [{ title: 'A' }] } })
    expect(wrapper.classes()).toContain('vk-timeline--horizontal')
  })
})

describe('VkStatistic', () => {
  it('formats numbers with precision and separators', () => {
    const wrapper = mount(VkStatistic, {
      props: { label: '营收', value: 1234567.891, precision: 2, prefix: '¥' },
    })

    expect(wrapper.attributes('role')).toBe('group')
    expect(wrapper.attributes('aria-label')).toBe('营收')
    expect(wrapper.get('.vk-statistic__value').text()).toContain('1,234,567.89')
    expect(wrapper.get('.vk-statistic__prefix').text()).toBe('¥')
  })

  it('keeps negative values and passing through strings', () => {
    const negative = mount(VkStatistic, { props: { value: -1234.5 } })
    expect(negative.get('.vk-statistic__value').text()).toBe('-1,234.5')

    const text = mount(VkStatistic, { props: { value: '99+' } })
    expect(text.get('.vk-statistic__value').text()).toBe('99+')
  })

  it('can opt out of tabular numbers', () => {
    const wrapper = mount(VkStatistic, { props: { value: 1, tabularNumbers: false } })
    expect(wrapper.classes()).not.toContain('vk-statistic--tabular')
  })
})

describe('VkList', () => {
  it('renders items with title, description and extra', () => {
    const wrapper = mount(VkList, {
      props: {
        bordered: true,
        items: [
          { title: '林晚', description: '设计', extra: '在线' },
          { key: 'b', title: '周野', description: '前端', extra: '离线' },
        ],
      },
    })

    expect(wrapper.classes()).toContain('vk-list--bordered')
    expect(wrapper.findAll('li')).toHaveLength(2)
    expect(wrapper.get('.vk-list__title').text()).toBe('林晚')
    expect(wrapper.get('.vk-list__extra').text()).toBe('在线')
  })

  it('falls back to the empty state and shows a spinner while loading', async () => {
    const empty = mount(VkList, { props: { emptyText: '还没有成员' } })
    expect(empty.find('.vk-empty').exists()).toBe(true)
    expect(empty.text()).toContain('还没有成员')

    const loading = mount(VkList, { props: { loading: true, items: [{ title: 'A' }] } })
    expect(loading.find('.vk-list__loading').exists()).toBe(true)
    expect(loading.findAll('li')).toHaveLength(0)
    await nextTick()
  })

  it('exposes scoped slots for the whole item', () => {
    const wrapper = mount(VkList, {
      props: { items: [{ title: 'A' }, { title: 'B' }] },
      slots: {
        item: ({ item, index }: { item: { title?: string }; index: number }) =>
          h('span', { class: 'custom-item' }, `${index}:${item.title}`),
      },
    })

    expect(wrapper.findAll('.custom-item')).toHaveLength(2)
    expect(wrapper.findAll('.custom-item')[1].text()).toBe('1:B')
  })

  it('marks the selected item', () => {
    const wrapper = mount(VkList, {
      props: {
        items: [
          { key: 'a', title: 'A' },
          { key: 'b', title: 'B' },
        ],
        selectedKey: 'b',
      },
    })

    const items = wrapper.findAll('.vk-list__item')
    expect(items[0].classes()).not.toContain('vk-list__item--selected')
    expect(items[1].classes()).toContain('vk-list__item--selected')
  })
})

describe('VkDrawer', () => {
  const query = <T extends Element>(selector: string): T => document.querySelector<T>(selector) as T

  it('opens with dialog semantics and closes on Escape', async () => {
    const wrapper = mount(VkDrawer, {
      props: { open: true, title: '筛选条件', placement: 'right', width: 400 },
      slots: { default: () => '抽屉内容' },
      attachTo: document.body,
    })
    await nextTick()

    const panel = query<HTMLElement>('.vk-drawer__panel')
    const heading = query<HTMLHeadingElement>('.vk-drawer__title')
    expect(panel.getAttribute('role')).toBe('dialog')
    expect(panel.getAttribute('aria-modal')).toBe('true')
    expect(panel.classList.contains('vk-drawer__panel--right')).toBe(true)
    expect(panel.getAttribute('style')).toContain('width: 400px')
    expect(panel.getAttribute('aria-labelledby')).toBe(heading.id)
    expect(document.body.textContent).toContain('抽屉内容')

    panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await nextTick()
    expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
    expect(wrapper.emitted('close')).toHaveLength(1)

    wrapper.unmount()
  })

  it('closes from the mask unless maskClosable is off', async () => {
    const wrapper = mount(VkDrawer, {
      props: { open: true, maskClosable: false },
      attachTo: document.body,
    })
    await nextTick()

    query<HTMLElement>('.vk-drawer__mask').click()
    await nextTick()
    expect(wrapper.emitted('update:open')).toBeUndefined()

    await wrapper.setProps({ maskClosable: true })
    query<HTMLElement>('.vk-drawer__mask').click()
    await nextTick()
    expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])

    wrapper.unmount()
  })

  it('applies the height for vertical placements', async () => {
    const wrapper = mount(VkDrawer, {
      props: { open: true, placement: 'bottom', height: 280 },
      attachTo: document.body,
    })
    await nextTick()

    const panel = query<HTMLElement>('.vk-drawer__panel')
    expect(panel.getAttribute('style')).toContain('height: 280px')
    expect(panel.classList.contains('vk-drawer__panel--bottom')).toBe(true)

    wrapper.unmount()
  })
})
