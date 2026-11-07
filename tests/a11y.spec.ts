import axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import { VkAffix } from '@/components/affix'
import { VkAlert } from '@/components/alert'
import { VkAnchor } from '@/components/anchor'
import { VkAvatar } from '@/components/avatar'
import { VkBadge } from '@/components/badge'
import { VkBreadcrumb } from '@/components/breadcrumb'
import { VkButton } from '@/components/button'
import { VkCard } from '@/components/card'
import { VkCascader } from '@/components/cascader'
import { VkCheckbox } from '@/components/checkbox'
import { VkCollapse, VkCollapseItem } from '@/components/collapse'
import { VkCountdown } from '@/components/countdown'
import { VkDescriptions } from '@/components/descriptions'
import { VkDivider } from '@/components/divider'
import { VkDrawer } from '@/components/drawer'
import { VkFlex } from '@/components/flex'
import { VkImage } from '@/components/image'
import { VkInput } from '@/components/input'
import { VkLayout, VkLayoutContent, VkLayoutHeader } from '@/components/layout'
import { VkList } from '@/components/list'
import { VkPageHeader } from '@/components/page-header'
import { VkPagination } from '@/components/pagination'
import { VkQrCode } from '@/components/qr-code'
import { VkRate } from '@/components/rate'
import { VkResult } from '@/components/result'
import { VkScrollbar } from '@/components/scrollbar'
import { VkSelect } from '@/components/select'
import { VkStatistic } from '@/components/statistic'
import { VkSteps } from '@/components/steps'
import { VkTable } from '@/components/table'
import { VkTag } from '@/components/tag'
import { VkTabs } from '@/components/tabs'
import { VkTimeline } from '@/components/timeline'
import { VkTransfer } from '@/components/transfer'
import { VkTree } from '@/components/tree'
import { VkTitle, VkTypography } from '@/components/typography'
import { VkUpload } from '@/components/upload'

async function expectNoViolations(element: Element): Promise<void> {
  const result = await axe.run(element, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] },
    rules: {
      // jsdom 没有布局与画布，无法计算对比度；对比度由令牌脚本单独校验。
      'color-contrast': { enabled: false },
      region: { enabled: false },
    },
  })
  const serious = result.violations.filter(
    (violation) => violation.impact === 'serious' || violation.impact === 'critical',
  )
  expect(
    serious.map((violation) => `${violation.id}: ${violation.help}`),
    JSON.stringify(result.violations, null, 2),
  ).toEqual([])
}

