import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { VkButton } from '@/components/button'
import { VkConfigProvider } from '@/components/config-provider'

describe('VkConfigProvider', () => {
  it('renders a scoped theme container without a layout box', () => {
    const wrapper = mount(VkConfigProvider, {
      props: { theme: 'dark' },
      slots: { default: '内容' },
    })

    const root = wrapper.find('.vk-config-provider')
    expect(root.attributes('data-vk-theme')).toBe('dark')
    expect(root.attributes('style')).toContain('--vk-color-body: #121210')
  })

  it('provides size to child components', () => {
    const wrapper = mount({
      components: { VkConfigProvider, VkButton },
      template: `
        <VkConfigProvider size="small">
          <VkButton>继承尺寸</VkButton>
        </VkConfigProvider>
      `,
    })

    expect(wrapper.find('.vk-button').classes()).toContain('vk-button--small')
  })

  it('lets a child override the inherited size', () => {
    const wrapper = mount({
      components: { VkConfigProvider, VkButton },
      template: `
        <VkConfigProvider size="small">
          <VkButton size="large">局部覆盖</VkButton>
        </VkConfigProvider>
      `,
    })

    const classes = wrapper.find('.vk-button').classes()
    expect(classes).toContain('vk-button--large')
    expect(classes).not.toContain('vk-button--small')
  })

  it('accepts theme overrides', () => {
    const wrapper = mount(VkConfigProvider, {
      props: { themeOverrides: { colorPrimary: '#123456' } },
    })

    expect(wrapper.find('.vk-config-provider').attributes('style')).toContain(
      '--vk-color-primary: #123456',
    )
  })
})
