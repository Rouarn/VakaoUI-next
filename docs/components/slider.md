# Slider 滑动条

基于原生 `input[type=range]`，键盘、触屏与读屏器的行为由浏览器保证。

## 基础用法

<Demo name="slider/basic" />

## 键盘

聚焦后：`←` / `→` 按 `step` 调整，`Home` / `End` 跳到两端，`PageUp` / `PageDown` 跨步调整。当前值通过 `aria-valuetext` 播报，可用 `format-tooltip` 自定义（例如 `40%`）。

## 提示气泡

`show-tooltip` 默认为 `true`，在 hover / focus / 拖动时出现。提示为空时请显式关闭。

## API

<ApiTable name="Slider" />
