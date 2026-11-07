import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { VkBadge } from '@/components/badge'
import { VkTooltip } from '@/components/tooltip'
import { VkResult } from '@/components/result'
import { VkDescriptions } from '@/components/descriptions'
import { VkSteps } from '@/components/steps'

afterEach(() => {
  document.body.innerHTML = ''
  vi.useRealTimers()
})

describe('VkBadge', () => {
  it('caps numeric values and hides zero by default', () => {
    const capped = mount(VkBadge, { props: { value: 120, max: 99 } })
    expect(capped.get('.vk-badge__badge').text()).toBe('99+')

    const zero = mount(VkBadge, { props: { value: 0 } })
    expect(zero.find('.vk-badge__badge').exists()).toBe(false)

    const shown = mount(VkBadge, { props: { value: 0, showZero: true } })
    expect(shown.get('.vk-badge__badge').text()).toBe('0')
  })

  it('renders a standalone dot with an accessible label', () => {
    const wrapper = mount(VkBadge, { props: { dot: true, ariaLabel: '有未读消息' } })
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['vk-badge--standalone', 'vk-badge--dot']),
    )
    expect(wrapper.get('.vk-badge__badge').attributes('aria-label')).toBe('有未读消息')
    expect(wrapper.get('.vk-badge__badge').attributes('role')).toBe('status')
  })
})

describe('VkTooltip', () => {
  it('opens on hover and closes with Escape', async () => {
    vi.useFakeTimers()
    const wrapper = mount(VkTooltip, {
      props: { content: '复制链接', delay: 0 },
      slots: { trigger: '<button type="button">复制</button>' },
      attachTo: document.body,
    })

    const trigger = wrapper.get('.vk-tooltip__trigger')
    expect(document.body.querySelector('[role="tooltip"]')).toBeNull()

    await trigger.trigger('mouseenter')
    vi.runAllTimers()
    await nextTick()

    const panel = document.body.querySelector('[role="tooltip"]')
    expect(panel).not.toBeNull()
    expect(panel?.textContent).toContain('复制链接')
    expect(trigger.attributes('aria-describedby')).toBe(panel?.id)

    await trigger.trigger('keydown', { key: 'Escape' })
    await nextTick()
    expect(trigger.attributes('aria-describedby')).toBeUndefined()
    wrapper.unmount()
  })

  it('does not open when disabled', async () => {
    vi.useFakeTimers()
    const wrapper = mount(VkTooltip, {
      props: { content: '提示', delay: 0, disabled: true },
      slots: { trigger: '<button type="button">按钮</button>' },
      attachTo: document.body,
    })

    await wrapper.get('.vk-tooltip__trigger').trigger('mouseenter')
    vi.runAllTimers()
    await nextTick()
    expect(document.body.querySelector('[role="tooltip"]')).toBeNull()
    wrapper.unmount()
  })
})

describe('VkResult', () => {
  it('falls back to the locale title', () => {
    const wrapper = mount(VkResult, { props: { status: '404' } })
    expect(wrapper.attributes('role')).toBe('status')
    expect(wrapper.get('.vk-result__code').text()).toBe('404')
    expect(wrapper.get('.vk-result__title').text()).toBe('页面不存在')
  })

  it('renders a custom title and extra actions', () => {
    const wrapper = mount(VkResult, {
      props: { status: 'success', title: '已发布', description: '覆盖发布完成' },
      slots: { extra: '<button class="retry">查看</button>' },
    })

    expect(wrapper.get('.vk-result__title').text()).toBe('已发布')
    expect(wrapper.get('.vk-result__description').text()).toBe('覆盖发布完成')
    expect(wrapper.find('.vk-result__extra .retry').exists()).toBe(true)
  })
})

describe('VkDescriptions', () => {
  it('renders definition pairs with column variables and spans', () => {
    const wrapper = mount(VkDescriptions, {
      props: {
        column: 2,
        items: [
          { key: 'name', label: '项目', value: 'VaKao UI' },
          { label: '版本', value: '0.1.0', span: 2 },
        ],
      },
    })

    expect(wrapper.element.tagName).toBe('DL')
    expect(wrapper.attributes('style')).toContain('--vk-descriptions-columns: 2')
    expect(wrapper.findAll('dt')).toHaveLength(2)
    expect(wrapper.findAll('dd')[0].text()).toBe('VaKao UI')
    expect(wrapper.findAll('.vk-descriptions__item')[1].attributes('style')).toContain('span 2')
  })

  it('renders custom values through item slots', () => {
    const wrapper = mount(VkDescriptions, {
      props: { items: [{ key: 'status', label: '状态', value: 'wait' }] },
      slots: { 'item-status': '<span class="custom">已发布</span>' },
    })

    expect(wrapper.get('.vk-descriptions__value .custom').text()).toBe('已发布')
  })

  it('switches to the bordered variant', () => {
    const wrapper = mount(VkDescriptions, { props: { bordered: true, items: [] } })
    expect(wrapper.classes()).toContain('vk-descriptions--bordered')
  })
})

describe('VkSteps', () => {
  const items = [{ title: '草稿' }, { title: '评审' }, { title: '发布' }]

  it('marks finished, current and waiting steps', () => {
    const wrapper = mount(VkSteps, { props: { items, current: 1 } })
    const steps = wrapper.findAll('.vk-steps__item')

    expect(wrapper.element.tagName).toBe('OL')
    expect(steps[0].classes()).toContain('vk-steps--finish')
    expect(steps[1].classes()).toContain('vk-steps--process')
    expect(steps[1].attributes('aria-current')).toBe('step')
    expect(steps[2].classes()).toContain('vk-steps--wait')
    expect(steps[2].attributes('aria-current')).toBeUndefined()
    expect(steps[0].find('svg').exists()).toBe(true)
  })

  it('supports the error status and vertical direction', () => {
    const wrapper = mount(VkSteps, {
      props: { items, current: 2, status: 'error', direction: 'vertical' },
    })

    expect(wrapper.classes()).toContain('vk-steps--vertical')
    expect(wrapper.findAll('.vk-steps__item')[2].classes()).toContain('vk-steps--error')
  })
})
