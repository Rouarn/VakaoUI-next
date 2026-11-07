import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'VaKao UI',
  description: 'VaKao 品牌的 Vue 3 组件库：纸面、墨色与四色星。',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'theme-color', content: '#C43A21' }],
  ],
  markdown: {
    theme: 'vitesse-dark',
  },
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '指南', link: '/guide/getting-started', activeMatch: '/guide/' },
      { text: '组件', link: '/components/', activeMatch: '/components/' },
      { text: '设计', link: '/design/tokens', activeMatch: '/design/' },
      { text: '示例', link: '/examples/', activeMatch: '/examples/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '开始',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '主题定制', link: '/guide/theming' },
            { text: '暗色模式', link: '/guide/dark-mode' },
            { text: '可访问性', link: '/guide/accessibility' },
          ],
        },
        {
          text: '项目',
          items: [
            { text: '组件状态', link: '/guide/components-status' },
            { text: 'Roadmap', link: '/guide/roadmap' },
            { text: '常见问题', link: '/guide/faq' },
          ],
        },
      ],
      '/components/': [
        {
          text: '概览',
          items: [{ text: '组件总览', link: '/components/' }],
        },
        {
          text: '通用',
          items: [
            { text: 'ConfigProvider 全局配置', link: '/components/config-provider' },
            { text: 'Button 按钮', link: '/components/button' },
          ],
        },
        {
          text: '表单',
          items: [
            { text: 'Form 表单', link: '/components/form' },
            { text: 'Input 输入框', link: '/components/input' },
            { text: 'InputNumber 数字输入框', link: '/components/input-number' },
            { text: 'Select 选择器', link: '/components/select' },
            { text: 'Switch 开关', link: '/components/switch' },
            { text: 'Checkbox 复选框', link: '/components/checkbox' },
            { text: 'Radio 单选框', link: '/components/radio' },
            { text: 'Slider 滑动条', link: '/components/slider' },
          ],
        },
        {
          text: '数据展示',
          items: [
            { text: 'Table 表格', link: '/components/table' },
            { text: 'Pagination 分页', link: '/components/pagination' },
            { text: 'Tabs 标签页', link: '/components/tabs' },
            { text: 'Menu 菜单', link: '/components/menu' },
            { text: 'Grid 栅格', link: '/components/grid' },
          ],
        },
        {
          text: '反馈',
          items: [
            { text: 'Alert 提示', link: '/components/alert' },
            { text: 'Progress 进度条', link: '/components/progress' },
            { text: 'Spin 加载', link: '/components/spin' },
            { text: 'Skeleton 骨架屏', link: '/components/skeleton' },
            { text: 'Empty 空状态', link: '/components/empty' },
          ],
        },
        {
          text: '浮层',
          items: [
            { text: 'Modal 对话框', link: '/components/modal' },
            { text: 'Popover 气泡卡片', link: '/components/popover' },
            { text: 'Popconfirm 气泡确认', link: '/components/popconfirm' },
            { text: 'Dropdown 下拉菜单', link: '/components/dropdown' },
          ],
        },
      ],
      '/design/': [
        {
          text: '设计',
          items: [
            { text: '设计令牌', link: '/design/tokens' },
            { text: '状态色与对比度', link: '/design/status-colors' },
          ],
        },
      ],
      '/examples/': [
        {
          text: '示例',
          items: [
            { text: '示例站', link: '/examples/' },
            { text: '登录表单', link: '/examples/login' },
            { text: '数据列表', link: '/examples/data-table' },
            { text: '设置页', link: '/examples/settings' },
          ],
        },
      ],
    },
    socialLinks: [],
    search: { provider: 'local' },
    footer: {
      message: '纸面、墨色与四色星 · 全部组件只消费 --vk-* 令牌',
      copyright: 'VaKao UI · MIT',
    },
    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一页', next: '下一页' },
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色',
    darkModeSwitchTitle: '切换到深色',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
  },
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src', import.meta.url)),
      },
    },
  },
})
