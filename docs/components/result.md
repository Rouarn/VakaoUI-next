# Result 结果页

用于操作完成、异常或空页面的整块反馈，支持成功、警告、错误、信息与 403 / 404 / 500 状态。

## 基础用法

<Demo name="result/basic" />

## 行为约定

- 未传 `title` 时读取语言包默认文案，随 `ConfigProvider.locale` 切换。
- 根节点使用 `role="status"`，图标为装饰性内容，状态信息由标题与描述承担。
- `extra` 放主要操作，`default` 放补充内容（如错误详情）。
- 403 / 404 / 500 使用大号数字替代图标。

## 引入

```ts
import { VkResult } from '@vakao/ui/result'
import '@vakao/ui/result/style.css'
```

## API

<ApiTable name="Result" />
