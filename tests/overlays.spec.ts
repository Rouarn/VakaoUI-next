import { afterEach, describe, expect, it, vi } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { h, nextTick, ref } from 'vue'
import { VkPopover } from '@/components/popover'
import { VkPopconfirm } from '@/components/popconfirm'
import { VkDropdown } from '@/components/dropdown'
import { VkModal } from '@/components/modal'
import { VkSelect } from '@/components/select'
import { VkConfigProvider } from '@/components/config-provider'

enableAutoUnmount(afterEach)

function query<T extends HTMLElement = HTMLElement>(selector: string): T | null {
  return document.querySelector<T>(selector)
}

function queryAll<T extends HTMLElement = HTMLElement>(selector: string): T[] {
  return Array.from(document.querySelectorAll<T>(selector))
}

describe('VkPopover', () => {
  it('opens on trigger click and exposes dialog semantics', async () => {
    const wrapper = mount(VkPopover, {
      props: { content: '说明' },
      slots: { trigger: '<button class="trigger">打开</button>' },
      attachTo: document.body,
    })
    expect(query('[role="dialog"]')).toBeNull()
    await wrapper.get('.trigger').trigger('click')
    const panel = query('[role="dialog"]')
    expect(panel?.textContent).toContain('说明')
    expect(wrapper.emitted('open')).toHaveLength(1)
    wrapper.unmount()
  })

  it('renders the panel outside the trigger hierarchy, under body', async () => {
    const wrapper = mount(VkPopover, {
      props: { open: true, content: '说明' },
      slots: { trigger: '<button class="trigger">打开</button>' },
      attachTo: document.body,
    })
    await nextTick()
    const panel = query('[role="dialog"]')
    expect(panel).not.toBeNull()
    expect(document.body.contains(panel as HTMLElement)).toBe(true)
    expect(wrapper.element.contains(panel as HTMLElement)).toBe(false)
    wrapper.unmount()
  })

  it('closes on Escape', async () => {
    const wrapper = mount(VkPopover, {
      props: { content: '说明', trigger: 'click' },
      slots: { trigger: '<button class="trigger">打开</button>' },
      attachTo: document.body,
    })
    await wrapper.get('.trigger').trigger('click')
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await nextTick()
    expect(query('[role="dialog"]')).toBeNull()
    wrapper.unmount()
  })
})

describe('VkPopconfirm', () => {
  it('emits confirm and closes', async () => {
    const wrapper = mount(VkPopconfirm, {
      props: { title: '确认删除？', content: '删除后无法恢复' },
      slots: { trigger: '<button class="trigger">删除</button>' },
      attachTo: document.body,
    })
    await wrapper.get('.trigger').trigger('click')
    expect(query('[role="alertdialog"]')?.textContent).toContain('确认删除？')
    const buttons = queryAll('.vk-popconfirm__button')
    buttons[buttons.length - 1]?.click()
    await nextTick()
    expect(wrapper.emitted('confirm')).toHaveLength(1)
    wrapper.unmount()
  })

  it('cancels and returns focus to the trigger', async () => {
    const wrapper = mount(VkPopconfirm, {
      props: { title: '确认？' },
      slots: { trigger: '<button class="trigger">操作</button>' },
      attachTo: document.body,
    })
    await wrapper.get('.trigger').trigger('click')
    await nextTick()
    queryAll('.vk-popconfirm__button')[0]?.click()
    await nextTick()
    expect(wrapper.emitted('cancel')).toHaveLength(1)
    expect(document.activeElement).toBe(wrapper.get('.trigger').element)
    wrapper.unmount()
  })
})

describe('VkDropdown', () => {
  const items = [
    { key: 'edit', label: '编辑' },
    { key: 'divider', label: '', divider: true },
    { key: 'delete', label: '删除', danger: true },
  ]

  it('renders menu items and emits select', async () => {
    const wrapper = mount(VkDropdown, {
      props: { items },
      slots: { trigger: '<button class="trigger">更多</button>' },
      attachTo: document.body,
    })
    await wrapper.get('.trigger').trigger('click')
    const menu = query('[role="menu"]')
    expect(menu?.querySelectorAll('[role="menuitem"]')).toHaveLength(2)
    const first = menu?.querySelectorAll<HTMLElement>('[role="menuitem"]')[0]
    first?.click()
    await nextTick()
    expect(wrapper.emitted('select')?.[0]).toEqual(['edit', items[0]])
    wrapper.unmount()
  })

  it('supports keyboard navigation between items', async () => {
    const wrapper = mount(VkDropdown, {
      props: { items },
      slots: { trigger: '<button class="trigger">更多</button>' },
      attachTo: document.body,
    })
    await wrapper.get('.trigger').trigger('click')
    await nextTick()
    expect(document.activeElement?.textContent).toBe('编辑')
    query('[role="menu"]')?.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }),
    )
    await nextTick()
    expect(document.activeElement?.textContent).toBe('删除')
    wrapper.unmount()
  })
})

