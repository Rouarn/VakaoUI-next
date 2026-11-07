import { afterEach, describe, expect, it } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { VkCascader } from '@/components/cascader'
import type { CascaderOption } from '@/components/cascader'
import { VkTransfer } from '@/components/transfer'
import type { TransferOption } from '@/components/transfer'
import { VkTree } from '@/components/tree'
import type { TreeNode } from '@/components/tree'
import { VkUpload } from '@/components/upload'
import type { UploadRequestOptions } from '@/components/upload'

afterEach(() => {
  document.body.innerHTML = ''
})

async function chooseFiles(wrapper: ReturnType<typeof mount>, files: File[]): Promise<void> {
  const input = wrapper.get('input[type="file"]')
  Object.defineProperty(input.element, 'files', { value: files, configurable: true })
  await input.trigger('change')
  await nextTick()
}

describe('VkUpload', () => {
  it('adds selected files and emits the controlled list', async () => {
    const wrapper = mount(VkUpload, { props: { multiple: true } })
    await chooseFiles(wrapper, [
      new File(['hello'], 'note.txt', { type: 'text/plain' }),
      new File(['world'], 'plan.md', { type: 'text/markdown' }),
    ])

    expect(wrapper.text()).toContain('note.txt')
    expect(wrapper.text()).toContain('plan.md')
    expect(wrapper.findAll('.vk-upload__item')).toHaveLength(2)

    const emitted = wrapper.emitted('update:fileList')
    expect(emitted?.[emitted.length - 1]?.[0] as unknown[]).toHaveLength(2)
    expect(wrapper.emitted('change')).toHaveLength(2)
  })

  it('rejects files by size and accept rules', async () => {
    const wrapper = mount(VkUpload, { props: { maxSize: 2 } })
    await chooseFiles(wrapper, [new File(['hello'], 'note.txt', { type: 'text/plain' })])

    expect(wrapper.emitted('reject')?.[0]?.[1]).toBe('size')
    expect(wrapper.findAll('.vk-upload__item')).toHaveLength(0)

    const acceptOnly = mount(VkUpload, { props: { accept: '.png' } })
    await chooseFiles(acceptOnly, [new File(['hello'], 'note.txt', { type: 'text/plain' })])
    expect(acceptOnly.emitted('reject')?.[0]?.[1]).toBe('type')
  })

  it('runs customRequest with progress and success callbacks', async () => {
    const requests: UploadRequestOptions[] = []
    const wrapper = mount(VkUpload, {
      props: {
        customRequest: (options: UploadRequestOptions) => {
          requests.push(options)
        },
      },
    })

    await chooseFiles(wrapper, [new File(['hello'], 'note.txt', { type: 'text/plain' })])
    expect(requests).toHaveLength(1)
    expect(requests[0].file.status).toBe('uploading')

    requests[0].onProgress(50)
    await nextTick()
    expect(wrapper.text()).toContain('50%')
    expect(wrapper.emitted('progress')).toHaveLength(1)

    requests[0].onSuccess({ ok: true })
    await nextTick()
    expect(wrapper.get('.vk-upload__item').classes()).toContain('vk-upload__item--success')
    expect(wrapper.emitted('success')).toHaveLength(1)
  })

  it('retries a failed upload from the file row', async () => {
    let attempt = 0
    const wrapper = mount(VkUpload, {
      props: {
        customRequest: (options: UploadRequestOptions) => {
          attempt += 1
          if (attempt === 1) options.onError(new Error('network'))
          else options.onSuccess()
        },
      },
    })

    await chooseFiles(wrapper, [new File(['hello'], 'note.txt', { type: 'text/plain' })])
    expect(wrapper.get('.vk-upload__item').classes()).toContain('vk-upload__item--error')
    expect(wrapper.emitted('error')).toHaveLength(1)

    await wrapper.get('.vk-upload__actions button[aria-label="重新上传"]').trigger('click')
    await nextTick()
    expect(attempt).toBe(2)
    expect(wrapper.emitted('success')).toHaveLength(1)
  })
})

const transferOptions: TransferOption[] = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma', disabled: true },
  { value: 'd', label: 'Delta' },
]

