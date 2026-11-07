import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { VkPopover } from '@/components/popover'
import { VkPopconfirm } from '@/components/popconfirm'
import { VkDropdown } from '@/components/dropdown'
import { VkModal } from '@/components/modal'

describe('VkPopover', () => {
  it('opens on trigger click and exposes dialog semantics', async () => {
    const wrapper = mount(VkPopover, {
      props: { content: '说明' },
      slots: { trigger: '<button class="trigger">打开</button>' },
    })
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
    await wrapper.get('.trigger').trigger('click')
    const panel = wrapper.get('[role="dialog"]')
    expect(panel.text()).toContain('说明')
    expect(wrapper.emitted('open')).toHaveLength(1)
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
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
    wrapper.unmount()
  })
})

describe('VkPopconfirm', () => {
  it('emits confirm and closes', async () => {
    const wrapper = mount(VkPopconfirm, {
      props: { title: '确认删除？', content: '删除后无法恢复' },
      slots: { trigger: '<button class="trigger">删除</button>' },
    })
    await wrapper.get('.trigger').trigger('click')
    expect(wrapper.get('[role="alertdialog"]').text()).toContain('确认删除？')
    const buttons = wrapper.findAll('.vk-popconfirm__button')
    await buttons[buttons.length - 1].trigger('click')
    expect(wrapper.emitted('confirm')).toHaveLength(1)
  })

  it('cancels and returns focus to the trigger', async () => {
    const wrapper = mount(VkPopconfirm, {
      props: { title: '确认？' },
      slots: { trigger: '<button class="trigger">操作</button>' },
      attachTo: document.body,
    })
    await wrapper.get('.trigger').trigger('click')
    await nextTick()
    const cancel = wrapper.findAll('.vk-popconfirm__button')[0]
    await cancel.trigger('click')
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
    })
    await wrapper.get('.trigger').trigger('click')
    const menu = wrapper.get('[role="menu"]')
    expect(menu.findAll('[role="menuitem"]')).toHaveLength(2)
    await menu.findAll('[role="menuitem"]')[0].trigger('click')
    expect(wrapper.emitted('select')?.[0]).toEqual(['edit', items[0]])
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
    await wrapper.get('[role="menu"]').trigger('keydown', { key: 'ArrowDown' })
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
    const dialog = document.body.querySelector('[role="dialog"]')
    expect(dialog).not.toBeNull()
    expect(dialog?.getAttribute('aria-modal')).toBe('true')
    expect(document.body.textContent).toContain('内容')
    wrapper.unmount()
  })

  it('emits cancel and update:open=false when Escape is pressed', async () => {
    const wrapper = mount(VkModal, {
      props: { open: true },
      attachTo: document.body,
    })
    await nextTick()
    const dialog = document.body.querySelector('[role="dialog"]') as HTMLElement
    dialog.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await nextTick()
    expect(wrapper.emitted('update:open')?.[0]).toEqual([false])
    wrapper.unmount()
  })

  it('closes when the mask is clicked unless maskClosable=false', async () => {
    const wrapper = mount(VkModal, { props: { open: true }, attachTo: document.body })
    await nextTick()
    const masks = document.body.querySelectorAll('.vk-modal__mask')
    ;(masks[masks.length - 1] as HTMLElement).click()
    await nextTick()
    expect(wrapper.emitted('update:open')).toHaveLength(1)
    wrapper.unmount()

    const locked = mount(VkModal, {
      props: { open: true, maskClosable: false },
      attachTo: document.body,
    })
    await nextTick()
    const lockedMasks = document.body.querySelectorAll('.vk-modal__mask')
    ;(lockedMasks[lockedMasks.length - 1] as HTMLElement).click()
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
