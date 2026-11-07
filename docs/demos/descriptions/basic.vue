<script setup lang="ts">
import { VkDescriptions } from '@/components/descriptions'
import { VkTag } from '@/components/tag'

const items = [
  { key: 'name', label: '项目', value: 'VaKao UI' },
  { key: 'version', label: '版本', value: '0.1.0' },
  { key: 'license', label: '许可', value: '私有' },
  { key: 'registry', label: '制品仓库', value: '云效私有 npm' },
  { key: 'status', label: '状态', value: 'stable' },
  { key: 'updated', label: '更新时间', value: '2026-11-07' },
]
</script>

<template>
  <div class="stack">
    <VkDescriptions :items="items" :column="3" />

    <VkDescriptions :items="items.slice(0, 4)" :column="2" bordered label-placement="top">
      <template #item-status>
        <VkTag type="success">已发布</VkTag>
      </template>
    </VkDescriptions>
  </div>
</template>

<style scoped>
.stack {
  display: grid;
  gap: 24px;
}
</style>
