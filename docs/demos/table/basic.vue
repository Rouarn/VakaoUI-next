<script setup lang="ts">
import { computed, ref } from 'vue'
import { VkTable } from '@/components/table'
import { VkPagination } from '@/components/pagination'
import type { SortOrder, TableColumn, TableRow } from '@/components/table'

const columns: TableColumn[] = [
  { key: 'name', title: '项目', sortable: true, width: 200 },
  { key: 'owner', title: '负责人' },
  { key: 'status', title: '状态', width: 120 },
  { key: 'updated', title: '更新时间', sortable: true, align: 'right' },
]

const rows: TableRow[] = [
  { id: 1, name: '品牌官网', owner: '夏季', status: '已上线', updated: '2026-10-02' },
  { id: 2, name: '数据看板', owner: '周舟', status: '进行中', updated: '2026-10-18' },
  { id: 3, name: '移动端', owner: '陈默', status: '已上线', updated: '2026-09-27' },
  { id: 4, name: '帮助中心', owner: '苏禾', status: '草稿', updated: '2026-11-01' },
]

const sortKey = ref<string | null>(null)
const sortOrder = ref<SortOrder>(null)
const current = ref(1)

const pageRows = computed(() => rows)

const statusClass: Record<string, string> = {
  已上线: 'ok',
  进行中: 'doing',
  草稿: 'draft',
}
</script>

<template>
  <VkTable
    v-model:sort-key="sortKey"
    v-model:sort-order="sortOrder"
    :columns="columns"
    :data="pageRows"
    row-key="id"
    striped
    aria-label="项目列表"
  >
    <template #cell="{ row, column }">
      <span v-if="column.key === 'status'" :class="['status', statusClass[String(row.status)]]">
        {{ row.status }}
      </span>
      <template v-else>{{ row[column.key] }}</template>
    </template>
  </VkTable>

  <VkPagination v-model:current="current" class="pager" :total="rows.length" :page-size="10" />
</template>

<style scoped>
.pager {
  margin-top: 16px;
}

.status {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border: 1px solid;
  border-radius: 999px;
  font-size: 12px;
}

.status.ok {
  border-color: var(--vk-color-success-border);
  background: var(--vk-color-success-bg);
  color: var(--vk-color-success-text);
}

.status.doing {
  border-color: var(--vk-color-info-border);
  background: var(--vk-color-info-bg);
  color: var(--vk-color-info-text);
}

.status.draft {
  border-color: var(--vk-color-warning-border);
  background: var(--vk-color-warning-bg);
  color: var(--vk-color-warning-text);
}
</style>
