# Upload 上传

支持点击或拖拽选择文件，内置类型、大小与数量校验，可通过 `customRequest` 接入自定义上传逻辑。

## 基础用法

<Demo name="upload/basic" />

## 行为约定

- 隐藏原生文件输入框，触发区支持鼠标点击与键盘 `Enter` / `Space` 打开选择。
- 传入 `fileList` 时列表受控，所有变更通过 `update:fileList` 回传；未传入时使用 `defaultFileList` 维护内部状态。
- `accept` 支持 `.png`、`image/*` 以及逗号分隔的组合；`maxSize` / `minSize` 以字节为单位；`maxCount` 与现有列表合并判断。
- 校验失败会触发 `reject(file, reason)`，数量超限时额外触发 `exceed(files, fileList)`。
- 提供 `customRequest` 且 `autoUpload` 为 `true` 时自动上传；返回 Promise 时 resolve 视为成功、reject 视为失败。
- 上传中的文件行展示 `role="progressbar"` 进度条与百分比，失败文件可点击“重新上传”重试。
- 通过组件实例可调用 `submit()`、`retry(file?)`、`clear()`，并访问隐藏输入框 `input`。

## 引入

```ts
import { VkUpload } from '@vakao/ui/upload'
import '@vakao/ui/upload/style.css'
```

## API

<ApiTable name="Upload" />
