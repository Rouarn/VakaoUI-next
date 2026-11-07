# Rate 评分

用星星表达评分，支持半星、清零、只读与键盘操作。

## 基础用法

<Demo name="rate/basic" />

## 行为约定

- 根节点使用 `role="slider"`，暴露 `aria-valuemin` / `aria-valuemax` / `aria-valuenow` 与 `aria-valuetext`。
- 键盘：`←` / `↓` 减一档，`→` / `↑` 加一档，`Home` 归零，`End` 满分；`allowHalf` 时步进为 0.5。
- `clearable` 时再次点击当前分值会清零。
- `readonly` 保留可聚焦但不可修改；`disabled` 退出焦点并降低透明度。
- 星星图形为装饰性内容，读屏信息完全由 slider 语义承担。

## 引入

```ts
import { VkRate } from '@vakao/ui/rate'
import '@vakao/ui/rate/style.css'
```

## API

<ApiTable name="Rate" />
