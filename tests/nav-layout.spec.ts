import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import {
  VkLayout,
  VkLayoutContent,
  VkLayoutFooter,
  VkLayoutHeader,
  VkLayoutSider,
} from '@/components/layout'
import { VkBreadcrumb, VkBreadcrumbItem } from '@/components/breadcrumb'
import { VkCollapse, VkCollapseItem } from '@/components/collapse'
import { VkRate } from '@/components/rate'
import { VkBackTop } from '@/components/back-top'

afterEach(() => {
  document.body.innerHTML = ''
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('VkLayout', () => {
  it('switches to horizontal layout and applies the collapsed sider width', () => {
    const wrapper = mount({
      render: () =>
        h(VkLayout, { hasSider: true }, () => [
          h(VkLayoutSider, { width: 200, collapsedWidth: 56, collapsed: true }, () => 'side'),
          h(VkLayout, null, () => [
            h(VkLayoutHeader, null, () => 'header'),
            h(VkLayoutContent, null, () => 'content'),
            h(VkLayoutFooter, null, () => 'footer'),
          ]),
        ]),
    })

    expect(wrapper.get('.vk-layout').classes()).toContain('vk-layout--has-sider')
    expect(wrapper.get('aside').attributes('style')).toContain('width: 56px')
    expect(wrapper.get('header').text()).toBe('header')
    expect(wrapper.get('main').text()).toBe('content')
    expect(wrapper.get('footer').text()).toBe('footer')
  })

  it('expands the sider when not collapsed', () => {
    const wrapper = mount(VkLayoutSider, { props: { width: 240 } })
    expect(wrapper.attributes('style')).toContain('width: 240px')
    expect(wrapper.attributes('aria-expanded')).toBe('true')
  })
})

describe('VkBreadcrumb', () => {
  it('marks the last item as the current page', () => {
    const wrapper = mount(VkBreadcrumb, {
      props: {
        separator: '›',
        items: [
          { label: '首页', href: '/' },
          { label: '组件', href: '/components' },
          { label: '面包屑' },
        ],
      },
    })

    expect(wrapper.element.tagName).toBe('NAV')
    expect(wrapper.attributes('aria-label')).toBe('面包屑')
    expect(wrapper.findAll('li')).toHaveLength(3)
    expect(wrapper.findAll('a')).toHaveLength(2)
    expect(wrapper.get('[aria-current="page"]').text()).toBe('面包屑')
    expect(wrapper.get('.vk-breadcrumb__list').attributes('style')).toContain(
      '--vk-breadcrumb-separator',
    )
  })

  it('supports composed items', () => {
    const wrapper = mount({
      render: () =>
        h(VkBreadcrumb, null, () => [
          h(VkBreadcrumbItem, { href: '/docs' }, () => '文档'),
          h(VkBreadcrumbItem, { current: true }, () => '当前'),
        ]),
    })

    expect(wrapper.findAll('li')).toHaveLength(2)
    expect(wrapper.get('[aria-current="page"]').text()).toBe('当前')
  })
})

describe('VkCollapse', () => {
  const items = () => [
    h(VkCollapseItem, { name: 'a', title: '第一项' }, () => '内容 A'),
    h(VkCollapseItem, { name: 'b', title: '第二项' }, () => '内容 B'),
    h(VkCollapseItem, { name: 'c', title: '禁用项', disabled: true }, () => '内容 C'),
  ]

  it('toggles uncontrolled items and exposes aria state', async () => {
    const wrapper = mount({
      render: () => h(VkCollapse, null, items),
    })

    const headers = wrapper.findAll('.vk-collapse-item__header')
    expect(headers[0].attributes('aria-expanded')).toBe('false')
    expect(wrapper.findAll('.vk-collapse-item__panel')[0].attributes('style')).toContain(
      'display: none',
    )

    await headers[0].trigger('click')
    await nextTick()

    expect(headers[0].attributes('aria-expanded')).toBe('true')
    expect(wrapper.findAll('.vk-collapse-item__panel')[0].attributes('style') ?? '').not.toContain(
      'display: none',
    )
    expect(headers[0].attributes('aria-controls')).toBe(
      wrapper.findAll('.vk-collapse-item__panel')[0].attributes('id'),
    )
  })

  it('keeps only one item open in accordion mode', async () => {
    const wrapper = mount(VkCollapse, {
      props: { accordion: true, modelValue: ['a'] },
      slots: { default: items },
    })

    await wrapper.findAll('.vk-collapse-item__header')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([['b']])
  })

  it('ignores disabled items', async () => {
    const wrapper = mount(VkCollapse, { props: { modelValue: [] }, slots: { default: items } })
    const disabled = wrapper.findAll('.vk-collapse-item__header')[2]

    expect(disabled.attributes('disabled')).toBeDefined()
    await disabled.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})

describe('VkRate', () => {
  it('exposes slider semantics and supports keyboard changes', async () => {
    const wrapper = mount(VkRate, { props: { modelValue: 2, allowHalf: true } })

    expect(wrapper.attributes('role')).toBe('slider')
    expect(wrapper.attributes('aria-valuenow')).toBe('2')
    expect(wrapper.attributes('aria-valuemax')).toBe('5')
    expect(wrapper.attributes('aria-label')).toBe('评分')

    await wrapper.trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([2.5])

    await wrapper.trigger('keydown', { key: 'End' })
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([5])
  })

  it('commits full stars on click and clears when clearable', async () => {
    const wrapper = mount(VkRate, { props: { modelValue: 3, clearable: true } })
    const stars = wrapper.findAll('.vk-rate__star')

    await stars[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([1])

    await stars[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([0])
  })

  it('does not change when disabled or readonly', async () => {
    const wrapper = mount(VkRate, { props: { modelValue: 3, readonly: true } })
    await wrapper.findAll('.vk-rate__star')[0].trigger('click')
    await wrapper.trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.attributes('tabindex')).toBe('-1')
  })
})

describe('VkBackTop', () => {
  it('appears after the visibility threshold and scrolls back on click', async () => {
    Object.defineProperty(window, 'scrollY', { value: 400, configurable: true })
    const scrollTo = vi.fn()
    vi.stubGlobal('scrollTo', scrollTo)

    const wrapper = mount(VkBackTop, { props: { visibilityHeight: 200 }, attachTo: document.body })
    await nextTick()

    const button = wrapper.get('button')
    expect(button.attributes('aria-label')).toBe('回到顶部')

    await button.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })

    wrapper.unmount()
  })

  it('stays hidden below the threshold', async () => {
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true })
    const wrapper = mount(VkBackTop, { attachTo: document.body })
    await nextTick()
    expect(wrapper.find('button').exists()).toBe(false)
    wrapper.unmount()
  })
})
