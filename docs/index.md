---
layout: page
sidebar: false
aside: false
pageClass: page-home
---

<HomeHero />

<section class="vk-section">
  <div class="vk-section__head">
    <div>
      <p class="vk-section__eyebrow">Principles</p>
      <h2 class="vk-section__title">三条规则，决定它长什么样</h2>
      <p class="vk-section__desc">不做"另一个默认组件库"。视觉先定规矩，组件再往里填。</p>
    </div>
    <a class="vk-section__link" href="/design/tokens">设计令牌 →</a>
  </div>
  <div class="vk-principles">
    <article class="vk-principle">
      <span class="vk-principle__index">01</span>
      <h3 class="vk-principle__title">纸面与墨色</h3>
      <p class="vk-principle__desc">
        底色是一张温白的纸，文字是接近黑的墨。所有层次靠留白和一条发丝线分隔，而不是靠灰色块堆叠。
      </p>
    </article>
    <article class="vk-principle">
      <span class="vk-principle__index">02</span>
      <h3 class="vk-principle__title">朱砂只做强调</h3>
      <p class="vk-principle__desc">
        主色取自品牌橙往上提饱和的朱砂，只出现在按钮、选中态、focus ring 和链接上，出现得少才醒目。
      </p>
    </article>
    <article class="vk-principle">
      <span class="vk-principle__index">03</span>
      <h3 class="vk-principle__title">三档字号，一套节奏</h3>
      <p class="vk-principle__desc">
        标题、正文、说明拉开明显差距；间距一律落在 4px 栅格上，区块之间留够呼吸，不做局部微调。
      </p>
    </article>
  </div>
</section>

<section class="vk-section">
  <div class="vk-section__head">
    <div>
      <p class="vk-section__eyebrow">Components</p>
      <h2 class="vk-section__title">28 个组件，覆盖日常界面</h2>
      <p class="vk-section__desc">全部只消费 <code>--vk-*</code> 令牌，亮暗双主题同源，键盘可达。</p>
    </div>
    <a class="vk-section__link" href="/components/">全部组件 →</a>
  </div>
  <ComponentIndex />
</section>

<section class="vk-section">
  <div class="vk-section__head">
    <div>
      <p class="vk-section__eyebrow">Color</p>
      <h2 class="vk-section__title">一纸、一墨、四点星</h2>
      <p class="vk-section__desc">状态色沿用四色星映射，不引入红绿新色相；错误态靠图标、文案与边框共同表达。</p>
    </div>
    <a class="vk-section__link" href="/design/tokens">取色理由 →</a>
  </div>
  <SwatchGrid label="品牌色板（含 0.2.0 新增的朱砂强调色）" />
</section>

<div class="vk-install-block">

## 安装

```bash
pnpm add @vakao/ui
```

```ts
import { createApp } from 'vue'
import VaKaoUI from '@vakao/ui'
import '@vakao/ui/styles.css'
import App from './App.vue'

createApp(App).use(VaKaoUI).mount('#app')
```

组件通过 `VkConfigProvider` 提供主题、尺寸与语言；不包裹时使用默认令牌，仍然可用。
需要换肤时只覆盖令牌即可，不需要改组件样式。

::: tip 从 0.2.0 开始
强调色由低饱和蓝绿改为朱砂 `#C43A21`，字号、间距、圆角与阴影同步重定。新项目直接按本版本接入即可。
:::

</div>
