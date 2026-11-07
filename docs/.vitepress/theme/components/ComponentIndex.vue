<script setup lang="ts">
interface Entry {
  name: string
  desc: string
}

const groups: Entry[][] = [
  [
    { name: 'Button', desc: '按钮' },
    { name: 'Input', desc: '输入框' },
    { name: 'InputNumber', desc: '数字输入' },
    { name: 'Select', desc: '选择器' },
    { name: 'Checkbox', desc: '复选框' },
    { name: 'Radio', desc: '单选框' },
    { name: 'Switch', desc: '开关' },
    { name: 'Slider', desc: '滑动条' },
    { name: 'Form', desc: '表单与校验' },
  ],
  [
    { name: 'Table', desc: '表格' },
    { name: 'Pagination', desc: '分页' },
    { name: 'Tabs', desc: '标签页' },
    { name: 'Menu', desc: '菜单' },
    { name: 'Grid', desc: '栅格与布局' },
    { name: 'Dropdown', desc: '下拉菜单' },
    { name: 'Popover', desc: '气泡卡片' },
    { name: 'Popconfirm', desc: '气泡确认' },
    { name: 'Modal', desc: '对话框' },
  ],
  [
    { name: 'Alert', desc: '提示' },
    { name: 'Progress', desc: '进度条' },
    { name: 'Spin', desc: '加载中' },
    { name: 'Skeleton', desc: '骨架屏' },
    { name: 'Empty', desc: '空状态' },
    { name: 'ConfigProvider', desc: '全局配置' },
  ],
]

const slug = (name: string): string =>
  name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
</script>

<template>
  <div class="vk-index-groups">
    <div v-for="(group, index) in groups" :key="index" class="vk-index">
      <a
        v-for="item in group"
        :key="item.name"
        class="vk-index__item"
        :href="`/components/${slug(item.name)}`"
      >
        <span class="vk-index__name">{{ item.name }}</span>
        <span class="vk-index__desc">{{ item.desc }}</span>
      </a>
    </div>
  </div>
</template>

<style>
.vk-index-groups {
  display: grid;
  gap: 24px;
}
</style>
