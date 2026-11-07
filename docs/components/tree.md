# Tree 树形控件

递归展示层级数据，支持展开、单选/多选、复选框级联与异步加载。

## 基础用法

<Demo name="tree/basic" />

## 行为约定

- 根容器使用 `role="tree"`，节点使用 `role="treeitem"`，并带 `aria-level`、`aria-expanded`、`aria-selected`、`aria-checked` 与 `aria-disabled`。
- 键盘采用 roving tabindex：`ArrowUp` / `ArrowDown` 在可见节点间移动，`ArrowRight` 展开或进入子节点，`ArrowLeft` 收起或回到父节点，`Home` / `End` 跳转首尾，`Enter` 选择，`Space` 切换勾选。
- 受控的 `expandedKeys` / `selectedKeys` / `checkedKeys` 优先于内部状态；未传时由 `default*` 属性初始化。
- `checkable` 开启后勾选会级联到子节点，祖先节点按子节点状态显示全选或半选；禁用节点在级联时被跳过。半选结果可通过 `getHalfCheckedKeys()` 或 `check` 事件的 `info.halfCheckedKeys` 获取。
- 传入 `loadData` 后，展开没有子节点且不是叶子的节点会进入加载态，加载完成后写入内部缓存并触发 `load` 事件；加载失败只结束加载态，不抛出异常。
- `multiple` 仅在 `selectable` 为真时生效，按住 Ctrl / Cmd 点击可追加或移除选中项。

## 引入

```ts
import { VkTree } from '@vakao/ui/tree'
import '@vakao/ui/tree/style.css'
```

## API

<ApiTable name="Tree" />
