# @vakao/ui

## 0.2.0

### Minor Changes

- 视觉系统重做：强调色由灰蓝改为朱砂，重定字号阶梯、间距节奏、圆角与边框。
  
  - 强调色：`#0B6F86`（更早为 `#46A6C6`）→ 亮色 `#C43A21`、暗色 `#FF8A5B`。纸面 `#F3F1EC` 上文字对比度 4.68:1，主按钮白字 5.03:1，暗色下 8.07:1。
  - 修复 `--vk-space-3`、`--vk-text-color-1`、`--vk-shadow-1` 等令牌从未生成的命名错位（此前组件读到空值，导致内边距与文字颜色失效）。**破坏性**：不再提供错误的 `--vk-space3` / `--vk-text-color1` 形式。
  - 字号阶梯改为 12 / 13 / 14 / 16 / 20 / 24 / 30 / 38 / 48，行高 1.5 / 1.35 / 1.15；间距统一到 4px 栅格（4–96）。
  - 圆角统一为 6 / 10 / 14 / 20 / 999；阴影只保留两层浮层阴影。
  - 状态色仍按四色星映射（success 黄、warning 橙、error 紫、info 蓝），暗色下重新取值。
  - 按钮禁用态由 `opacity: .5` 改为中性填充 + 禁用文字色；焦点环统一为 2px 实色。
  - 文档站重写导航、侧边栏、正文排版、示例容器（预览 + 代码）、提示块、表格、代码高亮与上下页；示例站三个场景页重做为真实产品界面。

## 0.1.0

### Minor Changes

- 首个公开版本 0.1.0。
  
  - 28 个组件导出：ConfigProvider、Button、Grid、Form / FormItem、Input、InputNumber、Select、Switch、Checkbox、Radio / RadioGroup、Slider、Alert、Progress、Spin、Skeleton、Empty、Modal、Popover、Popconfirm、Dropdown、Tabs、Menu、Pagination、Table
  - `--vk-*` 令牌体系与亮 / 暗 / auto 主题，ConfigProvider 支持 themeOverrides 与 locale
  - ESM-only 多入口产物、类型声明、单组件样式与 unplugin resolver
  - VitePress 文档站与示例站、自动 API 表
  - 工程门禁、覆盖率门槛、axe 可访问性检查、SSR 冒烟、快照回归与体积预算
