# 暗色模式

## 为什么不是简单反色

四色星在亮色下饱和度已经很高，直接反色会得到发灰的结果。暗色主题的做法是：

- 背景压到 `#121210`，卡片升到 `#1A1916`，浮层再升到 `#201E1A`，用明度差而不是阴影建立层级。
- 文字从 `#171512` 换成 `#F4F1E9`，次级文字从 `#57524A` 换成 `#BDB7AB`，注释从 `#736D62` 换成 `#928C80`。
- 主色从朱砂 `#C43A21` 提亮成 `#FF8A5B`，按钮文字改成深墨 `#171210`：亮色是"深底白字"，暗色是"亮底深字"。
- 状态色保持同一色相，只调整浅底与文字：success 用 `#EDDF55` + `#3D3A20` 底，error 用 `#A27FC2` + `#332B36` 底。

完整数值见 [暗色设计令牌](/design/tokens#暗色覆盖)。

## 三种触发方式

```vue
<!-- 固定 -->
<VkConfigProvider theme="dark"><App /></VkConfigProvider>

<!-- 跟随系统 -->
<VkConfigProvider theme="auto"><App /></VkConfigProvider>

<!-- 手动切换 -->
<VkConfigProvider :theme="isDark ? 'dark' : 'light'"><App /></VkConfigProvider>
```

## 与 Tailwind / 业务样式共存

组件自身只读取 `--vk-*`，不会修改 `body` 背景或字体。业务侧需要做的只有两件事：

```css
body {
  background: var(--vk-color-body);
  color: var(--vk-text-color-1);
  font-family: var(--vk-font-family);
}
```

如果页面有独立的暗色类名（例如 `.dark`），把 ConfigProvider 的 `theme` 与它绑定即可，不需要复制变量。

## 避免闪烁

SSR 场景下若首屏就要暗色，建议在 `<head>` 中根据用户偏好或 cookie 写入 `data-vk-theme`，再把 ConfigProvider 的 `theme` 固定为对应值，避免客户端切换造成闪白。

## 对比度

亮暗两套主色、状态色的正文对比度都在 4.5:1 以上；大号文字与图标在 3:1 以上。具体数值与计算方式见 [状态色与对比度](/design/status-colors)。
