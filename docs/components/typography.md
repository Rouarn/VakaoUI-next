# Typography 排版

统一正文、标题与链接的字号阶梯与语义色。所有文本都基于品牌字号令牌，标题使用展示字体，行高与字距在浅色、深色下保持一致。

## 基础用法

<Demo name="typography/basic" />

## 使用方式

- `VkTitle` 负责 1–6 级标题，渲染为对应的 `h1`–`h6`，不改变文档大纲。
- `VkText` 与 `VkTypography` 共用一套修饰符：`type`、`strong`、`italic`、`underline`、`deleted`、`code`、`truncate`。
- `VkLink` 默认使用朱红主色；`target="_blank"` 时自动补 `rel="noopener noreferrer"`；`disabled` 会移除 `href` 并退出键盘焦点。
- 语义色只映射品牌四色星，不新增红/绿色相。

## 引入

```ts
import { VkTypography, VkTitle, VkText, VkLink } from '@vakao/ui/typography'
import '@vakao/ui/typography/style.css'
```

## API

### Typography

<ApiTable name="Typography" />

### Title

<ApiTable name="Title" />

### Text

<ApiTable name="Text" />

### Link

<ApiTable name="Link" />
