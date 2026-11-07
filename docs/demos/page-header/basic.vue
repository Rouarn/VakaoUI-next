<script setup lang="ts">
import { ref } from 'vue'
import { VkBreadcrumb } from '@/components/breadcrumb'
import { VkButton } from '@/components/button'
import { VkPageHeader } from '@/components/page-header'

const message = ref('')

const items = [
  { key: 'home', label: '首页', href: '#' },
  { key: 'components', label: '组件', href: '#' },
  { key: 'page-header', label: 'PageHeader 页头' },
]
</script>

<template>
  <div class="demo">
    <VkPageHeader
      title="组件详情"
      subtitle="查看并管理当前组件的配置与发布状态。"
      @back="message = '已触发 back 事件'"
    >
      <template #breadcrumb>
        <VkBreadcrumb :items="items" />
      </template>
      <template #extra>
        <VkButton size="small">编辑</VkButton>
      </template>
      <template #footer>
        <VkButton type="primary">保存</VkButton>
        <VkButton>取消</VkButton>
      </template>
    </VkPageHeader>

    <p v-if="message" class="demo-hint">{{ message }}</p>
  </div>
</template>

<style scoped>
.demo {
  display: grid;
  gap: 12px;
}

.demo-hint {
  margin: 0;
  color: var(--vk-text-color-3);
  font-size: var(--vk-font-size-small);
}
</style>
