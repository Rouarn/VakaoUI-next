# Anchor 锚点

在长页面或局部滚动容器中提供页内跳转，并根据滚动位置自动高亮当前章节。

## 基础用法

<Demo name="anchor/basic" />

## 行为约定

- 根节点为 `nav`，默认无障碍名称为「页内导航」，可通过 `ariaLabel` 覆盖；激活项输出 `aria-current="location"`。
- 点击仅拦截 `#` 开头的页内链接；传入 `container` 时滚动该容器，否则滚动 `window`，`smooth` 控制是否平滑滚动。
- 滚动时按各目标相对容器顶部的位置计算，取最后一个越过 `offsetTop` 的项作为激活项，无匹配时清空激活态。
- `affix` 默认开启，使用 `position: sticky` 与 `--vk-space-4` 顶部偏移；激活项左侧竖条与文字使用 `--vk-color-primary`。
- 仅在 `onMounted` 后绑定滚动与尺寸监听，卸载时移除监听并取消未执行的 `requestAnimationFrame`，SSR 安全。

## 引入

```ts
import { VkAnchor } from '@vakao/ui/anchor'
import '@vakao/ui/anchor/style.css'
```

## API

<ApiTable name="Anchor" />
