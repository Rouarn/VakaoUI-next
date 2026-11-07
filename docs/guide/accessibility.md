# 可访问性

## 我们的最低要求

每个组件在合并前都要满足下面的清单，CI 中的 `tests/a11y.spec.ts` 会用 axe-core 做自动检查。

| 维度     | 要求                                                                                     |
| -------- | ---------------------------------------------------------------------------------------- |
| 键盘     | 所有可交互组件都能用 Tab 到达、Enter / Space 触发、方向键完成选择                        |
| 焦点     | 使用 `:focus-visible` 绘制可见轮廓，轮廓与背景对比度 ≥ 3:1                               |
| 名称     | 输入类组件要么有可见 label（FormItem 生成），要么有 `aria-label`                         |
| 状态     | 错误、禁用、加载、选中分别映射到 `aria-invalid`、`disabled`、`aria-busy`、`aria-checked` |
| 错误表达 | 错误态同时出现图标、文字与边框 / 浅底，不只依赖颜色                                      |
| 动效     | 过渡与动画在 `prefers-reduced-motion: reduce` 下降级                                     |
| 弹层     | 打开后焦点进入、Esc 关闭、关闭后焦点归还触发元素                                         |

## 错误态为什么不只用颜色

四色星里的 error 是紫色，与 info 的蓝、warning 的橙在色相上可区分，但对色觉障碍用户仍不够。因此错误态统一采用：

1. 语义图标（感叹号 / 叉号），`aria-hidden`，文字由 FormItem 提供；
2. `aria-invalid="true"`，读屏器会播报；
3. 边框换成 `--vk-color-error-border`，背景铺 `--vk-color-error-bg`；
4. FormItem 的反馈文案使用 `--vk-color-error-text`，对比度 ≥ 4.5:1。

四者叠加，即使去掉颜色也能读出"这里出错了"。

## FormItem 的自动关联

`VkFormItem` 会为子控件生成唯一 `id`，并把 `aria-describedby` 指向反馈文案、把 `aria-invalid` 与校验状态绑定。自定义控件只要通过 `useFormControl()` 接入，就能继承这些属性。

## 已知限制

- 弹层类组件使用 `Teleport` 渲染到 `body`，在 `aria-modal` 之外没有做完整的 inert 背景处理；模态场景请使用 `VkModal`，它会锁定滚动并接管焦点。
- 屏幕阅读器组合（NVDA + Firefox、VoiceOver + Safari）已做人工抽查，但没有建立逐版本的回归矩阵。
