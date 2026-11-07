import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitepress'

/** 预览构建：VK_DOCS_BASE=/preview/ 时输出到子路径，主站保持 `/`。 */
const base = process.env.VK_DOCS_BASE ?? '/'

export default defineConfig({
  lang: 'zh-CN',
  title: 'VaKao UI',
  description: 'VaKao 品牌的 Vue 3 组件库：纸面、墨色与四色星。',
  base,
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', href: `${base}favicon.svg`, type: 'image/svg+xml' }],
    ['link', { rel: 'alternate icon', href: `${base}favicon.ico`, sizes: '32x32' }],
    ['meta', { name: 'theme-color', content: '#C43A21' }],
  ],
  markdown: {
    theme: { light: 'github-light', dark: 'github-dark' },
  },
  themeConfig: {
    logo: {
      light: '/logo-light.png',
      dark: '/logo-dark.png',
      alt: 'VaKao UI',
    },
    siteTitle: false,
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
            { text: 'Typography 排版', link: '/components/typography' },
            { text: 'Divider 分割线', link: '/components/divider' },
            { text: 'Card 卡片', link: '/components/card' },
          ],
        },
        {
          text: '表单',
          items: [
            { text: 'Form 表单', link: '/components/form' },
            { text: 'Input 输入框', link: '/components/input' },
            { text: 'InputNumber 数字输入框', link: '/components/input-number' },
            { text: 'Select 选择器', link: '/components/select' },
            { text: 'Cascader 级联选择', link: '/components/cascader' },
            { text: 'Transfer 穿梭框', link: '/components/transfer' },
            { text: 'Upload 文件上传', link: '/components/upload' },
            { text: 'Switch 开关', link: '/components/switch' },
            { text: 'Checkbox 复选框', link: '/components/checkbox' },
            { text: 'Radio 单选框', link: '/components/radio' },
            { text: 'Slider 滑动条', link: '/components/slider' },
            { text: 'Rate 评分', link: '/components/rate' },
          ],
        },
        {
          text: '布局与导航',
          items: [
            { text: 'Layout 布局', link: '/components/layout' },
            { text: 'Flex 弹性布局', link: '/components/flex' },
            { text: 'Affix 固钉', link: '/components/affix' },
            { text: 'Anchor 锚点', link: '/components/anchor' },
            { text: 'PageHeader 页头', link: '/components/page-header' },
            { text: 'Breadcrumb 面包屑', link: '/components/breadcrumb' },
            { text: 'Collapse 折叠面板', link: '/components/collapse' },
            { text: 'BackTop 回到顶部', link: '/components/back-top' },
            { text: 'Scrollbar 滚动条', link: '/components/scrollbar' },
          ],
        },
        {
          text: '数据展示',
          items: [
            { text: 'Table 表格', link: '/components/table' },
            { text: 'Tree 树形控件', link: '/components/tree' },
            { text: 'List 列表', link: '/components/list' },
            { text: 'Pagination 分页', link: '/components/pagination' },
            { text: 'Tabs 标签页', link: '/components/tabs' },
            { text: 'Menu 菜单', link: '/components/menu' },
            { text: 'Grid 栅格', link: '/components/grid' },
            { text: 'Avatar 头像', link: '/components/avatar' },
            { text: 'Tag 标签', link: '/components/tag' },
            { text: 'Badge 徽标', link: '/components/badge' },
            { text: 'Descriptions 描述列表', link: '/components/descriptions' },
            { text: 'Steps 步骤条', link: '/components/steps' },
            { text: 'Timeline 时间线', link: '/components/timeline' },
            { text: 'Statistic 统计数值', link: '/components/statistic' },
            { text: 'Image 图片', link: '/components/image' },
            { text: 'Watermark 水印', link: '/components/watermark' },
            { text: 'Countdown 倒计时', link: '/components/countdown' },
            { text: 'QrCode 二维码', link: '/components/qr-code' },
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
            { text: 'Result 结果页', link: '/components/result' },
          ],
        },
        {
          text: '浮层',
          items: [
            { text: 'Modal 对话框', link: '/components/modal' },
            { text: 'Drawer 抽屉', link: '/components/drawer' },
            { text: 'Popover 气泡卡片', link: '/components/popover' },
            { text: 'Popconfirm 气泡确认', link: '/components/popconfirm' },
            { text: 'Dropdown 下拉菜单', link: '/components/dropdown' },
            { text: 'Tooltip 文字提示', link: '/components/tooltip' },
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
      message: '纸面、墨色与四色星，全部组件只消费 --vk-* 令牌',
      copyright: 'VaKao UI，MIT 许可',
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
