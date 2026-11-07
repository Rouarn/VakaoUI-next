<script setup lang="ts">
import { VkAnchor, type AnchorItem } from '@/components/anchor'

const items: AnchorItem[] = [
  { key: 'overview', href: '#anchor-demo-overview', title: '概览' },
  { key: 'install', href: '#anchor-demo-install', title: '安装' },
  {
    key: 'usage',
    href: '#anchor-demo-usage',
    title: '用法',
    children: [
      { key: 'basic', href: '#anchor-demo-basic', title: '基础示例' },
      { key: 'props', href: '#anchor-demo-props', title: '属性说明' },
    ],
  },
]
</script>

<template>
  <div class="wrapper">
    <div id="anchor-demo-scroll" class="scroller">
      <section id="anchor-demo-overview" class="section">
        <h4 class="section__title">概览</h4>
        <p class="section__text">
          锚点导航适合较长的文档页面，点击后滚动到对应章节，并在滚动过程中自动高亮当前位置。
        </p>
      </section>

      <section id="anchor-demo-install" class="section">
        <h4 class="section__title">安装</h4>
        <p class="section__text">
          从组件目录引入 Anchor 后，把章节标题的 id 与 items 中的 href 对应起来即可。
        </p>
      </section>

      <section id="anchor-demo-usage" class="section">
        <h4 class="section__title">用法</h4>
        <p class="section__text">
          传入 container 后监听局部滚动容器，offsetTop 用于控制目标距离容器顶部的位置。
        </p>
        <section id="anchor-demo-basic" class="section section--child">
          <h5 class="section__title">基础示例</h5>
          <p class="section__text">点击右侧导航，观察容器滚动与左侧竖条高亮。</p>
        </section>
        <section id="anchor-demo-props" class="section section--child">
          <h5 class="section__title">属性说明</h5>
          <p class="section__text">affix 控制 sticky 吸附，smooth 控制滚动是否平滑。</p>
        </section>
      </section>
    </div>

    <VkAnchor
      class="anchor"
      container="#anchor-demo-scroll"
      :items="items"
      :offset-top="8"
      :smooth="true"
    />
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  gap: 24px;
  max-width: 640px;
}

.scroller {
  box-sizing: border-box;
  flex: 1;
  min-width: 0;
  height: 240px;
  padding: 0 16px;
  overflow-y: auto;
  border: 1px solid var(--vk-border-color);
  border-radius: var(--vk-radius-large);
}

.section {
  padding: 16px 0;
  border-bottom: 1px dashed var(--vk-divider-color);
  scroll-margin-top: 8px;
}

.section--child {
  padding-left: 16px;
}

.section__title {
  margin: 0 0 8px;
  color: var(--vk-text-color-1);
  font-size: 14px;
}

.section__text {
  margin: 0;
  color: var(--vk-text-color-2);
  font-size: 13px;
  line-height: 1.6;
}

.anchor {
  flex: none;
  width: 132px;
}
</style>
