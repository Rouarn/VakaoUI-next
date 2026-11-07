# VaKao UI

VaKao 团队的 Vue 3 组件库。基于纸面 / 墨色 / 四芒星四色的品牌令牌，`Vk` 前缀，`vk-` 样式命名空间，单包发布到云效私有制品仓库。

## 状态

`0.1.0` 已发布，69 个组件入口可用。视觉系统在这一版整体重做（强调色改为朱砂、重定字号 / 间距 / 圆角 / 边框），变更说明见 [视觉变更说明](VISUAL-REVISION.md)。覆盖：

- **基础**：ConfigProvider、Button、Typography、Divider、Card、Tag、Avatar、Badge、Grid（Row / Col / Space）
- **布局与导航**：Layout（Header / Sider / Content / Footer）、Flex、Affix、Anchor、PageHeader、Breadcrumb、Collapse、BackTop、Scrollbar、Tabs、Menu、Pagination
- **表单**：Form / FormItem、Input、InputNumber、Select、Cascader、Transfer、Upload、Switch、Checkbox、Radio / RadioGroup、Slider、Rate
- **反馈**：Alert、Progress、Spin、Skeleton、Empty
- **浮层**：Modal、Drawer、Popover、Popconfirm、Dropdown、Tooltip
- **数据**：Table、Tree、List、Timeline、Statistic、Image、Watermark、Countdown、QrCode、Descriptions、Steps

全部组件满足：只消费 `--vk-*` 令牌、无全局副作用、键盘与 ARIA 约定、单测、可交互示例与自动 API 表。完整完成度与已知限制见 [组件状态](docs/guide/components-status.md)。

配套能力：

- 文档站与示例站（VitePress，示例与渲染同源，API 表由 `vue-component-meta` 生成）
- 工程门禁：ESLint / Prettier / vue-tsc / Vitest + 覆盖率门槛 / 构建 / 体积预算
- 质量观测：axe 可访问性检查、SSR 冒烟、快照回归
- 发布：Changesets、commitlint、husky、预发布通道与回滚说明
- 组件路线与开发规范见 [开发流程](docs/DEVELOPMENT.md)，令牌依据见 [设计令牌](docs/DESIGN-TOKENS.md)

## 文档与示例

```bash
pnpm docs:dev      # 本地文档站 + 示例站
pnpm docs:build    # 静态产物：docs/.vitepress/dist
pnpm docs:preview  # 预览构建结果
```

## 使用

```bash
pnpm add @vakao/ui
```

全局注册：

```ts
import { createApp } from 'vue'
import VaKaoUI from '@vakao/ui'
import '@vakao/ui/theme.css'
import '@vakao/ui/styles.css'
import App from './App.vue'

createApp(App).use(VaKaoUI).mount('#app')
```

按需引入：

```ts
import { VkButton } from '@vakao/ui/button'
import '@vakao/ui/button/style.css'
import '@vakao/ui/theme.css' // 全局主题变量，或改用 VkConfigProvider
```

自动导入：

```ts
import Components from 'unplugin-vue-components/vite'
import { VakaoUiResolver } from '@vakao/ui/resolver'

Components({ resolvers: [VakaoUiResolver()] })
```

## 本地开发

```bash
corepack enable
pnpm install
pnpm dev          # playground
pnpm check        # lint + format + typecheck + test + build + size
pnpm test:coverage
pnpm docs:build
```

提交前会由 husky 执行 lint-staged 与 commitlint。

## 发布

registry 认证由开发者本机全局配置提供，仓库不保存任何凭据。

```bash
pnpm changeset
pnpm version-packages
pnpm publish
```

预发布：`pnpm changeset pre enter beta` → `pnpm version-packages` → `pnpm publish --tag beta` → `pnpm changeset pre exit`。回滚请发布一个更高的修复版本，不要撤回已发布版本。细节与发版清单见 [开发流程](docs/DEVELOPMENT.md)。
