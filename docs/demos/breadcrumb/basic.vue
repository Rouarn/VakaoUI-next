<script setup lang="ts">
import { VkBreadcrumb, VkBreadcrumbItem } from '@/components/breadcrumb'

const items = [
  { key: 'home', label: '首页', href: '#' },
  { key: 'components', label: '组件', href: '#' },
  { key: 'breadcrumb', label: 'Breadcrumb 面包屑' },
]
</script>

<template>
  <div class="stack">
    <VkBreadcrumb :items="items" />
    <VkBreadcrumb :items="items" separator="›" />
    <VkBreadcrumb>
      <VkBreadcrumbItem href="#">文档</VkBreadcrumbItem>
      <VkBreadcrumbItem href="#">基础</VkBreadcrumbItem>
      <VkBreadcrumbItem current>面包屑</VkBreadcrumbItem>
    </VkBreadcrumb>
  </div>
</template>

<style scoped>
.stack {
  display: grid;
  gap: 12px;
}
</style>
