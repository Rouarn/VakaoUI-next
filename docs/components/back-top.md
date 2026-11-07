# BackTop 回到顶部

滚动超过阈值后出现，点击平滑回到顶部；既支持整页滚动，也支持局部滚动容器。

## 基础用法

<Demo name="back-top/basic" />

## 行为约定

- 默认监听 `window`；传入 `target`（选择器或元素）后改为监听该容器。
- 配合局部滚动时使用 `position="absolute"`，把组件放进 `position: relative` 的定位容器。
- 只在 `onMounted` 后绑定滚动监听，SSR 阶段不渲染按钮。
- 按钮带本地化无障碍名称，支持键盘触发。

## 引入

```ts
import { VkBackTop } from '@vakao/ui/back-top'
import '@vakao/ui/back-top/style.css'
```

## API

<ApiTable name="BackTop" />
