import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { VkLink, VkText, VkTitle, VkTypography } from '@/components/typography'
import { VkDivider } from '@/components/divider'
import { VkTag } from '@/components/tag'
import { VkAvatar } from '@/components/avatar'
import { VkCard } from '@/components/card'

describe('VkTypography', () => {
  it('renders the requested tag with modifiers', () => {
    const wrapper = mount(VkTypography, {
      props: { tag: 'p', type: 'secondary', strong: true, code: true, truncate: true },
      slots: { default: '说明文字' },
    })

    expect(wrapper.element.tagName).toBe('P')
    expect(wrapper.text()).toBe('说明文字')
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining([
        'vk-typography',
        'vk-typography--secondary',
        'vk-typography--strong',
        'vk-typography--code',
        'vk-typography--truncate',
      ]),
    )
  })
})

describe('VkTitle', () => {
  it('maps level to a heading tag and keeps the align modifier', () => {
    const wrapper = mount(VkTitle, {
      props: { level: 3, align: 'center' },
      slots: { default: '标题' },
    })

    expect(wrapper.element.tagName).toBe('H3')
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['vk-title--3', 'vk-title--center', 'vk-title--default']),
    )
  })
})

describe('VkText', () => {
  it('supports deleted and inline code styles', () => {
    const wrapper = mount(VkText, {
      props: { tag: 'div', deleted: true, code: true },
      slots: { default: '旧值' },
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['vk-typography--deleted', 'vk-typography--code']),
    )
  })
})

describe('VkLink', () => {
  it('adds a safe rel when opening a new tab', () => {
    const wrapper = mount(VkLink, {
      props: { href: 'https://ui.woyuxiaji.cn', target: '_blank' },
      slots: { default: '文档' },
    })

    expect(wrapper.attributes('href')).toBe('https://ui.woyuxiaji.cn')
    expect(wrapper.attributes('rel')).toBe('noopener noreferrer')
  })

  it('removes navigation when disabled', async () => {
    const wrapper = mount(VkLink, {
      props: { href: '/docs', disabled: true },
      slots: { default: '文档' },
    })

    expect(wrapper.attributes('href')).toBeUndefined()
    expect(wrapper.attributes('aria-disabled')).toBe('true')
    expect(wrapper.attributes('tabindex')).toBe('-1')
  })
})

describe('VkDivider', () => {
  it('exposes separator semantics and renders the title between two lines', () => {
    const wrapper = mount(VkDivider, { slots: { default: '分组标题' } })

    expect(wrapper.get('[role="separator"]').attributes('aria-orientation')).toBe('horizontal')
    expect(wrapper.findAll('.vk-divider__line')).toHaveLength(2)
    expect(wrapper.text()).toContain('分组标题')
  })

  it('skips the title area in vertical mode', () => {
    const wrapper = mount(VkDivider, {
      props: { type: 'vertical' },
      slots: { default: '忽略' },
    })

    expect(wrapper.attributes('aria-orientation')).toBe('vertical')
    expect(wrapper.find('.vk-divider__title').exists()).toBe(false)
  })
})

describe('VkTag', () => {
  it('emits close with the original event', async () => {
    const wrapper = mount(VkTag, { props: { closable: true }, slots: { default: '设计' } })
    await wrapper.get('button').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('blocks closing when disabled', async () => {
    const wrapper = mount(VkTag, {
      props: { closable: true, disabled: true },
      slots: { default: '禁用' },
    })

    expect(wrapper.attributes('aria-disabled')).toBe('true')
    expect(wrapper.get('button').attributes('disabled')).toBeDefined()
    await wrapper.get('button').trigger('click')
    expect(wrapper.emitted('close')).toBeUndefined()
  })
})

describe('VkAvatar', () => {
  it('renders the image with its alt text', () => {
    const wrapper = mount(VkAvatar, { props: { src: '/avatar.png', alt: '林晚' } })
    expect(wrapper.get('img').attributes('src')).toBe('/avatar.png')
    expect(wrapper.get('img').attributes('alt')).toBe('林晚')
  })

  it('falls back to the first alt character after an image error', async () => {
    const wrapper = mount(VkAvatar, { props: { src: '/missing.png', alt: '林晚' } })
    await wrapper.get('img').trigger('error')
    await nextTick()

    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.text()).toBe('林')
    expect(wrapper.attributes('role')).toBe('img')
    expect(wrapper.attributes('aria-label')).toBe('林晚')
  })

  it('applies numeric sizes inline', () => {
    const wrapper = mount(VkAvatar, { props: { size: 48, alt: '周' } })
    expect(wrapper.attributes('style')).toContain('width: 48px')
    expect(wrapper.attributes('style')).toContain('height: 48px')
  })
})

describe('VkCard', () => {
  it('renders header, extra, body and footer with group semantics', () => {
    const wrapper = mount(VkCard, {
      props: { title: '四色星', subtitle: '设计系统', hoverable: true },
      slots: {
        default: '<p class="body">内容</p>',
        extra: '<button class="edit">编辑</button>',
        footer: '<span class="foot">页脚</span>',
      },
    })

    expect(wrapper.attributes('role')).toBe('group')
    expect(wrapper.attributes('aria-label')).toBe('四色星')
    expect(wrapper.classes()).toContain('vk-card--hoverable')
    expect(wrapper.get('.vk-card__title').text()).toBe('四色星')
    expect(wrapper.get('.vk-card__subtitle').text()).toBe('设计系统')
    expect(wrapper.find('.vk-card__extra .edit').exists()).toBe(true)
    expect(wrapper.find('.vk-card__body .body').exists()).toBe(true)
    expect(wrapper.get('.vk-card__footer').text()).toBe('页脚')
  })

  it('drops body padding when flush', () => {
    const wrapper = mount(VkCard, { props: { flush: true }, slots: { default: '内容' } })
    expect(wrapper.get('.vk-card__body').classes()).toContain('vk-card__body--flush')
  })
})
