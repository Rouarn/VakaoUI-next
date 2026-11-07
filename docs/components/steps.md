# Steps 步骤条

展示任务的分步进度，支持水平 / 垂直方向与当前步骤状态。

## 基础用法

<Demo name="steps/basic" />

## 行为约定

- 根节点为有序列表 `ol`，当前项输出 `aria-current="step"`。
- 索引小于 `current` 的步骤固定为完成态，当前项使用 `status`，后续为等待态。
- 序号圆点对装饰性图标设置 `aria-hidden`，可读文本由标题与描述承担。
- 水平模式为等分列，窄屏下建议切换 `direction="vertical"`。

## 引入

```ts
import { VkSteps } from '@vakao/ui/steps'
import '@vakao/ui/steps/style.css'
```

## API

<ApiTable name="Steps" />
