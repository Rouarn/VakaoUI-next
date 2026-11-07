# Cascader 级联选择器

从多级联动的选项中选择一条完整路径，支持键盘导航与路径回显。

## 基础用法

<Demo name="cascader/basic" />

## 行为约定

- 触发器使用 `role="combobox"` + `aria-haspopup="listbox"`，面板每一列都是一个 `role="listbox"`，选项为 `role="option"`。
- 回显时按 `modelValue` 在 `options` 中逐级查找完整路径，用 `separator` 连接各级 `label`；路径不存在或为空时显示 `placeholder`。
- 点击带 `children` 的选项进入下一列；点击叶子（没有 `children` 或 `isLeaf` 为真）选中并关闭。`changeOnSelect` 为真时任意层级都可直接选中并关闭。
- 键盘支持 `ArrowDown` / `ArrowUp` 在当前列移动，`ArrowRight` 进入子列，`ArrowLeft` / `Backspace` 返回上一列，`Enter` 选择或进入下一列，`Escape` 关闭，`Tab` 关闭。
- 浮层通过 Teleport 挂载到 `ConfigProvider.getPopupContainer` 或 `body`，点击外部、失焦或按 Esc 都会关闭。
- 当前高亮项通过 `aria-activedescendant` 关联到触发器，焦点始终留在触发器上。

## 引入

```ts
import { VkCascader } from '@vakao/ui/cascader'
import '@vakao/ui/cascader/style.css'
```

## API

<ApiTable name="Cascader" />
