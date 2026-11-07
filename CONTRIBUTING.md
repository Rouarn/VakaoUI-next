# 贡献指南

## 环境

- Node >= 20.19
- pnpm >= 10（仓库使用 pnpm 12，`packageManager` 已锁定版本）

```bash
pnpm install
pnpm dev          # 示例 playground
pnpm docs:dev     # 文档站 + 示例站
```

## 提交前

```bash
pnpm check        # lint / format / typecheck / test / build / size
```

`pre-commit` 会对暂存文件执行 ESLint 与 Prettier，`commit-msg` 使用 commitlint 校验提交信息。

## 提交信息

遵循 Conventional Commits：

```
feat(select): support clearable
fix(table): keep aria-sort in sync
docs: add dark mode guide
```

类型限定为 `feat / fix / docs / style / refactor / perf / test / build / ci / chore / revert`。

## 新增组件

1. 在 `src/components/<name>/` 下创建 `src/types.ts`、`src/<Name>.vue`、`index.ts`。
2. 样式放在 `src/styles/components/<name>.css`，只使用 `--vk-*` 令牌，不加全局选择器。
3. 在 `src/components/index.ts` 导出并登记到 `components` 对象。
4. 补 `tests/<name>.spec.ts`，覆盖默认渲染、交互、键盘与 aria。
5. 在 `docs/demos/<name>/` 写可交互示例，在 `docs/components/<name>.md` 用 `<Demo>` 与 `<ApiTable>` 引用。
6. 运行 `pnpm api` 重新生成 API 数据，确认文档中不出现手写 props 表。

## 样式约定

- 颜色、间距、圆角、阴影、动效必须来自令牌，不允许硬编码色值。
- 语义色固定四色星映射，不新增红/绿色相；错误态需要「图标 + 文案 + 边框/浅底」。
- 组件根节点使用 `vk-<component>`，元素使用 `vk-<component>__<element>`，状态使用 `--<state>`。

## 可访问性

- 键盘可达：所有交互元素可用 Tab 聚焦，Enter / Space 可触发。
- 焦点可见：`:focus-visible` 必须有清晰轮廓。
- 语义正确：优先使用原生元素与角色，弹层需要 `useDismiss` 与焦点管理。
- 状态可播报：`aria-expanded` / `aria-selected` / `aria-current` / `aria-invalid` 与视觉状态一致。

## 版本与 Changeset

对外可见的变更需要 Changeset：

```bash
pnpm changeset
```

- `patch`：修复与内部调整
- `minor`：向后兼容的新能力
- `major`：破坏性变更（0.x 阶段同样需要说明）

## 代码评审

- 一个 PR 只做一件事。
- UI 变更请附亮色与暗色截图。
- 不跳过 hooks，不使用 `--no-verify`。
