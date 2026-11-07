# Popconfirm 气泡确认

二次确认的轻量方案，适合删除、下线等不可逆操作。

## 基础用法

<Demo name="popconfirm/basic" />

## 行为约定

- 面板使用 `role="alertdialog"`，`title` 必填并作为可访问名称。
- 打开时聚焦确认按钮；确认或取消后焦点回到触发元素。
- `confirmType="danger"` 使用 `error` 语义色（紫），同时保留边框与文案，不只靠颜色。
- `loading` 期间确认按钮禁用，由使用方在异步操作结束后关闭。

## 引入

```ts
import { VkPopconfirm } from '@vakao/ui/popconfirm'
import '@vakao/ui/popconfirm/style.css'
```

## API

<ApiTable name="Popconfirm" />
