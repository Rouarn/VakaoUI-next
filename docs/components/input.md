# Input 输入框

单行与多行文本输入。错误态同时给出图标、`aria-invalid` 与浅底边框。

## 基础用法

<Demo name="input/basic" />

## 多行、字数与前后缀

<Demo name="input/textarea" />

## 与 Form 配合

```vue
<VkFormItem field="email" label="邮箱">
  <VkInput v-model="model.email" status="error" />
</VkFormItem>
```

FormItem 会为 Input 注入 `id`、`aria-describedby` 与 `aria-invalid`，校验状态自动驱动边框颜色。

## 引入

```ts
import { VkInput } from '@vakao/ui/input'
import '@vakao/ui/input/style.css'
```

## API

<ApiTable name="Input" />