describe('VkTransfer', () => {
  it('renders both panes from the controlled value', () => {
    const wrapper = mount(VkTransfer, {
      props: { options: transferOptions, modelValue: ['b'] },
    })

    const panels = wrapper.findAll('.vk-transfer__panel')
    expect(panels).toHaveLength(2)
    expect(panels[0].text()).toContain('Alpha')
    expect(panels[0].text()).not.toContain('Beta')
    expect(panels[1].text()).toContain('Beta')
  })

  it('moves an option to the other pane and emits change', async () => {
    const wrapper = mount(VkTransfer, {
      props: { options: transferOptions, modelValue: ['b'] },
    })

    const leftPanel = wrapper.findAll('.vk-transfer__panel')[0]
    const alpha = leftPanel
      .findAll('.vk-transfer__item')
      .find((item) => item.text().includes('Alpha'))
    await alpha!.get('input[type="checkbox"]').setValue(true)

    expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual(['b', 'a'])
    expect(wrapper.emitted('change')?.[0]).toEqual([['b', 'a'], 'right', ['a']])
  })

  it('filters by keyword and selects all visible enabled options', async () => {
    const wrapper = mount(VkTransfer, {
      props: { options: transferOptions, modelValue: [] },
    })

    await wrapper.get('.vk-transfer__search').setValue('alp')
    expect(wrapper.findAll('.vk-transfer__panel')[0].findAll('.vk-transfer__item')).toHaveLength(1)

    await wrapper.get('.vk-transfer__search').setValue('')
    const selectAll = wrapper.get('.vk-transfer__panel input[aria-label="全选"]')
    await selectAll.setValue(true)

    expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual(['a', 'b', 'd'])
  })

  it('keeps disabled options in place', async () => {
    const wrapper = mount(VkTransfer, {
      props: { options: transferOptions, modelValue: [] },
    })

    const gamma = wrapper
      .findAll('.vk-transfer__item')
      .find((item) => item.text().includes('Gamma'))
    expect(gamma!.get('input[type="checkbox"]').attributes('disabled')).toBeDefined()
  })
})

const treeData: TreeNode[] = [
  {
    key: 'a',
    label: '设计中心',
    children: [
      { key: 'a1', label: '界面组' },
      { key: 'a2', label: '品牌组' },
    ],
  },
  { key: 'b', label: '研发中心' },
]

describe('VkTree', () => {
  it('renders levels, expanded state and selection', async () => {
    const wrapper = mount(VkTree, {
      props: {
        data: treeData,
        defaultExpandedKeys: ['a'],
        defaultSelectedKeys: ['b'],
        ariaLabel: '组织结构',
      },
      attachTo: document.body,
    })

    const root = wrapper.get('[role="tree"]')
    expect(root.attributes('aria-label')).toBe('组织结构')

    const parent = wrapper.get('[data-tree-key="a"]')
    expect(parent.attributes('aria-level')).toBe('1')
    expect(parent.attributes('aria-expanded')).toBe('true')
    expect(wrapper.get('[data-tree-key="b"]').attributes('aria-selected')).toBe('true')

    await wrapper.get('[data-tree-key="b"] .vk-tree__label').trigger('click')
    expect(wrapper.emitted('update:selectedKeys')?.[0]?.[0]).toEqual(['b'])
  })

  it('cascades checks and exposes half checked keys', async () => {
    const wrapper = mount(VkTree, {
      props: { data: treeData, defaultExpandedKeys: ['a'], checkable: true },
      attachTo: document.body,
    })

    await wrapper.get('[data-tree-key="a1"] .vk-tree__checkbox').trigger('click')
    expect(wrapper.emitted('update:checkedKeys')?.[0]?.[0]).toEqual(['a1'])

    const vm = wrapper.vm as unknown as { getHalfCheckedKeys: () => unknown[] }
    expect(vm.getHalfCheckedKeys()).toEqual(['a'])
    expect(wrapper.get('[data-tree-key="a"] .vk-tree__checkbox').classes()).toContain(
      'vk-tree__checkbox--half',
    )

    await wrapper.get('[data-tree-key="a"] .vk-tree__checkbox').trigger('click')
    expect((wrapper.emitted('update:checkedKeys')?.[1]?.[0] as unknown[]).slice().sort()).toEqual([
      'a',
      'a1',
      'a2',
    ])
  })

  it('moves focus with keyboard arrows', async () => {
    const wrapper = mount(VkTree, {
      props: { data: treeData, defaultExpandedKeys: ['a'] },
      attachTo: document.body,
    })

    await wrapper.get('[data-tree-key="a"]').trigger('keydown', { key: 'ArrowDown' })
    await nextTick()
    expect(wrapper.get('[data-tree-key="a1"]').attributes('tabindex')).toBe('0')

    await wrapper.get('[data-tree-key="a1"]').trigger('keydown', { key: 'ArrowDown' })
    await nextTick()
    expect(wrapper.get('[data-tree-key="a2"]').attributes('tabindex')).toBe('0')
  })

  it('loads children asynchronously and emits load', async () => {
    const wrapper = mount(VkTree, {
      props: {
        data: [{ key: 'async', label: '异步节点' }],
        loadData: () => Promise.resolve([{ key: 'async-1', label: '子节点' }]),
        ariaLabel: '异步树',
      },
      attachTo: document.body,
    })

    await wrapper.get('[data-tree-key="async"] .vk-tree__arrow').trigger('click')
    await flushPromises()
    await nextTick()

    expect(wrapper.text()).toContain('子节点')
    expect(wrapper.emitted('load')).toHaveLength(1)
  })
})

