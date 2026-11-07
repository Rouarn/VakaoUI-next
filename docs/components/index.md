# 组件总览

共 28 个组件导出，全部只消费 `--vk-*` 令牌，提供 TypeScript 类型、单元测试与可交互示例。完整完成度与已知限制见 [组件状态](/guide/components-status)。

## 状态说明

- **稳定**：API 已冻结，0.1.x 内不做破坏性变更。
- **可用**：功能完整，边界场景可能继续打磨。
- **实验**：首次发布，API 可能调整。

| 分类     | 组件                                          | 状态 |
| -------- | --------------------------------------------- | ---- |
| 全局     | [ConfigProvider](/components/config-provider) | 稳定 |
| 通用     | [Button](/components/button)                  | 稳定 |
| 数据录入 | [Form / FormItem](/components/form)           | 稳定 |
| 数据录入 | [Input](/components/input)                    | 稳定 |
| 数据录入 | [InputNumber](/components/input-number)       | 稳定 |
| 数据录入 | [Select](/components/select)                  | 可用 |
| 数据录入 | [Switch](/components/switch)                  | 稳定 |
| 数据录入 | [Checkbox](/components/checkbox)              | 稳定 |
| 数据录入 | [Radio / RadioGroup](/components/radio)       | 稳定 |
| 数据录入 | [Slider](/components/slider)                  | 可用 |
| 反馈     | [Alert](/components/alert)                    | 稳定 |
| 反馈     | [Progress](/components/progress)              | 稳定 |
| 反馈     | [Spin](/components/spin)                      | 稳定 |
| 反馈     | [Skeleton](/components/skeleton)              | 稳定 |
| 反馈     | [Empty](/components/empty)                    | 稳定 |
| 反馈     | [Modal](/components/modal)                    | 可用 |
| 反馈     | [Popover](/components/popover)                | 可用 |
| 反馈     | [Popconfirm](/components/popconfirm)          | 可用 |
| 导航     | [Dropdown](/components/dropdown)              | 可用 |
| 导航     | [Tabs](/components/tabs)                      | 稳定 |
| 导航     | [Menu](/components/menu)                      | 可用 |
| 导航     | [Pagination](/components/pagination)          | 稳定 |
| 布局     | [Grid / Row / Col / Space](/components/grid)  | 稳定 |
| 数据展示 | [Table](/components/table)                    | 可用 |

## 命名与引入

所有组件以 `Vk` 为前缀，样式类名以 `vk-` 为命名空间，CSS 变量以 `--vk-` 开头。子路径引入方式：

```ts
import { VkButton } from '@vakao/ui/button'
import '@vakao/ui/button/style.css'
```
