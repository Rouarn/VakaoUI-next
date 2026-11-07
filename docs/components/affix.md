# Affix 固定

在滚动过程中把内容固定在视口顶部或底部，常用于侧边工具栏、筛选区与提交操作区。

## 基础用法

<Demo name="affix/basic" />

## 行为约定

- 默认监听 `window`；传入 `target` 后改为监听对应滚动容器，选择器无匹配时回退到 `window`。
- 未设置 `offsetBottom` 时按内容相对容器顶部的位置与 `offsetTop` 判断固定；设置后按内容底部与容器可视区底部判断贴底固定。
- `fixed` 定位始终相对视口，局部滚动容器示例仅用于演示状态切换；固定时外层保留占位，宽高取自固定前的内容尺寸，避免滚动时布局跳动。
- 组件只负责定位，不包裹额外的交互语义；内容自身的可访问名称与 `aria` 属性由业务侧提供。
- 仅在 `onMounted` 后绑定滚动与尺寸监听，`onBeforeUnmount` 移除监听并取消未执行的 `requestAnimationFrame`，SSR 阶段不访问 DOM。

## 引入

```ts
import { VkAffix } from '@vakao/ui/affix'
import '@vakao/ui/affix/style.css'
```

## API

<ApiTable name="Affix" />
