# VaKao UI 开发流程

本文是仓库的唯一流程约定。新增组件、修改 API、发版前都按本文执行。

## 1. 环境与工具

| 项         | 版本 / 约定                                                                                     |
| ---------- | ----------------------------------------------------------------------------------------------- |
| Node.js    | `>=20.19`，CI 使用 24 LTS                                                                       |
| pnpm       | `12.x`，通过 `corepack enable` 启用                                                             |
| Vue        | 运行时 peer `^3.4`，开发与测试使用 3.5                                                          |
| TypeScript | `~6.0`（TS 7 暂不提供 JS Compiler API，vue-tsc / typescript-eslint / vite-plugin-dts 尚不兼容） |
| 构建       | Vite 8，库模式多入口，产物为 ESM-only（Vue 3.4+ / SSR / 现代打包器均为 ESM 消费）               |
| 测试       | Vitest 5 + `@vue/test-utils` + jsdom + `@vue/server-renderer`                                   |
| 规范       | ESLint 10（flat config）+ Prettier 3                                                            |
| 版本管理   | Changesets 3                                                                                    |

常用命令：

| 命令                                | 用途                                                 |
| ----------------------------------- | ---------------------------------------------------- |
| `pnpm dev`                          | 启动 playground                                      |
| `pnpm lint` / `pnpm lint:fix`       | 代码检查                                             |
| `pnpm format` / `pnpm format:check` | 格式化                                               |
| `pnpm typecheck`                    | `vue-tsc --noEmit`                                   |
| `pnpm test` / `pnpm test:run`       | 单测（监听 / 一次）                                  |
| `pnpm build`                        | 构建 ESM + 类型 + 样式                               |
| `pnpm check`                        | lint → format → typecheck → test → build，与 CI 等价 |
| `pnpm changeset`                    | 生成变更记录                                         |
| `pnpm publish`                      | 发布，自动执行 `prepublishOnly`                      |

## 2. 目录结构

```text
src/
├── tokens/                 设计令牌唯一来源（brand.json / theme.json / index.ts）
├── core/                   无样式基础设施（ConfigProvider 上下文、namespace、主题计算）
├── components/             组件实现，一个组件一个目录
│   └── button/
│       ├── src/Button.vue
│       ├── src/types.ts
│       └── index.ts
├── styles/components/      组件样式，一个组件一个 CSS 文件
├── resolver.ts             unplugin-vue-components 解析器
└── index.ts                包入口与 Vue 插件
tests/                      单元测试与 SSR 测试
playground/                 本地交互预览
docs/                       开发流程与令牌文档
scripts/                    构建期脚本（主题 CSS、样式汇总）
```

依赖方向固定为 `components → core → tokens`。组件之间不互相引用 `src`，需要复用时先下沉到 `core`。样式只允许 `src/styles/components/*.css` 通过 `.vk-` 类名消费 `--vk-*` 变量，不允许在 `.vue` 内写全局选择器。

## 3. 分支与提交

- `main` 为唯一长期分支，保持可发布状态，禁止直接 push。
- 短生命周期分支：`feat/<scope>`、`fix/<scope>`、`docs/<scope>`、`chore/<scope>`。
- 提交信息使用 Conventional Commits：

```text
feat(button): add loading state
fix(config-provider): inherit nested size
docs(development): add publish checklist
```

- 每个 PR 必须包含：代码、测试、文档或 changeset、自检结果。
- 合并方式使用 squash，PR 标题即最终提交标题。
- 禁止把 `dist`、`node_modules`、`.env`、编辑器配置提交进仓库。

## 4. 组件开发规范

### 4.1 命名

| 对象       | 规则                      | 示例                                      |
| ---------- | ------------------------- | ----------------------------------------- |
| 组件       | `Vk` + 大驼峰             | `VkButton`、`VkConfigProvider`            |
| 目录       | 小写短横线                | `components/config-provider`              |
| 单文件组件 | 大驼峰                    | `Button.vue`                              |
| 样式类     | `vk-` + BEM               | `.vk-button__icon`、`.vk-button--primary` |
| CSS 变量   | `--vk-` + 语义            | `--vk-color-primary`                      |
| 事件       | 小写，模板中用 kebab-case | `update:modelValue`、`change`             |
| 类型       | 组件名 + 用途             | `ButtonProps`、`ButtonSlots`              |
| 导出       | 具名导出，组件名即导出名  | `export { VkButton }`                     |

包名固定 `@vakao/ui`，不新增 `Vk`、`vakao-ui-vue` 等别名包。

### 4.2 目录模板

```text
components/<name>/
├── src/<Name>.vue      # 仅一个根组件
├── src/types.ts        # Props / Slots / Emits / 枚举
└── index.ts            # 对外导出，不写实现
```

### 4.3 Props 契约

