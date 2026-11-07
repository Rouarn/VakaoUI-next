# Alert 提示

用于页面或区块内的语义提示。错误态同时使用**图标 + 标题文案 + 浅色背景与边框**，不依赖颜色单独传达含义。

## 基础用法

<Demo name="alert/basic" />

## 行为约定

- 容器使用 `role="alert"`，内容变化时会被读屏软件播报。
- 四种语义映射四色星：`success` 黄、`warning` 橙、`error` 紫、`info` 蓝；不新增红/绿色相。
- `closable` 只发出 `close` 事件，是否真正移除由使用方决定。

## 引入

```ts
import { VkAlert } from '@vakao/ui/alert'
import '@vakao/ui/alert/style.css'
```

## API

<ApiTable name="Alert" />
