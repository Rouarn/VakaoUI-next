# InputNumber 数字输入框

带步进按钮与键盘支持的数字输入，内部使用 `role="spinbutton"` 语义。

## 基础用法

<Demo name="input-number/basic" />

## 行为

- 失焦、回车时提交并夹取到 `min` / `max`，`precision` 决定小数位。
- `ArrowUp` / `ArrowDown` 按 `step` 增减，`Enter` 提交。
- 增减按钮在到达边界时自动禁用，并带 `aria-label`。
- 空输入提交为 `null`，不会变成 `0`。

## API

<ApiTable name="InputNumber" />
