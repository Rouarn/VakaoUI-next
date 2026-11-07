# 组件清单与完成度

0.1.0 为首次对外发布版本，覆盖基础表单、反馈、导航与数据展示。所有已发布组件均满足：

- 样式只消费 `--vk-*` 令牌，无全局选择器副作用
- 单测覆盖默认渲染、交互与键盘
- `vue-component-meta` 自动生成 API 表
- 可交互示例与文档同源渲染

## 状态说明

- **稳定**：API 与视觉已可用于生产，后续以兼容方式演进。
- **可用**：功能完整，但已知限制明确列在组件页面中。
- **规划中**：未随 0.1.0 发布。

## 清单

| 组件               | 导出                          | 状态 | 说明                                                         |
| ------------------ | ----------------------------- | ---- | ------------------------------------------------------------ |
| ConfigProvider     | `VkConfigProvider`            | 稳定 | 主题、尺寸、语言、z-index 基准                               |
| Button             | `VkButton`                    | 稳定 | 类型、尺寸、加载、块级                                       |
| Form / FormItem    | `VkForm` / `VkFormItem`       | 稳定 | 基于 async-validator，支持纵向 / 横向布局                    |
| Input              | `VkInput`                     | 稳定 | 前后缀、密码、文本域、清空                                   |
| InputNumber        | `VkInputNumber`               | 稳定 | 步进、范围、精度、键盘                                       |
| Switch             | `VkSwitch`                    | 稳定 | 原生 button + role=switch                                    |
| Checkbox           | `VkCheckbox`                  | 稳定 | 单选框语义、禁用、不确定态                                   |
| Radio / RadioGroup | `VkRadio` / `VkRadioGroup`    | 稳定 | 原生 radio + 分组上下文                                      |
| Slider             | `VkSlider`                    | 稳定 | 原生 range、步长、禁用                                       |
| Select             | `VkSelect`                    | 可用 | 单选、清空、键盘；多选与远程搜索未实现                       |
| Alert              | `VkAlert`                     | 稳定 | 四色语义、图标、可关闭                                       |
| Progress           | `VkProgress`                  | 稳定 | 线形 / 环形、状态色                                          |
| Spin               | `VkSpin`                      | 稳定 | 包裹内容、延迟、提示文案                                     |
| Skeleton           | `VkSkeleton`                  | 稳定 | 行数、头像、动画降级                                         |
| Empty              | `VkEmpty`                     | 稳定 | 描述、操作插槽                                               |
| Modal              | `VkModal`                     | 可用 | Teleport、焦点陷阱、滚动锁定；不继承外层 ConfigProvider 变量 |
| Popover            | `VkPopover`                   | 可用 | 点击 / 悬停、四方向；可能被父级 overflow 裁剪                |
| Popconfirm         | `VkPopconfirm`                | 稳定 | alertdialog 语义、危险确认、焦点归还                         |
| Dropdown           | `VkDropdown`                  | 稳定 | 数据驱动、分割线、键盘导航                                   |
| Tabs               | `VkTabs`                      | 稳定 | 线与卡片样式、roving tabindex                                |
| Menu               | `VkMenu`                      | 可用 | 纵向 / 横向、一层子菜单                                      |
| Pagination         | `VkPagination`                | 稳定 | 页码窗口、总数、每页条数                                     |
| Grid / Layout      | `VkRow` / `VkCol` / `VkSpace` | 可用 | 24 栅格、间距；无响应式断点                                  |
| Table              | `VkTable`                     | 可用 | 排序、自定义单元格、加载与空态；无固定表头 / 虚拟滚动        |

## 未随 0.1.0 发布

日期选择、Upload、Tree、Transfer、Drawer、Tooltip 等。它们需要更长的交互与 a11y 设计周期，进入 [Roadmap](/guide/roadmap)。
