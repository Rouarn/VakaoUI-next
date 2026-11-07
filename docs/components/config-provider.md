# ConfigProvider 全局配置

下发主题、尺寸、语言与 z-index 基准。渲染为 `display: contents`，不产生额外盒子。

## 切换主题与尺寸

<Demo name="config-provider/theme" />

## 覆盖令牌

```vue
<VkConfigProvider
  theme="light"
  :theme-overrides="{ '--vk-color-primary': '#1477D6', '--vk-radius-medium': '6px' }"
  size="large"
>
  <App />
</VkConfigProvider>
```

`themeOverrides` 写成内联 CSS 变量，只作用于包裹范围，不会污染 `:root`。

## 语言

内置 `zh-CN` 与 `en-US`，覆盖 Empty、Pagination、Popconfirm、Modal 的默认文案。业务文案请自行维护。

```vue
<VkConfigProvider locale="en-US"><App /></VkConfigProvider>
```

## 嵌套

ConfigProvider 可以嵌套：内层只覆盖自己声明的项，其余继承外层。适用于局部暗色区块或独立尺寸区域。

## API

<ApiTable name="ConfigProvider" />
