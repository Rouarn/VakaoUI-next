# Modal 对话框

用于需要用户聚焦处理的确认、表单与详细信息。

## 基础用法

<Demo name="modal/basic" />

## 行为约定

- 默认 Teleport 到 `body`，避免被父级 `overflow`、`transform` 裁剪；可用 ConfigProvider 的 `getPopupContainer` 指定容器。
- 遮罩使用 `position: fixed; inset: 0` 覆盖整个视口，弹窗宽度只作用在对话框本身。
- `role="dialog"` + `aria-modal="true"`，标题自动作为可访问名称；无标题时必须传 `ariaLabel`。
- 打开时锁定页面滚动、保存并接管焦点；关闭后焦点回到触发元素。
- Esc 关闭、遮罩点击关闭（`maskClosable` 可关）、Tab 焦点陷阱。
- 点击确认只发出 `ok`，不会自动关闭，便于异步提交后由使用方决定。

## 已知限制

- 组件内部通过 CSS 变量取主题令牌，Teleport 到 `body` 后不会继承外层 `ConfigProvider` 的 `themeOverrides`。需要局部覆盖主题时，用 `getPopupContainer` 把弹层挂到该 Provider 内部，或在 `body` 级别设置变量。

## 引入

```ts
import { VkModal } from '@vakao/ui/modal'
import '@vakao/ui/modal/style.css'
```

## API

<ApiTable name="Modal" />
