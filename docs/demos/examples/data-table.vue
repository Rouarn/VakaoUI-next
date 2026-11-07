<script setup lang="ts">
import { computed, ref } from 'vue'
import { VkTable } from '@/components/table'
import { VkSelect } from '@/components/select'
import { VkInput } from '@/components/input'
import { VkPagination } from '@/components/pagination'
import { VkButton } from '@/components/button'
import type { SortOrder, TableColumn, TableRow } from '@/components/table'

const allRows: TableRow[] = [
  {
    id: 1,
    name: '品牌官网',
    owner: '夏季',
    status: '已上线',
    progress: 100,
    updated: '2026-10-02',
  },
  { id: 2, name: '数据看板', owner: '周舟', status: '进行中', progress: 62, updated: '2026-10-18' },
  { id: 3, name: '移动端', owner: '陈默', status: '已上线', progress: 100, updated: '2026-09-27' },
  { id: 4, name: '帮助中心', owner: '苏禾', status: '草稿', progress: 18, updated: '2026-11-01' },
  { id: 5, name: '活动页', owner: '夏季', status: '进行中', progress: 44, updated: '2026-10-30' },
  { id: 6, name: '设计规范', owner: '周舟', status: '草稿', progress: 9, updated: '2026-11-03' },
  { id: 7, name: '开放平台', owner: '陈默', status: '进行中', progress: 71, updated: '2026-10-21' },
]

const columns: TableColumn[] = [
  { key: 'name', title: '项目', sortable: true, width: 200 },
  { key: 'owner', title: '负责人', width: 100 },
  { key: 'status', title: '状态', width: 110 },
  { key: 'progress', title: '进度', width: 140 },
  { key: 'updated', title: '更新时间', sortable: true, align: 'right', width: 120 },
]

const statusOptions = [
  { label: '全部状态', value: 'all' },
  { label: '已上线', value: '已上线' },
  { label: '进行中', value: '进行中' },
  { label: '草稿', value: '草稿' },
]

const nav = [
  {
    label: '概览',
    active: false,
    paths: ['M2.5 2.5h4.5v4.5H2.5z', 'M9 2.5h4.5v4.5H9z', 'M2.5 9h4.5v4.5H2.5z', 'M9 9h4.5v4.5H9z'],
  },
  { label: '项目', active: true, paths: ['M2.5 3.5h11v9h-11z', 'M2.5 6.5h11', 'M6 3.5v3'] },
  {
    label: '团队',
    active: false,
    paths: [
      'M6 7.5a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5z',
      'M1.75 13c0-1.9 1.9-3.25 4.25-3.25S10.25 11.1 10.25 13',
      'M11 3.4a2 2 0 0 1 0 3.9',
      'M12 9.9c1.35.35 2.25 1.3 2.25 3.1',
    ],
  },
  { label: '报表', active: false, paths: ['M2.5 13V8', 'M8 13V3', 'M13.5 13V6'] },
]

const filter = ref<string | number | null>('all')
const keyword = ref('')
const sortKey = ref<string | null>(null)
const sortOrder = ref<SortOrder>(null)
const current = ref(1)
const pageSize = ref(5)

const filtered = computed(() =>
  allRows.filter((row) => {
    const matchStatus = filter.value === 'all' || row.status === filter.value
    const matchKeyword = !keyword.value || String(row.name).includes(keyword.value)
    return matchStatus && matchKeyword
  }),
)

const pageRows = computed(() =>
  filtered.value.slice((current.value - 1) * pageSize.value, current.value * pageSize.value),
)

const statusClass: Record<string, string> = {
  已上线: 'ok',
  进行中: 'doing',
  草稿: 'draft',
}
</script>

<template>
  <div class="app">
    <aside class="app__nav">
      <div class="app__brand">
        <span class="app__logo">VaKao</span>
        <span class="app__workspace">设计与研发</span>
      </div>

      <nav class="app__menu" aria-label="主导航">
        <a
          v-for="item in nav"
          :key="item.label"
          class="app__menu-item"
          :class="{ 'is-active': item.active }"
          href="#"
          @click.prevent
        >
          <svg class="app__menu-icon" viewBox="0 0 16 16" aria-hidden="true">
            <path v-for="d in item.paths" :key="d" :d="d" />
          </svg>
          {{ item.label }}
        </a>
      </nav>

      <div class="app__nav-foot">
        <span class="app__avatar">林</span>
        <div>
          <div class="app__user">夏季</div>
          <div class="app__user-mail">linyi@vakao.cn</div>
        </div>
      </div>
    </aside>

    <div class="app__main">
      <header class="app__top">
        <div class="app__crumbs">工作区 <span>/</span> <strong>项目</strong></div>
        <div class="app__top-actions">
          <VkInput v-model="keyword" size="small" placeholder="搜索项目…" clearable />
          <span class="app__avatar app__avatar--sm">林</span>
        </div>
      </header>

      <div class="app__content">
        <div class="app__head">
          <div>
            <h1 class="app__title">项目</h1>
            <p class="app__desc">共 {{ allRows.length }} 个项目，最近一次同步 2 分钟前。</p>
          </div>
          <VkButton type="primary">新建项目</VkButton>
        </div>

        <div class="stats">
          <div class="stat">
            <span class="stat__label">进行中</span>
            <span class="stat__value">3</span>
            <span class="stat__hint">较上周 +1</span>
          </div>
          <div class="stat">
            <span class="stat__label">本月上线</span>
            <span class="stat__value">2</span>
            <span class="stat__hint">目标 4 个</span>
          </div>
          <div class="stat">
            <span class="stat__label">待评审</span>
            <span class="stat__value">1</span>
            <span class="stat__hint">等待设计确认</span>
          </div>
        </div>

        <section class="panel">
          <div class="panel__bar">
            <div class="panel__filters">
              <VkInput
                v-model="keyword"
                size="small"
                placeholder="搜索项目名称"
                clearable
                class="panel__search"
              />
              <VkSelect
                v-model="filter"
                size="small"
                :options="statusOptions"
                aria-label="按状态筛选"
              />
            </div>
            <span class="panel__count">{{ filtered.length }} 条结果</span>
          </div>

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
              <span
                v-if="column.key === 'status'"
                :class="['status', statusClass[String(row.status)]]"
              >
                {{ row.status }}
              </span>
              <span v-else-if="column.key === 'progress'" class="progress">
                <span class="progress__track">
                  <span class="progress__fill" :style="{ width: `${row.progress}%` }" />
                </span>
                <span class="progress__num">{{ row.progress }}%</span>
              </span>
              <span v-else-if="column.key === 'name'" class="cell-name">{{ row.name }}</span>
              <template v-else>{{ row[column.key] }}</template>
            </template>
          </VkTable>

          <div class="panel__foot">
            <VkPagination
              v-model:current="current"
              v-model:page-size="pageSize"
              :total="filtered.length"
              :page-size-options="[5, 10, 20]"
              show-total
            />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app {
  display: grid;
  grid-template-columns: 208px minmax(0, 1fr);
  min-height: 680px;
  background: var(--vk-color-body);
  color: var(--vk-text-color-1);
}

