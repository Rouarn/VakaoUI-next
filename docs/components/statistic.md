# Statistic 统计数值

突出展示关键指标，支持精度、前后缀与千分位格式化。

## 基础用法

<Demo name="statistic/basic" />

## 行为约定

- 数字按 `precision` 使用 `toFixed` 处理，未设置时保持原始精度；字符串值原样输出。
- 仅对整数部分每三位插入 `groupSeparator`，小数部分保持完整，负数符号单独保留。
- 根节点输出 `role="group"` 并在有 `label` 时作为 `aria-label`，方便读屏定位指标。
- `tabularNumbers` 默认开启，通过 `font-variant-numeric: tabular-nums` 让数字纵向对齐。
- 数值使用展示字体与 `--vk-text-color-1`，标签使用 `--vk-text-color-3`，均只消费令牌。

## 引入

```ts
import { VkStatistic } from '@vakao/ui/statistic'
import '@vakao/ui/statistic/style.css'
```

## API

<ApiTable name="Statistic" />
