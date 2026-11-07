# Tag 标签

用于标记状态、分类或可移除的筛选条件。语义色沿用四色星映射，关闭按钮带本地化无障碍名称。

## 基础用法

<Demo name="tag/basic" />

## 行为约定

- `closable` 只发出 `close` 事件，是否移除由使用方决定。
- `disabled` 时关闭按钮不可点击，根节点输出 `aria-disabled`。
- 关闭按钮读取语言包的“关闭”文案，随 `ConfigProvider` 的 `locale` 切换。
- 长文本默认单行省略，避免撑破表格与工具栏。

## 引入

```ts
import { VkTag } from '@vakao/ui/tag'
import '@vakao/ui/tag/style.css'
```

## API

<ApiTable name="Tag" />
