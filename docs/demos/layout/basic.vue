<script setup lang="ts">
import { ref } from 'vue'
import {
  VkLayout,
  VkLayoutContent,
  VkLayoutFooter,
  VkLayoutHeader,
  VkLayoutSider,
} from '@/components/layout'
import { VkButton } from '@/components/button'
import { VkText } from '@/components/typography'

const collapsed = ref(false)
</script>

<template>
  <div class="frame">
    <VkLayout has-sider>
      <VkLayoutSider :collapsed="collapsed" :width="200" :collapsed-width="56">
        <div class="brand">{{ collapsed ? 'VK' : 'VaKao UI' }}</div>
        <div class="nav">
          <a class="nav-item is-active" href="#">概览</a>
          <a class="nav-item" href="#">组件</a>
          <a class="nav-item" href="#">设置</a>
        </div>
      </VkLayoutSider>

      <VkLayout>
        <VkLayoutHeader>
          <VkButton size="small" variant="ghost" @click="collapsed = !collapsed">折叠</VkButton>
          <span class="title">工作台</span>
        </VkLayoutHeader>
        <VkLayoutContent>
          <VkText type="secondary">
            内容区自适应剩余高度，Sider 折叠时只改变宽度，不重排内容结构。
          </VkText>
        </VkLayoutContent>
        <VkLayoutFooter>VaKao UI · 0.1.0</VkLayoutFooter>
      </VkLayout>
    </VkLayout>
  </div>
</template>

<style scoped>
.frame {
  height: 340px;
  overflow: hidden;
  border: 1px solid var(--vk-border-color);
  border-radius: var(--vk-radius-large);
}

.frame :deep(.vk-layout) {
  height: 100%;
}

.brand {
  display: flex;
  align-items: center;
  height: 64px;
  padding: 0 16px;
  color: var(--vk-color-primary);
  font-family: var(--vk-font-family-display);
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
}

.nav {
  display: grid;
  gap: 2px;
  padding: 8px;
}

.nav-item {
  padding: 8px 12px;
  border-radius: var(--vk-radius-small);
  color: var(--vk-text-color-2);
  font-size: 13px;
  text-decoration: none;
  white-space: nowrap;
}

.nav-item.is-active {
  background: var(--vk-color-primary-soft);
  color: var(--vk-color-primary-soft-text);
}

.title {
  margin-left: 12px;
  font-weight: 700;
}
</style>
