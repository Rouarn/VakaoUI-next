# Avatar 头像

展示用户或组织标识，图片加载失败时自动回退到文字或默认图标。

## 基础用法

<Demo name="avatar/basic" />

## 行为约定

- `size` 支持 `small` / `medium` / `large`，也接受数字按 px 处理；未传时继承 `ConfigProvider` 的尺寸。
- 图片加载失败会切换到文字头像，文字取 `alt` 的首个字符。
- 无图片且提供 `alt` 时，根节点使用 `role="img"` 与 `aria-label`，读屏可获取名称；无 `alt` 时视为装饰性内容。
- `round` 切换为圆形，默认是品牌统一的圆角方形。

## 引入

```ts
import { VkAvatar } from '@vakao/ui/avatar'
import '@vakao/ui/avatar/style.css'
```

## API

<ApiTable name="Avatar" />
