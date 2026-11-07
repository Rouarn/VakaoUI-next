# Button 按钮

最基础的触发器。支持两种语义（default / primary）、四种变体与三种尺寸。

## 基础用法

<Demo name="button/basic" />

## 变体

<Demo name="button/variants" title="solid / outline / ghost / text" />

## 尺寸与加载

<Demo name="button/loading" />

## 行为约定

- `loading` 会禁用点击、设置 `aria-busy`，并在左侧显示旋转指示器。
- `type="primary"` 使用 `--vk-text-color-on-primary` 作为文字色，亮暗两套都满足 4.5:1。
- 只有图标时请传 `aria-label`；组件不会给未命名的按钮补默认文案。
- 原生 `type` 属性通过 `html-type` 传入，默认 `button`，避免在表单里意外提交。

## 引入

```ts
import { VkButton } from '@vakao/ui/button'
import '@vakao/ui/button/style.css'
```

## API

<ApiTable name="Button" />