.app__nav {
  display: flex;
  flex-direction: column;
  gap: 26px;
  padding: 22px 16px;
  border-right: 1px solid var(--vk-border-color);
  background: var(--vk-color-card);
}

.app__brand {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0 8px;
}

.app__logo {
  font-family: var(--vk-font-family-display);
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.app__workspace {
  font-size: 11px;
  color: var(--vk-text-color-3);
}

.app__menu {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.app__menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 34px;
  padding: 0 10px;
  border-radius: var(--vk-radius-small);
  color: var(--vk-text-color-2);
  font-size: 13px;
  text-decoration: none;
  transition: background var(--vk-motion-fast) var(--vk-easing-standard);
}

.app__menu-item:hover {
  background: var(--vk-fill-color);
}

.app__menu-item.is-active {
  background: var(--vk-color-primary-soft);
  color: var(--vk-color-primary-soft-text);
  font-weight: 600;
}

.app__menu-icon {
  flex: none;
  width: 15px;
  height: 15px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.4;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0.85;
}

.app__nav-foot {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
  padding: 12px 8px 0;
  border-top: 1px solid var(--vk-border-color);
}

.app__avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--vk-color-primary-soft);
  color: var(--vk-color-primary-soft-text);
  font-size: 12px;
  font-weight: 600;
}

.app__avatar--sm {
  width: 26px;
  height: 26px;
}

.app__user {
  font-size: 12.5px;
  font-weight: 500;
}

.app__user-mail {
  font-size: 11px;
  color: var(--vk-text-color-3);
}

.app__main {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.app__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  height: 56px;
  padding: 0 28px;
  border-bottom: 1px solid var(--vk-border-color);
  background: var(--vk-color-body);
}

.app__crumbs {
  font-size: 12px;
  color: var(--vk-text-color-3);
}

.app__crumbs strong {
  color: var(--vk-text-color-1);
  font-weight: 500;
}

.app__crumbs span {
  padding: 0 4px;
  opacity: 0.6;
}

.app__top-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.app__content {
  flex: 1;
  padding: 28px;
}

.app__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 22px;
}

.app__title {
  margin: 0;
  font-family: var(--vk-font-family-display);
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.025em;
}

.app__desc {
  margin: 6px 0 0;
  font-size: 12.5px;
  color: var(--vk-text-color-2);
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 22px;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 18px;
  border: 1px solid var(--vk-border-color);
  border-radius: var(--vk-radius-medium);
  background: var(--vk-color-card);
}

.stat__label {
  font-size: 11.5px;
  color: var(--vk-text-color-3);
}

.stat__value {
  font-family: var(--vk-font-family-display);
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.stat__hint {
  font-size: 11px;
  color: var(--vk-text-color-2);
}

.panel {
  border: 1px solid var(--vk-border-color);
  border-radius: var(--vk-radius-large);
  background: var(--vk-color-card);
  overflow: hidden;
}

.panel__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--vk-border-color);
}

.panel__filters {
  display: flex;
  align-items: center;
  gap: 8px;
}

.panel__search {
  width: 200px;
}

.panel__count {
  font-size: 11.5px;
  color: var(--vk-text-color-3);
}

.panel__foot {
  display: flex;
  justify-content: flex-end;
  padding: 12px 16px;
  border-top: 1px solid var(--vk-border-color);
}

.cell-name {
  font-weight: 500;
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 2px 9px;
  border: 1px solid;
  border-radius: var(--vk-radius-full);
  font-size: 11.5px;
  line-height: 18px;
  white-space: nowrap;
}

.status::before {
  content: '';
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
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

.progress {
  display: flex;
  align-items: center;
  gap: 8px;
}

.progress__track {
  flex: 1;
  height: 5px;
  border-radius: var(--vk-radius-full);
  background: var(--vk-fill-color-hover);
  overflow: hidden;
}

.progress__fill {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--vk-color-primary);
}

.progress__num {
  font-size: 11.5px;
  color: var(--vk-text-color-2);
  font-variant-numeric: tabular-nums;
}

@media (max-width: 900px) {
  .app {
    grid-template-columns: minmax(0, 1fr);
  }

  .app__nav {
    display: none;
  }

  .stats {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
