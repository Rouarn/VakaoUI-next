import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import { VkAffix } from '@/components/affix'
import { VkAnchor } from '@/components/anchor'
import { VkImage } from '@/components/image'
import { VkPageHeader } from '@/components/page-header'
import { VkWatermark } from '@/components/watermark'

afterEach(() => {
  document.body.innerHTML = ''
  vi.restoreAllMocks()
})

describe('VkImage', () => {
  it('renders the image with size and fit', () => {
    const wrapper = mount(VkImage, {
      props: { src: '/photo.png', alt: '照片', width: 200, height: 120, fit: 'contain' },
    })

    const img = wrapper.get('img')
    expect(img.attributes('src')).toBe('/photo.png')
    expect(img.attributes('alt')).toBe('照片')
    expect(img.attributes('style')).toContain('object-fit: contain')
    expect(wrapper.get('.vk-image').attributes('style')).toContain('width: 200px')
    expect(wrapper.get('.vk-image').attributes('style')).toContain('height: 120px')
  })

  it('retries with fallbackSrc once, then renders the error state', async () => {
    const wrapper = mount(VkImage, { props: { src: '/missing.png', fallbackSrc: '/alt.png' } })

    await wrapper.get('img').trigger('error')
    expect(wrapper.get('img').attributes('src')).toBe('/alt.png')

    await wrapper.get('img').trigger('error')
    expect(wrapper.find('.vk-image__error').exists()).toBe(true)
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.emitted('error')).toHaveLength(2)
  })

  it('opens a zoomable preview and closes on Escape', async () => {
    const wrapper = mount(VkImage, {
      props: { src: '/photo.png', alt: '照片', preview: true },
      attachTo: document.body,
    })

    await wrapper.get('.vk-image').trigger('click')
    await nextTick()

    const dialog = document.querySelector<HTMLElement>('.vk-image-preview')
    expect(dialog?.getAttribute('role')).toBe('dialog')
    expect(dialog?.getAttribute('aria-modal')).toBe('true')
    expect(dialog?.getAttribute('aria-label')).toBe('照片')

    const buttons = Array.from(
      document.querySelectorAll<HTMLButtonElement>('.vk-image-preview__button'),
    )
    buttons[1].click()
    await nextTick()
    expect(
      document
        .querySelector<HTMLElement>('.vk-image-preview__img')
        ?.style.getPropertyValue('--vk-image-zoom'),
    ).toBe('1.25')

    dialog?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await nextTick()
    expect(document.querySelector('.vk-image-preview')).toBeNull()

    wrapper.unmount()
  })
})

describe('VkPageHeader', () => {
  it('renders title, subtitle and slots', () => {
    const wrapper = mount(VkPageHeader, {
      props: { title: '成员管理', subtitle: '共 12 人' },
      slots: {
        extra: () => h('button', { class: 'add' }, '新增'),
        footer: () => h('div', { class: 'foot' }, '页脚'),
      },
    })

    expect(wrapper.element.tagName).toBe('HEADER')
    expect(wrapper.get('h1').text()).toBe('成员管理')
    expect(wrapper.get('.vk-page-header__subtitle').text()).toBe('共 12 人')
    expect(wrapper.find('.add').exists()).toBe(true)
    expect(wrapper.find('.foot').exists()).toBe(true)
  })

  it('emits back from the back button', async () => {
    const wrapper = mount(VkPageHeader, { props: { title: '详情', backLabel: '返回列表' } })

    const back = wrapper.get('.vk-page-header__back')
    expect(back.attributes('aria-label')).toBe('返回列表')
    await back.trigger('click')
    expect(wrapper.emitted('back')).toHaveLength(1)
  })

  it('hides the back button when back is false', () => {
    const wrapper = mount(VkPageHeader, { props: { title: '详情', back: false } })
    expect(wrapper.find('.vk-page-header__back').exists()).toBe(false)
  })
})

