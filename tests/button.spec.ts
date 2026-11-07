import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { VkButton } from '@/components/button'

describe('VkButton', () => {
  it('renders slot content with default classes', () => {
    const wrapper = mount(VkButton, { slots: { default: '播放' } })

    expect(wrapper.text()).toBe('播放')
    expect(wrapper.classes()).toContain('vk-button')
    expect(wrapper.classes()).toContain('vk-button--default')
    expect(wrapper.classes()).toContain('vk-button--solid')
    expect(wrapper.classes()).toContain('vk-button--medium')
  })

  it('applies type, variant and size classes', () => {
    const wrapper = mount(VkButton, {
      props: { type: 'primary', variant: 'outline', size: 'large' },
    })

    expect(wrapper.classes()).toContain('vk-button--primary')
    expect(wrapper.classes()).toContain('vk-button--outline')
    expect(wrapper.classes()).toContain('vk-button--large')
  })

  it('renders a native button with the requested html type', () => {
    const wrapper = mount(VkButton, { props: { htmlType: 'submit' } })

    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.attributes('type')).toBe('submit')
  })

  it('is disabled and marked busy while loading', () => {
    const wrapper = mount(VkButton, { props: { loading: true } })

    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.attributes('aria-busy')).toBe('true')
    expect(wrapper.find('.vk-button__spinner').exists()).toBe(true)
  })

  it('applies the block modifier', () => {
    const wrapper = mount(VkButton, { props: { block: true } })

    expect(wrapper.classes()).toContain('vk-button--block')
  })
})
