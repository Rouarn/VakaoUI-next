# Radio 单选框

`VkRadioGroup` 负责值与禁用态，`VkRadio` 负责单个选项。组容器使用 `role="radiogroup"`，同组共享原生 `name`。

## 基础用法

<Demo name="radio/basic" />

## 键盘

原生 radio 组内可以用方向键在选项间移动，`Space` 选中。`RadioGroup` 会给每个 `VkRadio` 注入相同的 `name`，保证浏览器原生行为。

## 独立使用

不放在 Group 里时，`VkRadio` 可以通过 `v-model` 使用布尔值。多数场景建议使用 Group，以获得统一的名称与方向键行为。

## API

### RadioGroup

<ApiTable name="RadioGroup" />

### Radio

<ApiTable name="Radio" />
