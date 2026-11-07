# Badge 徽标

在图标、头像或按钮角上展示未读数或状态圆点。

## 基础用法

<Demo name="badge/basic" />

## 行为约定

- `value` 为数字且超过 `max` 时显示 `max+`；为 `0` 时默认隐藏，可用 `showZero` 强制展示。
- 没有默认插槽时自动切换为独立徽标，不再做绝对定位。
- `dot` 只保留圆点，建议同时传入 `ariaLabel`，让读屏获得状态含义。
- `processing` 使用呼吸动画，并遵循 `prefers-reduced-motion`。

## 引入

```ts
import { VkBadge } from '@vakao/ui/badge'
import '@vakao/ui/badge/style.css'
```

## API

<ApiTable name="Badge" />