describe('VkAffix', () => {
  it('fixes against the viewport and emits the state change', async () => {
    const wrapper = mount(VkAffix, {
      props: { offsetTop: 0, zIndex: 20 },
      slots: { default: () => h('div', { class: 'content' }, '固钉内容') },
      attachTo: document.body,
    })
    await nextTick()

    expect(wrapper.find('.content').exists()).toBe(true)
    expect(wrapper.emitted('change')?.at(-1)).toEqual([true])
    expect(wrapper.get('.vk-affix__content').attributes('style')).toContain('position: fixed')
    expect(wrapper.get('.vk-affix__content').attributes('style')).toContain('z-index: 20')

    wrapper.unmount()
  })

  it('stays static when the bottom offset keeps it in flow', async () => {
    const wrapper = mount(VkAffix, { props: { offsetBottom: 20 }, attachTo: document.body })
    await nextTick()

    expect(wrapper.get('.vk-affix__content').attributes('style')).toContain('position: static')
    wrapper.unmount()
  })

  it('anchors fixed content to the target scroll container', async () => {
    const scroller = document.createElement('div')
    scroller.id = 'affix-target'
    Object.defineProperty(scroller, 'clientHeight', { value: 200, configurable: true })
    scroller.getBoundingClientRect = () =>
      ({
        top: 120,
        bottom: 320,
        left: 40,
        right: 440,
        width: 400,
        height: 200,
        x: 40,
        y: 120,
        toJSON: () => ({}),
      }) as DOMRect
    document.body.appendChild(scroller)

    const wrapper = mount(VkAffix, {
      props: { target: '#affix-target', offsetTop: 8 },
      slots: { default: () => h('div', { class: 'content' }, '固钉内容') },
      attachTo: scroller,
    })
    await nextTick()

    const style = wrapper.get('.vk-affix__content').attributes('style')
    expect(style).toContain('position: fixed')
    expect(style).toContain('top: 128px')

    wrapper.unmount()
    scroller.remove()
  })
})

describe('VkAnchor', () => {
  it('renders links, marks the active item and scrolls on click', async () => {
    const section = document.createElement('div')
    section.id = 'section-a'
    document.body.appendChild(section)

    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    const wrapper = mount(VkAnchor, {
      props: {
        items: [
          { key: 'a', href: '#section-a', title: '第一节' },
          { key: 'b', href: '#section-b', title: '第二节' },
        ],
      },
      attachTo: document.body,
    })
    await nextTick()

    expect(wrapper.element.tagName).toBe('NAV')
    expect(wrapper.attributes('aria-label')).toBe('页内导航')
    expect(wrapper.findAll('a')).toHaveLength(2)

    const first = wrapper.findAll('a')[0]
    await first.trigger('click')
    expect(scrollTo).toHaveBeenCalled()
    expect(wrapper.emitted('click')).toHaveLength(1)
    expect(wrapper.emitted('click')?.[0][0]).toMatchObject({
      item: { key: 'a' },
    })

    wrapper.unmount()
  })

  it('renders one level of children', () => {
    const wrapper = mount(VkAnchor, {
      props: {
        items: [
          {
            key: 'a',
            href: '#a',
            title: '父级',
            children: [{ key: 'a-1', href: '#a-1', title: '子级' }],
          },
        ],
      },
    })

    expect(wrapper.findAll('a')).toHaveLength(2)
    expect(wrapper.find('.vk-anchor__list--child').exists()).toBe(true)
  })
})

describe('VkWatermark', () => {
  function stubCanvas(): void {
    const ctx = {
      font: '',
      fillStyle: '',
      textAlign: '',
      textBaseline: '',
      scale: vi.fn(),
      translate: vi.fn(),
      rotate: vi.fn(),
      fillText: vi.fn(),
      measureText: vi.fn(() => ({ width: 80 })),
    }
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
      ctx as unknown as CanvasRenderingContext2D,
    )
    vi.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockReturnValue('data:image/png;base64,')
  }

  it('wraps content and renders a hidden watermark layer', async () => {
    stubCanvas()
    const wrapper = mount(VkWatermark, {
      props: { content: '内部资料', zIndex: 12 },
      slots: { default: () => h('p', null, '正文内容') },
    })
    await nextTick()

    expect(wrapper.text()).toContain('正文内容')
    const layer = wrapper.get('.vk-watermark__layer')
    expect(layer.attributes('aria-hidden')).toBe('true')
    expect(layer.attributes('style')).toContain('z-index: 12')
    expect(layer.attributes('style')).toContain('background-image')
  })

  it('supports multi-line content and fullscreen mode', async () => {
    stubCanvas()
    const wrapper = mount(VkWatermark, {
      props: { content: ['第一行', '第二行'], fullscreen: true },
    })
    await nextTick()

    expect(wrapper.classes()).toContain('vk-watermark--fullscreen')
    expect(wrapper.get('.vk-watermark__layer').attributes('style')).toContain('background-size')
  })
})
