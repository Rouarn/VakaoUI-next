# Descriptions 描述列表

以字段名 / 字段值的形式展示详情，支持多列、跨列与表格化边框。

## 基础用法

<Demo name="descriptions/basic" />

## 行为约定

- 使用 `dl` / `dt` / `dd` 语义结构，读屏可按“字段-值”成对读取。
- `column` 控制每行列数；`span` 让单项跨列，移动端自动降为单列。
- 需要自定义值时使用 `#item-{key}` 插槽，`key` 未提供时回退为索引。
- `bordered` 使用 1px 网格背景形成表格边框，避免相邻单元格双线。

## 引入

```ts
import { VkDescriptions } from '@vakao/ui/descriptions'
import '@vakao/ui/descriptions/style.css'
```

## API

<ApiTable name="Descriptions" />