describe('a11y (axe)', () => {
  it('button, alert and input have no serious violations', async () => {
    const wrapper = mount(
      {
        render: () =>
          h('main', [
            h(VkButton, { type: 'primary' }, () => '保存'),
            h(VkAlert, { type: 'error', title: '保存失败', description: '请重试' }),
            h('label', { for: 'email' }, '邮箱'),
            h(VkInput, { id: 'email', modelValue: '' }),
          ]),
      },
      { attachTo: document.body },
    )
    await nextTick()
    await expectNoViolations(wrapper.element)
    wrapper.unmount()
  })

  it('form controls keep programmatic labels', async () => {
    const wrapper = mount(
      {
        render: () =>
          h('main', [
            h(VkCheckbox, { modelValue: true, label: '保持登录' }),
            h(VkSelect, {
              options: [{ label: '杭州', value: 'hz' }],
              ariaLabel: '城市',
              modelValue: 'hz',
            }),
          ]),
      },
      { attachTo: document.body },
    )
    await nextTick()
    await expectNoViolations(wrapper.element)
    wrapper.unmount()
  })

  it('tabs, table and pagination expose correct semantics', async () => {
    const wrapper = mount(
      {
        render: () =>
          h('main', [
            h(VkTabs, {
              items: [
                { key: 'a', label: '概览' },
                { key: 'b', label: '设置' },
              ],
              modelValue: 'a',
              ariaLabel: '视图',
            }),
            h(VkTable, {
              columns: [{ key: 'name', title: '名称' }],
              data: [{ name: '项目 A' }],
              ariaLabel: '项目列表',
            }),
            h(VkPagination, { total: 50, pageSize: 10, current: 1, ariaLabel: '分页' }),
          ]),
      },
      { attachTo: document.body },
    )
    await nextTick()
    await expectNoViolations(wrapper.element)
    wrapper.unmount()
  })

  it('typography, tag, avatar, card and divider keep their semantics', async () => {
    const wrapper = mount(
      {
        render: () =>
          h('main', [
            h(VkTitle, { level: 2 }, () => '团队'),
            h(VkTypography, { tag: 'p', type: 'secondary' }, () => '本周更新说明'),
            h(VkTag, { type: 'success', closable: true }, () => '已同步'),
            h(VkAvatar, { alt: '林晚' }),
            h(VkDivider, null, () => '更多'),
            h(VkCard, { title: '项目概览' }, () => '卡片内容'),
          ]),
      },
      { attachTo: document.body },
    )
    await nextTick()
    await expectNoViolations(wrapper.element)
    wrapper.unmount()
  })

  it('badge, descriptions, steps and result keep their semantics', async () => {
    const wrapper = mount(
      {
        render: () =>
          h('main', [
            h(VkBadge, { value: 3 }, () => h(VkButton, null, () => '通知')),
            h(VkDescriptions, {
              items: [
                { key: 'name', label: '项目', value: 'VaKao UI' },
                { key: 'version', label: '版本', value: '0.1.0' },
              ],
            }),
            h(VkSteps, {
              items: [{ title: '草稿' }, { title: '发布' }],
              current: 1,
            }),
            h(VkResult, { status: 'success', title: '已发布' }),
          ]),
      },
      { attachTo: document.body },
    )
    await nextTick()
    await expectNoViolations(wrapper.element)
    wrapper.unmount()
  })

  it('layout, breadcrumb, collapse and rate expose valid semantics', async () => {
    const wrapper = mount(
      {
        render: () =>
          h(VkLayout, null, () => [
            h(VkLayoutHeader, null, () =>
              h(VkBreadcrumb, {
                items: [{ label: '首页', href: '/' }, { label: '组件' }],
              }),
            ),
            h(VkLayoutContent, null, () => [
              h(VkCollapse, { modelValue: ['a'] }, () => [
                h(VkCollapseItem, { name: 'a', title: '说明' }, () => '内容'),
              ]),
              h(VkRate, { modelValue: 3 }),
            ]),
          ]),
      },
      { attachTo: document.body },
    )
    await nextTick()
    await expectNoViolations(wrapper.element)
    wrapper.unmount()
  })

  it('flex, list, timeline and statistic keep valid semantics', async () => {
    const wrapper = mount(
      {
        render: () =>
          h('main', [
            h(VkFlex, { justify: 'space-between', gap: 12 }, () => [
              h(VkStatistic, { label: '营收', value: 12800, precision: 2, prefix: '¥' }),
              h(VkTag, null, () => '本月'),
            ]),
            h(VkList, {
              bordered: true,
              items: [
                { title: '林晚', description: '设计', extra: '在线' },
                { title: '周野', description: '前端', extra: '离线' },
              ],
            }),
            h(VkTimeline, {
              items: [
                { title: '提交', time: '09:00', type: 'success' },
                { title: '审核中', content: '等待负责人确认' },
              ],
            }),
          ]),
      },
      { attachTo: document.body },
    )
    await nextTick()
    await expectNoViolations(wrapper.element)
    wrapper.unmount()
  })

  it('drawer exposes a labelled modal dialog', async () => {
    const wrapper = mount(VkDrawer, {
      props: { open: true, title: '筛选条件' },
      slots: { default: () => h('p', null, '抽屉内容') },
      attachTo: document.body,
    })
    await nextTick()
    await expectNoViolations(document.body)
    wrapper.unmount()
  })

  it('image, page header, anchor and affix keep valid semantics', async () => {
    const wrapper = mount(
      {
        render: () =>
          h('main', [
            h(
              VkPageHeader,
              { title: '成员管理', subtitle: '共 12 人' },
              { extra: () => h(VkButton, { type: 'primary' }, () => '新增') },
            ),
            h(VkAffix, { offsetTop: 8 }, () => h(VkButton, null, () => '固钉')),
            h(VkAnchor, {
              items: [
                { key: 'a', href: '#a11y-a', title: '第一节' },
                { key: 'b', href: '#a11y-b', title: '第二节' },
              ],
            }),
            h(VkImage, { src: '/a.png', alt: '示例图片', width: 160, height: 100 }),
          ]),
      },
      { attachTo: document.body },
    )
    await nextTick()
    await expectNoViolations(wrapper.element)
    wrapper.unmount()
  })

  it('image preview keeps a labelled modal dialog', async () => {
    const wrapper = mount(VkImage, {
      props: { src: '/a.png', alt: '示例图片', preview: true },
      attachTo: document.body,
    })
    await wrapper.get('.vk-image').trigger('click')
    await nextTick()

    expect(document.querySelector('.vk-image-preview')?.getAttribute('aria-label')).toBe('示例图片')
    await expectNoViolations(document.body)
    wrapper.unmount()
  })

  it('scrollbar, countdown and qr code keep valid semantics', async () => {
    const wrapper = mount(
      {
        render: () =>
          h('main', [
            h(VkScrollbar, { ariaLabel: '更新日志' }, () => h('p', null, '日志内容')),
            h(VkCountdown, { duration: 1000, ariaLabel: '剩余时间' }),
            h(VkQrCode, { value: 'https://ui.woyuxiaji.cn/', size: 120 }),
          ]),
      },
      { attachTo: document.body },
    )
    await nextTick()
    await expectNoViolations(wrapper.element)
    wrapper.unmount()
  })

  it('cascader, tree, transfer and upload keep valid semantics', async () => {
    const wrapper = mount(
      {
        render: () =>
          h('main', [
            h(VkCascader, {
              options: [{ value: 'a', label: 'A' }],
              ariaLabel: '地区',
            }),
            h(VkTree, {
              data: [{ key: 'a', label: '节点 A' }],
              ariaLabel: '组织',
              checkable: true,
            }),
            h(VkTransfer, {
              options: [{ value: 'a', label: 'Alpha' }],
              modelValue: [],
              ariaLabel: '成员',
            }),
            h(VkUpload, { ariaLabel: '上传附件' }),
          ]),
      },
      { attachTo: document.body },
    )
    await nextTick()
    await expectNoViolations(wrapper.element)
    wrapper.unmount()
  })
})
