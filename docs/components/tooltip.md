# Tooltip 文字提示

鼠标悬停或键盘聚焦时出现的简短说明，复用仓库统一的 `useFloating` 定位与 `Teleport` 挂载方案。

## 基础用法

<Demo name="tooltip/basic" />

## 行为约定

- 触发器同时监听 `mouseenter` 与 `focusin`，键盘用户可正常获取提示。
- 面板使用 `role="tooltip"`，打开时通过 `aria-describedby` 关联触发器。
- 按 `Escape` 立即关闭；`delay` 同时作用于显示与隐藏。
- 面板不可交互（`pointer-events: none`），避免遮挡下方内容。
- 挂载容器读取 `ConfigProvider.getPopupContainer`，默认 `body`。

## 引入

```ts
import { VkTooltip } from '@vakao/ui/tooltip'
import '@vakao/ui/tooltip/style.css'
```

## API

<ApiTable name="Tooltip" />
