<script setup lang="ts">
import { VkSteps } from '@/components/steps'

const horizontal = [
  { key: 'draft', title: '草稿', description: '填写基础信息' },
  { key: 'review', title: '评审', description: '产品与设计确认' },
  { key: 'build', title: '开发', description: '组件与文档' },
  { key: 'release', title: '发布', description: '覆盖 0.1.0' },
]

const vertical = [
  { key: 'install', title: '安装依赖' },
  { key: 'typecheck', title: '类型检查' },
  { key: 'test', title: '单元测试' },
  { key: 'deploy', title: '部署文档站' },
]
</script>

<template>
  <div class="stack">
    <VkSteps :items="horizontal" :current="2" />
    <VkSteps :items="vertical" :current="1" status="error" direction="vertical" />
  </div>
</template>

<style scoped>
.stack {
  display: grid;
  gap: 32px;
  max-width: 720px;
}
</style>
