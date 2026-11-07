# Countdown 倒计时

基于时间戳计算的倒计时，支持暂停、重置、小数秒与自定义渲染。

## 基础用法

<Demo name="countdown/basic" />

## 格式化

`format` 支持以下占位符，未传时按剩余时间自动输出：

| 占位符 | 含义               | 示例 |
| ------ | ------------------ | ---- |
| `DD`   | 天数               | `02` |
| `HH`   | 小时（按天取余）   | `09` |
| `mm`   | 分钟（按小时取余） | `05` |
| `ss`   | 秒（按分钟取余）   | `30` |
| `SSS`  | 秒的小数部分       | `5`  |

未传 `format` 时：`days > 0` 输出 `x 天 HH:mm:ss`，否则输出 `HH:mm:ss`；`precision > 0` 时默认带上小数秒。

## 行为约定

- `duration` 单位为毫秒；`active` 置为 `false` 会暂停并保留剩余时间，恢复后继续。
- `finish` 在一次倒计时归零时只触发一次；`restart` 事件在调用暴露的 `restart()` 时触发。
- 计时基于 `Date.now()` 校准，页面切回前台不会累积漂移。
- 服务端渲染输出初始时长文本，挂载后才开始计时。

## 引入

```ts
import { VkCountdown } from '@vakao/ui/countdown'
import '@vakao/ui/countdown/style.css'
```

## API

<ApiTable name="Countdown" />
