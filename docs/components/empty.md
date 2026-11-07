# Empty 空状态

没有数据时的占位提示，可附带操作入口。

## 基础用法

<Demo name="empty/basic" />

## 行为约定

- 默认文案来自语言包，可通过 `description` 覆盖。
- 容器使用 `role="status"`，文案变化时会被播报。
- 操作按钮放在 `action` 插槽，保持与描述文字的间距一致。

## 引入

```ts
import { VkEmpty } from '@vakao/ui/empty'
import '@vakao/ui/empty/style.css'
```

## API

<ApiTable name="Empty" />