- 表单类只支持 `v-model`，不提供 `value` + `onChange` 兼容别名。
- `size` 未传时继承 `VkConfigProvider`，子组件局部值优先。
- `disabled`、`loading` 必须同时反映到 DOM 属性与样式类。
- 禁止 `customClass` / `customStyle`，使用原生 `class` / `style` 透传。
- 枚举使用字符串联合类型，不用数字或魔法字符串。
- 布尔 prop 默认 `false`，默认值写在 `withDefaults`。
- 对外 props 必须有中文 JSDoc，说明默认行为与继承关系。

### 4.4 事件与插槽

- `defineEmits` 使用类型形式；模板监听使用 kebab-case。
- 原生事件不二次包装，直接透传。
- 插槽必须用 `defineSlots<XxxSlots>()` 声明类型。
- 插槽命名固定为 `default`、`icon`、`prefix`、`suffix`、`extra` 等语义名，不按位置命名。

### 4.5 样式与令牌

- 颜色、圆角、间距、字号、动效、阴影一律使用 `var(--vk-*)`，禁止硬编码。
- 组件样式只写在自己的 CSS 文件，选择器必须收敛在 `.vk-<component>` 下。
- 禁止全局 reset、`html` / `body` 选择器、`*` 选择器、`!important`。
- 暗色只通过令牌切换，不写 `prefers-color-scheme` 分支，也不写 `[data-theme]` 特例。
- `box-sizing` 在组件根元素上局部声明。
- 过渡必须带 `prefers-reduced-motion: reduce` 回退。
- 新令牌先加到 `src/tokens/theme.json`，再在文档中登记来源，不允许在 CSS 里临时造变量。

### 4.6 可访问性最低要求

每个组件合并前必须满足：

- 优先使用原生元素（`button`、`input`、`label`、`ul/li`），不自造可点击 `div`。
- 全部功能可用键盘完成，焦点顺序合理，`focus-visible` 有可见样式。
- 状态用 ARIA 表达：`aria-expanded`、`aria-selected`、`aria-checked`、`aria-busy`、`aria-disabled`。
- 图标按钮必须有 `aria-label`；纯装饰图标 `aria-hidden="true"`。
- 弹层打开后焦点进入，关闭后焦点归还触发元素，`Esc` 可关闭。
- 正文对比度不低于 4.5:1，焦点环不低于 2px。
- 单测中包含 axe 检查，不允许有 serious / critical 违规。

## 5. 测试要求

- 测试文件放在 `tests/`，命名 `<component>.spec.ts`。
- 断言行为与可观察输出，不断言内部实现细节。
- 每个组件至少覆盖：默认渲染、每个变体类名、禁用/加载、事件、插槽、ARIA 属性。
- 每个组件补一条 SSR 冒烟测试，保证无 `document` / `window` 直接访问。
- 覆盖率门槛写在 `vite.config.ts` 的 `test.coverage.thresholds`：语句 74%、分支 63%、函数 79%、行 77%。新增组件不得拉低整体值。
- 测试不允许依赖网络、真实计时器、真实文件系统。

## 6. 文档站与示例

文档站使用 VitePress，目录 `docs/`，示例与文档同源：

- 示例文件放 `docs/demos/<component>/<case>.vue`，`DemoBlock` 用 `import.meta.glob` 同时渲染组件并按 `?raw` 展示代码，禁止手抄第二份。
- API 表由 `vue-component-meta` 从 `src/components/**` 生成到 `docs/.vitepress/data/api.json`，页面使用 `<ApiTable name="Button" />`。
- 每个组件文档固定结构：何时使用 → 基础示例 → 行为约定 → 已知限制 → 引入 → API → 可访问性说明。
- 示例站位于 `docs/examples/`，与文档站同一构建产物。
- 构建命令：`pnpm docs:build`，产物在 `docs/.vitepress/dist`，为纯静态文件。

## 7. 版本与 Changesets

- 遵循 SemVer：`patch` 修 bug，`minor` 加组件或兼容能力，`major` 破坏性变更。
- 每个影响产物的 PR 必须附带 changeset，类型与描述由作者选择。
- 版本号只由 `pnpm version-packages` 修改，禁止手改 `package.json`。
- `CHANGELOG.md` 由 Changesets 生成，按 minor / patch 分组，破坏性变更单独标注。
- 预发布使用 `pnpm changeset pre enter beta` / `exit`，版本形如 `0.1.0-beta.0`。

## 8. 发布

发布目标是云效私有制品仓库。**registry 认证由开发者本机全局配置提供，仓库不保存任何凭据，也不需要在项目内配置 registry。**

> `@vakao/ui` 目前固定 `0.1.0`，采用同版本覆盖发布：直接重复发布 `0.1.0` 即可覆盖制品，无需升版本号。

