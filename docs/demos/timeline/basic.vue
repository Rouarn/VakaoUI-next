<script setup lang="ts">
import { VkTimeline, type TimelineItem } from '@/components/timeline'

const releases: TimelineItem[] = [
  {
    key: 'init',
    title: '初始化仓库',
    content: '搭建 Vite + Vue 3 + TypeScript 工程，确定目录约定。',
    time: '09-18 10:20',
    type: 'default',
  },
  {
    key: 'tokens',
    title: '令牌体系落地',
    content: '四色星语义色与间距、圆角令牌统一从 theme.json 导出。',
    time: '09-26 14:05',
    type: 'success',
  },
  {
    key: 'contrast',
    title: '修复暗色对比度',
    content: '调整边框与文字令牌，通过可读性检查。',
    time: '10-08 09:40',
    type: 'warning',
  },
  {
    key: 'release',
    title: '0.1.0 发布',
    content: '组件与文档站同步上线，覆盖 40+ 个组件。',
    time: '10-21 18:00',
    type: 'success',
  },
]

const pipeline: TimelineItem[] = [
  { key: 'commit', title: '提交', time: '10:00', type: 'default' },
  { key: 'build', title: '构建', time: '10:02', type: 'info' },
  { key: 'deploy', title: '部署', time: '10:05', type: 'success' },
]
</script>

<template>
  <div class="stack">
    <VkTimeline :items="releases" />
    <VkTimeline :items="pipeline" horizontal />
  </div>
</template>

<style scoped>
.stack {
  display: grid;
  gap: 32px;
  max-width: 560px;
}
</style>
