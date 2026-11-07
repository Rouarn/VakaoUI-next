<script setup lang="ts">
import { VkAffix } from '@/components/affix'
</script>

<template>
  <div class="stack">
    <div class="frame">
      <div id="affix-demo-top" class="scroller">
        <VkAffix target="#affix-demo-top">
          <div class="badge">offsetTop 顶部固定</div>
        </VkAffix>
        <div v-for="index in 16" :key="index" class="row">
          第 {{ index }} 行内容，在容器内滚动查看固定状态切换
        </div>
      </div>
    </div>

    <div class="frame">
      <div id="affix-demo-bottom" class="scroller">
        <div v-for="index in 14" :key="index" class="row">
          第 {{ index }} 行内容，滚动接近尾部时贴底栏归位
        </div>
        <VkAffix target="#affix-demo-bottom" :offset-bottom="16">
          <div class="badge">offsetBottom 贴底固定</div>
        </VkAffix>
        <div class="tail">尾部内容：继续向下滚动，贴底栏会回到文档流中。</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stack {
  display: grid;
  gap: 24px;
  max-width: 560px;
}

.frame {
  overflow: hidden;
  border: 1px solid var(--vk-border-color);
  border-radius: var(--vk-radius-large);
}

.scroller {
  box-sizing: border-box;
  height: 260px;
  padding: 8px 16px;
  overflow-y: auto;
}

.row {
  padding: 8px 0;
  border-bottom: 1px dashed var(--vk-divider-color);
  color: var(--vk-text-color-2);
  font-size: 13px;
}

.badge {
  display: inline-flex;
  align-items: center;
  margin: 4px 0;
  padding: 6px 12px;
  border-radius: var(--vk-radius-full);
  background: var(--vk-color-primary-soft);
  color: var(--vk-color-primary);
  font-size: 12px;
  font-weight: var(--vk-font-weight-strong);
}

.tail {
  padding: 16px 0;
  color: var(--vk-text-color-3);
  font-size: 13px;
}
</style>
