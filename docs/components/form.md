# Form 表单

表单容器与表单项。校验基于 `async-validator`，与控件通过 context 自动关联 id、`aria-describedby` 与 `aria-invalid`。

## 基础用法

<Demo name="form/validation" />

## 纵向布局与实例校验

<Demo name="form/vertical" title="ref.validate()" />

## 规则

| 写法                                            | 说明                                       |
| ----------------------------------------------- | ------------------------------------------ |
| `{ required: true, message: '必填' }`           | 必填                                       |
| `{ type: 'email' }`                             | 类型校验，支持 async-validator 的全部 type |
| `{ min: 6, max: 20 }`                           | 长度 / 数值范围                            |
| `{ pattern: /^\d+$/ }`                          | 正则                                       |
| `{ validator: (rule, value, callback) => ... }` | 自定义校验                                 |
| `trigger: 'blur' \| 'change'`                   | 仅在指定时机触发                           |

表单级 `rules` 与 FormItem 的 `rules` 会按字段合并，FormItem 的同字段规则优先。

## 实例方法

```ts
const formRef = ref<FormInstance>()

await formRef.value.validate() // 全部校验，返回 boolean
await formRef.value.validateField('email')
formRef.value.clearValidate()
formRef.value.resetFields()
```

## 错误文案的可访问性

FormItem 自动生成 `id` 与 `aria-describedby`，控件通过 `useFormControl()` 接入即可继承。错误反馈同时包含图标、文案与边框 / 浅底，不只依赖颜色。

## API

### Form

<ApiTable name="Form" />

### FormItem

<ApiTable name="FormItem" />