const cascaderOptions: CascaderOption[] = [
  {
    value: 'zj',
    label: '浙江省',
    children: [
      {
        value: 'hz',
        label: '杭州市',
        children: [
          { value: 'xh', label: '西湖区' },
          { value: 'yh', label: '余杭区' },
        ],
      },
    ],
  },
  { value: 'js', label: '江苏省' },
]

function findOption(text: string): HTMLElement | undefined {
  return Array.from(document.querySelectorAll<HTMLElement>('.vk-cascader__option')).find(
    (element) => element.textContent?.trim() === text,
  )
}

describe('VkCascader', () => {
  it('renders the selected path', () => {
    const wrapper = mount(VkCascader, {
      props: { options: cascaderOptions, modelValue: ['zj', 'hz', 'xh'] },
    })
    expect(wrapper.text()).toContain('浙江省 / 杭州市 / 西湖区')
  })

  it('opens columns and selects a leaf path', async () => {
    const wrapper = mount(VkCascader, { props: { options: cascaderOptions } })
    await wrapper.get('.vk-cascader__trigger').trigger('click')
    await nextTick()

    expect(wrapper.get('.vk-cascader__trigger').attributes('aria-expanded')).toBe('true')
    expect(document.querySelectorAll('.vk-cascader__column')).toHaveLength(1)

    findOption('浙江省')?.click()
    await nextTick()
    expect(document.querySelectorAll('.vk-cascader__column')).toHaveLength(2)

    findOption('杭州市')?.click()
    await nextTick()
    expect(document.querySelectorAll('.vk-cascader__column')).toHaveLength(3)

    findOption('西湖区')?.click()
    await nextTick()
    expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual(['zj', 'hz', 'xh'])
    expect(wrapper.get('.vk-cascader__trigger').attributes('aria-expanded')).toBe('false')
  })

  it('selects any level when changeOnSelect is on', async () => {
    const wrapper = mount(VkCascader, {
      props: { options: cascaderOptions, changeOnSelect: true },
    })
    await wrapper.get('.vk-cascader__trigger').trigger('click')
    await nextTick()

    findOption('浙江省')?.click()
    await nextTick()

    expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual(['zj'])
    expect(wrapper.emitted('change')?.[0]?.[1]).toEqual([cascaderOptions[0]])
  })

  it('shows an empty state and supports keyboard navigation', async () => {
    const empty = mount(VkCascader, { props: { options: [] } })
    await empty.get('.vk-cascader__trigger').trigger('click')
    await nextTick()
    expect(document.body.textContent).toContain('暂无选项')

    document.body.innerHTML = ''
    const wrapper = mount(VkCascader, { props: { options: cascaderOptions } })
    await wrapper.get('.vk-cascader__trigger').trigger('keydown', { key: 'ArrowDown' })
    await nextTick()
    expect(document.querySelectorAll('.vk-cascader__column')).toHaveLength(1)

    await wrapper.get('.vk-cascader__trigger').trigger('keydown', { key: 'Enter' })
    await nextTick()
    expect(document.querySelectorAll('.vk-cascader__column')).toHaveLength(2)

    await wrapper.get('.vk-cascader__trigger').trigger('keydown', { key: 'Escape' })
    await nextTick()
    expect(wrapper.get('.vk-cascader__trigger').attributes('aria-expanded')).toBe('false')
  })
})
