# 组件总览

共 69 个组件导出，全部只消费 `--vk-*` 令牌，提供 TypeScript 类型、单元测试与可交互示例。完整完成度与已知限制见 [组件状态](/guide/components-status)。

## 状态说明

- **稳定**：API 已冻结，0.1.x 内不做破坏性变更。
- **可用**：功能完整，边界场景可能继续打磨。
- **实验**：首次发布，API 可能调整。

| 分类     | 组件                                          | 状态 |
| -------- | --------------------------------------------- | ---- |
| 全局     | [ConfigProvider](/components/config-provider) | 稳定 |
| 通用     | [Button](/components/button)                  | 稳定 |
| 通用     | [Typography](/components/typography)          | 稳定 |
| 通用     | [Divider](/components/divider)                | 稳定 |
| 通用     | [Card](/components/card)                      | 稳定 |
| 通用     | [Tag](/components/tag)                        | 稳定 |
| 通用     | [Avatar](/components/avatar)                  | 稳定 |
| 通用     | [Badge](/components/badge)                    | 稳定 |
| 数据展示 | [Descriptions](/components/descriptions)      | 稳定 |
| 数据展示 | [Steps](/components/steps)                    | 稳定 |
| 数据展示 | [Timeline](/components/timeline)              | 稳定 |
| 数据展示 | [Statistic](/components/statistic)            | 稳定 |
| 数据展示 | [List](/components/list)                      | 稳定 |
| 数据展示 | [Image](/components/image)                    | 稳定 |
| 数据展示 | [Watermark](/components/watermark)            | 稳定 |
| 数据展示 | [Countdown](/components/countdown)            | 稳定 |
| 数据展示 | [QrCode](/components/qr-code)                 | 稳定 |
| 数据展示 | [Tree](/components/tree)                      | 稳定 |
| 数据展示 | [Transfer](/components/transfer)              | 稳定 |
| 数据展示 | [Rate](/components/rate)                      | 稳定 |
| 布局     | [Layout](/components/layout)                  | 稳定 |
| 布局     | [Flex](/components/flex)                      | 稳定 |
| 布局     | [Affix](/components/affix)                    | 稳定 |
| 布局     | [Anchor](/components/anchor)                  | 稳定 |
| 布局     | [PageHeader](/components/page-header)         | 稳定 |
| 导航     | [Breadcrumb](/components/breadcrumb)          | 稳定 |
| 导航     | [Collapse](/components/collapse)              | 稳定 |
| 导航     | [BackTop](/components/back-top)               | 稳定 |
| 布局     | [Scrollbar](/components/scrollbar)            | 稳定 |
| 数据录入 | [Form / FormItem](/components/form)           | 稳定 |
| 数据录入 | [Input](/components/input)                    | 稳定 |
| 数据录入 | [InputNumber](/components/input-number)       | 稳定 |
| 数据录入 | [Select](/components/select)                  | 可用 |
| 数据录入 | [Cascader](/components/cascader)              | 稳定 |
| 数据录入 | [Transfer](/components/transfer)              | 稳定 |
| 数据录入 | [Upload](/components/upload)                  | 稳定 |
| 数据录入 | [Switch](/components/switch)                  | 稳定 |
| 数据录入 | [Checkbox](/components/checkbox)              | 稳定 |
| 数据录入 | [Radio / RadioGroup](/components/radio)       | 稳定 |
| 数据录入 | [Slider](/components/slider)                  | 可用 |
| 反馈     | [Alert](/components/alert)                    | 稳定 |
| 反馈     | [Progress](/components/progress)              | 稳定 |
| 反馈     | [Spin](/components/spin)                      | 稳定 |
| 反馈     | [Skeleton](/components/skeleton)              | 稳定 |
| 反馈     | [Empty](/components/empty)                    | 稳定 |
| 反馈     | [Result](/components/result)                  | 稳定 |
| 反馈     | [Modal](/components/modal)                    | 可用 |
| 浮层     | [Drawer](/components/drawer)                  | 稳定 |
| 反馈     | [Popover](/components/popover)                | 可用 |
| 反馈     | [Popconfirm](/components/popconfirm)          | 可用 |
| 导航     | [Dropdown](/components/dropdown)              | 可用 |
| 导航     | [Tabs](/components/tabs)                      | 稳定 |
| 导航     | [Menu](/components/menu)                      | 可用 |
| 导航     | [Pagination](/components/pagination)          | 稳定 |
| 浮层     | [Tooltip](/components/tooltip)                | 稳定 |
| 布局     | [Grid / Row / Col / Space](/components/grid)  | 稳定 |
| 数据展示 | [Table](/components/table)                    | 可用 |

## 命名与引入

所有组件以 `Vk` 为前缀，样式类名以 `vk-` 为命名空间，CSS 变量以 `--vk-` 开头。子路径引入方式：

```ts
import { VkButton } from '@vakao/ui/button'
import '@vakao/ui/button/style.css'
```