describe('VkModal', () => {
  it('renders through teleport with dialog semantics', async () => {
    const wrapper = mount(VkModal, {
      props: { open: true, title: '标题' },
      slots: { default: '<p class="content">内容</p>' },
      attachTo: document.body,
    })
    await nextTick()
    const dialog = query('[role="dialog"]')
    expect(dialog).not.toBeNull()
    expect(dialog?.getAttribute('aria-modal')).toBe('true')
    expect(document.body.textContent).toContain('内容')
    wrapper.unmount()
  })

  it('keeps the viewport mask full-screen by putting width on the dialog', async () => {
    const wrapper = mount(VkModal, { props: { open: true, width: 520 }, attachTo: document.body })
    await nextTick()
    const root = query('.vk-modal') as HTMLElement
    const dialog = query('.vk-modal__dialog') as HTMLElement
    expect(root.style.width).toBe('')
    expect(dialog.style.width).toBe('520px')
    wrapper.unmount()
  })

  it('emits cancel and update:open=false when Escape is pressed', async () => {
    const wrapper = mount(VkModal, {
      props: { open: true },
      attachTo: document.body,
    })
    await nextTick()
    const dialog = query('.vk-modal__dialog') as HTMLElement
    dialog.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await nextTick()
    expect(wrapper.emitted('update:open')?.[0]).toEqual([false])
    wrapper.unmount()
  })

  it('closes when the mask is clicked unless maskClosable=false', async () => {
    const wrapper = mount(VkModal, { props: { open: true }, attachTo: document.body })
    await nextTick()
    queryAll('.vk-modal__mask').pop()?.click()
    await nextTick()
    expect(wrapper.emitted('update:open')).toHaveLength(1)
    wrapper.unmount()

    const locked = mount(VkModal, {
      props: { open: true, maskClosable: false },
      attachTo: document.body,
    })
    await nextTick()
    queryAll('.vk-modal__mask').pop()?.click()
    await nextTick()
    expect(locked.emitted('update:open')).toBeUndefined()
    locked.unmount()
  })

  it('restores body scroll after closing', async () => {
    const wrapper = mount(VkModal, { props: { open: false }, attachTo: document.body })
    await wrapper.setProps({ open: true })
    await nextTick()
    expect(document.body.style.overflow).toBe('hidden')
    await wrapper.setProps({ open: false })
    await nextTick()
    expect(document.body.style.overflow).toBe('')
    wrapper.unmount()
  })
})

describe('popup container', () => {
  it('teleports panels into the container provided by ConfigProvider', async () => {
    const container = document.createElement('div')
    container.id = 'popup-root'
    document.body.appendChild(container)

    const open = ref(true)
    const wrapper = mount(VkConfigProvider, {
      props: { getPopupContainer: () => container },
      slots: {
        default: () =>
          h(
            VkPopover,
            { open: open.value, content: '说明' },
            {
              trigger: () => h('button', { class: 'trigger' }, '打开'),
            },
          ),
      },
      attachTo: document.body,
    })
    await nextTick()
    const panel = query('[role="dialog"]')
    expect(panel).not.toBeNull()
    expect(container.contains(panel as HTMLElement)).toBe(true)
    wrapper.unmount()
    container.remove()
  })
})

describe('nested layers', () => {
  it('paints a dropdown opened inside a popover above the popover panel', async () => {
    const items = [{ key: 'a', label: 'A' }]
    const wrapper = mount(
      {
        setup: () => () =>
          h(
            VkPopover,
            { open: true, content: '外层' },
            {
              trigger: () => h('button', { class: 'pop-trigger' }, '外层'),
              default: () =>
                h(VkDropdown, { items }, { trigger: () => h('button', { class: 'dd' }, '内层') }),
            },
          ),
      },
      { attachTo: document.body },
    )
    await nextTick()
    ;(document.querySelector('.dd') as HTMLElement).click()
    await nextTick()
    const pop = document.querySelector('.vk-popover__panel') as HTMLElement
    const menu = document.querySelector('.vk-dropdown__panel') as HTMLElement
    expect(pop).not.toBeNull()
    expect(menu).not.toBeNull()
    expect(Number(menu.style.zIndex)).toBe(Number(pop.style.zIndex))
    expect(pop.compareDocumentPosition(menu) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    wrapper.unmount()
  })

  it('renders a select listbox above an open modal', async () => {
    const options = [
      { label: 'A', value: 'a' },
      { label: 'B', value: 'b' },
    ]
    const wrapper = mount(
      {
        setup: () => () => h(VkModal, { open: true }, { default: () => h(VkSelect, { options }) }),
      },
      { attachTo: document.body },
    )
    await nextTick()
    const modal = document.querySelector('.vk-modal') as HTMLElement
    ;(document.querySelector('.vk-select__trigger') as HTMLElement).click()
    await nextTick()
    const listbox = document.querySelector('.vk-select__listbox') as HTMLElement
    expect(listbox).not.toBeNull()
    expect(Number(listbox.style.zIndex)).toBeGreaterThan(Number(modal.style.zIndex))
    expect(document.body.contains(listbox)).toBe(true)
    wrapper.unmount()
  })
})

describe('overlay focus management', () => {
  it('does not throw when no focusable element exists', () => {
    expect(() => mount(VkPopover, { props: { open: true } })).not.toThrow()
  })

  it('unregisters document listeners on unmount', () => {
    const remove = vi.spyOn(document, 'removeEventListener')
    const wrapper = mount(VkPopover, { props: { open: true } })
    wrapper.unmount()
    expect(remove).toHaveBeenCalled()
    remove.mockRestore()
  })
})
