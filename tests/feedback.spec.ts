import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { VkAlert } from '@/components/alert'
import { VkProgress } from '@/components/progress'
import { VkSpin } from '@/components/spin'
import { VkSkeleton } from '@/components/skeleton'
import { VkEmpty } from '@/components/empty'
import { VkConfigProvider } from '@/components/config-provider'

describe('VkAlert', () => {
  it('announces itself and renders title and description', () => {
    const wrapper = mount(VkAlert, {
      props: { type: 'error', title: '保存失败', description: '网络不可用' },
    })
    expect(wrapper.get('[role="alert"]')).toBeTruthy()
    expect(wrapper.text()).toContain('保存失败')
    expect(wrapper.text()).toContain('网络不可用')
    expect(wrapper.find('.vk-alert__icon').exists()).toBe(true)
  })

  it('emits close and respects showIcon=false', async () => {
    const wrapper = mount(VkAlert, { props: { closable: true, showIcon: false } })
    expect(wrapper.find('.vk-alert__icon').exists()).toBe(false)
    await wrapper.get('button').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
  })
})

describe('VkProgress', () => {
  it('clamps the value and exposes aria-valuenow', () => {
    const wrapper = mount(VkProgress, { props: { value: 140 } })
    const bar = wrapper.get('[role="progressbar"]')
    expect(bar.attributes('aria-valuenow')).toBe('100')
    expect(wrapper.text()).toContain('100%')
  })

  it('renders circle variant with dash offset', () => {
    const wrapper = mount(VkProgress, { props: { value: 50, type: 'circle' } })
    const circle = wrapper.get('.vk-progress__circle-fill')
    const dash = Number(circle.attributes('stroke-dashoffset'))
    expect(dash).toBeGreaterThan(0)
  })
})

describe('VkSpin', () => {
  it('marks busy and shows an accessible status', () => {
    const wrapper = mount(VkSpin, { props: { tip: '保存中' } })
    expect(wrapper.classes()).toContain('vk-spin--spinning')
    expect(wrapper.get('[role="status"]').attributes('aria-label')).toBe('保存中')
    expect(wrapper.get('[aria-busy="true"]')).toBeTruthy()
  })

  it('hides the indicator after delay when not spinning', async () => {
    vi.useFakeTimers()
    const wrapper = mount(VkSpin, { props: { spinning: false, delay: 100 } })
    expect(wrapper.find('[role="status"]').exists()).toBe(false)
    vi.useRealTimers()
  })
})

describe('VkSkeleton', () => {
  it('renders placeholder rows while loading', () => {
    const wrapper = mount(VkSkeleton, { props: { rows: 2, avatar: true } })
    expect(wrapper.attributes('aria-busy')).toBe('true')
    expect(wrapper.findAll('.vk-skeleton__row')).toHaveLength(2)
    expect(wrapper.find('.vk-skeleton__avatar').exists()).toBe(true)
  })

  it('renders slot content when loading is false', () => {
    const wrapper = mount(VkSkeleton, {
      props: { loading: false },
      slots: { default: '<p class="real">完成</p>' },
    })
    expect(wrapper.get('.real').text()).toBe('完成')
  })
})

describe('VkEmpty', () => {
  it('uses the default locale description', () => {
    const wrapper = mount(VkEmpty)
    expect(wrapper.get('[role="status"]').text()).toContain('暂无数据')
  })

  it('switches locale through ConfigProvider', () => {
    const wrapper = mount({
      components: { VkConfigProvider, VkEmpty },
      template: '<VkConfigProvider locale="en-US"><VkEmpty /></VkConfigProvider>',
    })
    expect(wrapper.text()).toContain('No data')
  })
})
