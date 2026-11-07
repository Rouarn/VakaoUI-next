# Checkbox 复选框

支持选中、半选与禁用。原生 `input[type=checkbox]` 保留，视觉层用 `vk-checkbox__box` 绘制。

## 基础用法

<Demo name="checkbox/basic" />

## 半选

`indeterminate` 只影响视觉与 `aria-checked="mixed"`，不会改变 `modelValue`。全选逻辑由使用方维护，见上方示例。

## 键盘

`Tab` 聚焦，`Space` 切换；焦点轮廓画在视觉盒子上，不影响原生控件的可访问性。

## API

<ApiTable name="Checkbox" />
