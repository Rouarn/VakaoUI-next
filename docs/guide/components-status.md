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

| 组件               | 导出                                                                                   | 状态 | 说明                                                         |
| ------------------ | -------------------------------------------------------------------------------------- | ---- | ------------------------------------------------------------ |
| ConfigProvider     | `VkConfigProvider`                                                                     | 稳定 | 主题、尺寸、语言、z-index 基准                               |
| Button             | `VkButton`                                                                             | 稳定 | 类型、尺寸、加载、块级                                       |
| Typography         | `VkTypography` / `VkTitle` / `VkText` / `VkLink`                                       | 稳定 | 字号阶梯、语义色、行内代码、截断、链接禁用态                 |
| Divider            | `VkDivider`                                                                            | 稳定 | 水平 / 垂直、标题位置、虚线                                  |
| Card               | `VkCard`                                                                               | 稳定 | 标题、封面、页脚、悬停抬升                                   |
| Tag                | `VkTag`                                                                                | 稳定 | 语义色、尺寸、圆角、可关闭                                   |
| Avatar             | `VkAvatar`                                                                             | 稳定 | 图片回退、尺寸、圆形、文字头像                               |
| Badge              | `VkBadge`                                                                              | 稳定 | 数值 / 圆点、上限、呼吸动画                                  |
| Tooltip            | `VkTooltip`                                                                            | 稳定 | 悬停 / 聚焦触发、方向、延迟、Esc 关闭                        |
| Result             | `VkResult`                                                                             | 稳定 | 状态图标、403 / 404 / 500、操作区                            |
| Descriptions       | `VkDescriptions`                                                                       | 稳定 | 多列跨列、表格化边框、插槽自定义值                           |
| Steps              | `VkSteps`                                                                              | 稳定 | 水平 / 垂直、当前步骤状态                                    |
| Timeline           | `VkTimeline`                                                                           | 稳定 | 数据驱动、语义色节点、水平 / 垂直                            |
| Statistic          | `VkStatistic`                                                                          | 稳定 | 千分位、精度、前后缀、等宽数字                               |
| List               | `VkList`                                                                               | 稳定 | 有边框 / 分割线 / 悬停、加载与空态、作用域插槽               |
| Image              | `VkImage`                                                                              | 稳定 | 加载 / 失败占位、回退图、全屏预览与缩放                      |
| Watermark          | `VkWatermark`                                                                          | 稳定 | 文字 / 图片平铺水印、旋转、间距、全屏                        |
| Countdown          | `VkCountdown`                                                                          | 稳定 | 时间戳校准、暂停 / 重置、小数秒、格式化与自定义渲染          |
| QrCode             | `VkQrCode`                                                                             | 稳定 | 内置字节模式编码、版本 1–10、SVG 输出、SSR 可用              |
| Scrollbar          | `VkScrollbar`                                                                          | 稳定 | 自绘滚动条、拖拽与轨道点击、常显 / 原生回退                  |
| Cascader           | `VkCascader`                                                                           | 稳定 | 多级联动、路径回显、changeOnSelect、键盘导航、空态           |
| Tree               | `VkTree`                                                                               | 稳定 | 展开 / 勾选级联 / 半选、禁用、异步加载、roving tabindex      |
| Transfer           | `VkTransfer`                                                                           | 稳定 | 双栏搜索、全选、禁用项、受控 value                           |
| Upload             | `VkUpload`                                                                             | 稳定 | 受控列表、校验、进度、失败重试、拖拽、customRequest          |
| Layout             | `VkLayout` / `VkLayoutHeader` / `VkLayoutSider` / `VkLayoutContent` / `VkLayoutFooter` | 稳定 | 侧边栏折叠、嵌套、语义区块                                   |
| Flex               | `VkFlex`                                                                               | 稳定 | 方向、对齐、间距、换行                                       |
| Affix              | `VkAffix`                                                                              | 稳定 | 整页 / 局部容器固钉、贴顶 / 贴底、状态事件                   |
| Anchor             | `VkAnchor`                                                                             | 稳定 | 局部容器滚动、二级锚点、平滑滚动与激活态                     |
| PageHeader         | `VkPageHeader`                                                                         | 稳定 | 返回按钮、标题 / 副标题、面包屑与操作区                      |
| Breadcrumb         | `VkBreadcrumb` / `VkBreadcrumbItem`                                                    | 稳定 | 数据驱动 / 组合式、自定义分隔符、当前页语义                  |
| Collapse           | `VkCollapse` / `VkCollapseItem`                                                        | 稳定 | 受控 / 非受控、手风琴、禁用项                                |
| Rate               | `VkRate`                                                                               | 稳定 | 半星、清零、只读、键盘滑块语义                               |
| BackTop            | `VkBackTop`                                                                            | 稳定 | 整页 / 局部滚动、平滑回顶                                    |
| Form / FormItem    | `VkForm` / `VkFormItem`                                                                | 稳定 | 基于 async-validator，支持纵向 / 横向布局                    |
| Input              | `VkInput`                                                                              | 稳定 | 前后缀、密码、文本域、清空                                   |
| InputNumber        | `VkInputNumber`                                                                        | 稳定 | 步进、范围、精度、键盘                                       |
| Switch             | `VkSwitch`                                                                             | 稳定 | 原生 button + role=switch                                    |
| Checkbox           | `VkCheckbox`                                                                           | 稳定 | 单选框语义、禁用、不确定态                                   |
| Radio / RadioGroup | `VkRadio` / `VkRadioGroup`                                                             | 稳定 | 原生 radio + 分组上下文                                      |
| Slider             | `VkSlider`                                                                             | 稳定 | 原生 range、步长、禁用                                       |
| Select             | `VkSelect`                                                                             | 可用 | 单选、清空、键盘；多选与远程搜索未实现                       |
| Alert              | `VkAlert`                                                                              | 稳定 | 四色语义、图标、可关闭                                       |
| Progress           | `VkProgress`                                                                           | 稳定 | 线形 / 环形、状态色                                          |
| Spin               | `VkSpin`                                                                               | 稳定 | 包裹内容、延迟、提示文案                                     |
| Skeleton           | `VkSkeleton`                                                                           | 稳定 | 行数、头像、动画降级                                         |
| Empty              | `VkEmpty`                                                                              | 稳定 | 描述、操作插槽                                               |
| Modal              | `VkModal`                                                                              | 可用 | Teleport、焦点陷阱、滚动锁定；不继承外层 ConfigProvider 变量 |
| Drawer             | `VkDrawer`                                                                             | 稳定 | 四向抽屉、Teleport、焦点陷阱、滚动锁定                       |
| Popover            | `VkPopover`                                                                            | 可用 | 点击 / 悬停、四方向；可能被父级 overflow 裁剪                |
| Popconfirm         | `VkPopconfirm`                                                                         | 稳定 | alertdialog 语义、危险确认、焦点归还                         |
| Dropdown           | `VkDropdown`                                                                           | 稳定 | 数据驱动、分割线、键盘导航                                   |
| Tabs               | `VkTabs`                                                                               | 稳定 | 线与卡片样式、roving tabindex                                |
| Menu               | `VkMenu`                                                                               | 可用 | 纵向 / 横向、一层子菜单                                      |
| Pagination         | `VkPagination`                                                                         | 稳定 | 页码窗口、总数、每页条数                                     |
| Grid / Layout      | `VkRow` / `VkCol` / `VkSpace`                                                          | 可用 | 24 栅格、间距；无响应式断点                                  |
| Table              | `VkTable`                                                                              | 可用 | 排序、自定义单元格、加载与空态；无固定表头 / 虚拟滚动        |

## 未随 0.1.0 发布

日期选择、Upload、Tree、Transfer、Cascader 等复杂交互，以及 Table 的固定表头 / 虚拟滚动增强，需要更长的交互与 a11y 设计周期，进入 [Roadmap](/guide/roadmap)。
