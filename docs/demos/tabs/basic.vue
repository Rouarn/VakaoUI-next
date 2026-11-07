<script setup lang="ts">
import { ref } from 'vue'
import { VkTabs } from '@/components/tabs'
import { VkAlert } from '@/components/alert'

const active = ref('overview')
const items = [
  { key: 'overview', label: '概览' },
  { key: 'members', label: '成员' },
  { key: 'settings', label: '设置' },
  { key: 'billing', label: '账单', disabled: true },
]
</script>

<template>
  <VkTabs v-model="active" :items="items" aria-label="项目视图">
    <template #panel-overview>
      <VkAlert type="info" title="概览" description="项目的基本信息与最近动态。" />
    </template>
    <template #panel-members>
      <VkAlert type="success" title="成员" description="这里展示成员列表与权限。" />
    </template>
    <template #panel-settings>
      <VkAlert type="warning" title="设置" description="修改设置会影响所有成员。" />
    </template>
  </VkTabs>
</template>
