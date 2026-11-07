# Collapse 折叠面板

容纳可展开 / 收起的信息区块，支持手风琴模式与受控 / 非受控两种用法。

## 基础用法

<Demo name="collapse/basic" />

## 行为约定

- 传入 `v-model` 时为受控模式；不传时组件内部维护展开状态。
- `accordion` 打开时最多保留一项，其余项自动收起。
- 标题使用原生 `button`，输出 `aria-expanded` 与 `aria-controls`；面板为 `role="region"` 并通过 `aria-labelledby` 关联标题。
- 禁用项不响应点击，但标题仍可被读屏浏览。

## 引入

```ts
import { VkCollapse, VkCollapseItem } from '@vakao/ui/collapse'
import '@vakao/ui/collapse/style.css'
```

## API

### Collapse

<ApiTable name="Collapse" />

### CollapseItem

<ApiTable name="CollapseItem" />
