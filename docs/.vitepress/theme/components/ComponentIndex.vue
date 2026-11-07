<script setup lang="ts">
import { withBase } from 'vitepress'

interface Entry {
  name: string
  desc: string
}

interface Group {
  title: string
  items: Entry[]
}

const groups: Group[] = [
  {
    title: '表单与输入',
    items: [
      { name: 'Button', desc: '按钮' },
      { name: 'Input', desc: '输入框' },
      { name: 'InputNumber', desc: '数字输入' },
      { name: 'Select', desc: '选择器' },
      { name: 'Cascader', desc: '级联选择' },
      { name: 'Transfer', desc: '穿梭框' },
      { name: 'Upload', desc: '文件上传' },
      { name: 'Checkbox', desc: '复选框' },
      { name: 'Radio', desc: '单选框' },
      { name: 'Switch', desc: '开关' },
      { name: 'Slider', desc: '滑动条' },
      { name: 'Form', desc: '表单与校验' },
    ],
  },
  {
    title: '数据展示',
    items: [
      { name: 'Table', desc: '表格' },
      { name: 'Tree', desc: '树形控件' },
      { name: 'Pagination', desc: '分页' },
      { name: 'Tabs', desc: '标签页' },
      { name: 'Menu', desc: '菜单' },
      { name: 'Grid', desc: '栅格与布局' },
      { name: 'Badge', desc: '徽标' },
      { name: 'Descriptions', desc: '描述列表' },
      { name: 'Steps', desc: '步骤条' },
      { name: 'Timeline', desc: '时间线' },
      { name: 'Statistic', desc: '统计数值' },
      { name: 'List', desc: '列表' },
      { name: 'Image', desc: '图片' },
      { name: 'Watermark', desc: '水印' },
      { name: 'Countdown', desc: '倒计时' },
      { name: 'QrCode', desc: '二维码' },
      { name: 'Tooltip', desc: '文字提示' },
      { name: 'Dropdown', desc: '下拉菜单' },
      { name: 'Popover', desc: '气泡卡片' },
      { name: 'Popconfirm', desc: '气泡确认' },
      { name: 'Modal', desc: '对话框' },
      { name: 'Drawer', desc: '抽屉' },
    ],
  },
  {
    title: '反馈与状态',
    items: [
      { name: 'Alert', desc: '提示' },
      { name: 'Progress', desc: '进度条' },
      { name: 'Spin', desc: '加载中' },
      { name: 'Skeleton', desc: '骨架屏' },
      { name: 'Empty', desc: '空状态' },
      { name: 'Result', desc: '结果页' },
      { name: 'ConfigProvider', desc: '全局配置' },
    ],
  },
  {
    title: '布局与通用',
    items: [
      { name: 'Typography', desc: '排版' },
      { name: 'Divider', desc: '分割线' },
      { name: 'Card', desc: '卡片' },
      { name: 'Tag', desc: '标签' },
      { name: 'Avatar', desc: '头像' },
      { name: 'Layout', desc: '布局' },
      { name: 'Flex', desc: '弹性布局' },
      { name: 'Affix', desc: '固钉' },
      { name: 'Anchor', desc: '锚点' },
      { name: 'PageHeader', desc: '页头' },
      { name: 'Breadcrumb', desc: '面包屑' },
      { name: 'Collapse', desc: '折叠面板' },
      { name: 'Rate', desc: '评分' },
      { name: 'BackTop', desc: '回到顶部' },
      { name: 'Scrollbar', desc: '滚动条' },
    ],
  },
]

const slug = (name: string): string =>
  name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
</script>

<template>
  <div class="vk-index-groups">
    <section v-for="group in groups" :key="group.title" class="vk-index">
      <header class="vk-index__head">
        <span class="vk-index__label">{{ group.title }}</span>
        <span class="vk-index__count">{{ group.items.length }}</span>
      </header>
      <div class="vk-index__grid">
        <a
          v-for="item in group.items"
          :key="item.name"
          class="vk-index__item"
          :href="withBase(`/components/${slug(item.name)}`)"
        >
          <span class="vk-index__name">{{ item.name }}</span>
          <span class="vk-index__desc">{{ item.desc }}</span>
        </a>
      </div>
    </section>
  </div>
</template>