1. 确认工作区干净，`main` 为最新。
2. `pnpm check` 全部通过。
3. `pnpm changeset` 记录变更；`pnpm version-packages` 定版本并提交。
4. `pnpm publish`（或 `npm publish`）。`prepublishOnly` 会再跑一次 `pnpm check`。
5. 在临时目录验证：`pnpm add @vakao/ui`，分别验证整包引入与 `@vakao/ui/button` 按需引入。
6. 打 tag 并推送。

常见失败：

| 报错                  | 处理                                                      |
| --------------------- | --------------------------------------------------------- |
| `E401` / `ENEEDAUTH`  | 本机全局登录态失效，重新登录云效制品仓库                  |
| `E403`                | 当前账号无该包发布权限，或版本已存在                      |
| `E404`                | 包名 / scope 与制品仓库不匹配；确认 `name` 为 `@vakao/ui` |
| `prepublishOnly` 失败 | 按输出修复 lint / 类型 / 测试 / 构建，禁止跳过            |
| 安装后找不到子路径    | 检查 `exports`、`files` 与 `dist` 实际产物                |

## 9. CI

仓库使用 `.github/workflows/ci.yml`：安装 → lint → format → typecheck → test:coverage → build → size → docs:build，并上传覆盖率与文档产物。

接入云效流水线时保持同样顺序，Node 24 + pnpm 12，禁止在 CI 中跳过检查或使用 `--no-verify`。CI 只做校验，不做发布；发布由维护者本机执行，或使用 `.github/workflows/publish.yml`（registry 与 token 通过 Secrets 注入）。

### 9.1 文档站部署

构建产物 `docs/.vitepress/dist` 可直接作为静态站点部署：

- **子路径部署**（推荐）：把 `dist` 放到现有服务器的目标子目录，按子路径调整 VitePress `base` 后重新构建，例如 `base: '/ui/'`。
- **独立静态托管**：Nginx / 对象存储 / 云效静态托管均可，需为 SPA 路由配置回退到 `index.html`。
- VitePress 已开启 `cleanUrls`，服务器需要支持无扩展名路径映射。

需要新域名、DNS 或证书的操作不在仓库内完成，交付静态产物与上述说明即可。

### 9.2 预发布与回滚

- 预发布：`pnpm changeset pre enter beta` → `pnpm version-packages` → `pnpm publish --tag beta` → `pnpm changeset pre exit`。
- 回滚：不要撤回已发布版本，发布一个更高的 `patch` 版本修复问题；如必须废弃，在 README 与 CHANGELOG 中标注并发布 `deprecated`。
- 本机验证安装：`pnpm add @vakao/ui@beta` 后在临时项目跑一次构建。

## 10. 发版清单

- [ ] `main` 最新，工作区干净
- [ ] changeset 已合并，版本号符合 SemVer
- [ ] `pnpm check` 通过
- [ ] 新增/变更组件有测试与 SSR 冒烟
- [ ] 文档与示例同步，API 表已重新生成
- [ ] `dist` 包含 ESM、`.d.ts`、`theme.css`、`styles.css`、单组件样式
- [ ] `exports`、`files`、`sideEffects` 未遗漏新组件
- [ ] 临时项目安装验证通过
- [ ] 发布后打 tag，更新 CHANGELOG

## 11. 废弃与破坏性变更

- 废弃先在 `minor` 中标记：JSDoc 加 `@deprecated`，文档标注替代方案与移除版本。
- 至少保留两个 minor 周期再移除，移除只能发生在 `major`。
- 破坏性变更必须单独发 changeset（`major`），并在 CHANGELOG 顶部写迁移步骤。
- 能提供 codemod 的必须提供，脚本放 `scripts/codemods/`。
- 破坏性变更先开 RFC issue，说明动机、影响面、迁移成本，讨论通过后再实现。
- 不允许静默改变既有 prop 的语义；新增可选 prop 不算破坏性变更。

## 12. 组件路线

按 T0 → T1 → T2 推进，T0 未补齐前不接 T1 的重组件。

| 档位 | 组件                                                                                                                                                                                               |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T0   | ConfigProvider（已有）、Button（已有）、Form/FormItem、InputNumber、Slider、Alert、Progress、Spin/Skeleton、Empty、Popover/Popconfirm、Modal、Dropdown、Menu、Tabs、Pagination、Grid/Layout、Table |
| T1   | DatePicker/TimePicker、Upload、Rate、Collapse、Breadcrumb、Steps、List、Descriptions、Timeline、Result、Transfer、AutoComplete、Cascader、TreeSelect、Drawer                                       |
| T2   | Calendar、Carousel、ColorPicker、QRCode、Watermark、Scrollbar、Affix、BackTop、Anchor、Split、Flex、Code、Statistic、FloatButton                                                                   |

每个 T0 组件合并前补齐：实现、样式、测试、SSR、playground 示例、changeset。
