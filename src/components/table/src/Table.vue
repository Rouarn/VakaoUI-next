<script setup lang="ts">
import { computed } from 'vue'
import { useFormControl, useLocale, useNamespace } from '@/core'
import type { SortOrder, TableColumn, TableEmits, TableProps, TableRow } from './types'

defineOptions({ name: 'VkTable' })

const props = withDefaults(defineProps<TableProps>(), {
  rowKey: undefined,
  loading: false,
  emptyText: undefined,
  size: undefined,
  striped: false,
  bordered: false,
  sortKey: null,
  sortOrder: null,
  ariaLabel: undefined,
})

const emit = defineEmits<TableEmits>()

const ns = useNamespace('table')
const locale = useLocale()
const { size: mergedSize } = useFormControl({
  size: computed(() => props.size),
})

const classes = computed(() => [
  ns.b,
  ns.m(mergedSize.value),
  {
    [ns.m('striped')]: props.striped,
    [ns.m('bordered')]: props.bordered,
  },
])

const sorted = computed<TableRow[]>(() => {
  if (!props.sortKey || !props.sortOrder) return props.data
  const key = props.sortKey
  const direction = props.sortOrder === 'asc' ? 1 : -1
  return [...props.data].sort((a, b) => {
    const left = a[key]
    const right = b[key]
    if (typeof left === 'number' && typeof right === 'number') return (left - right) * direction
    return String(left ?? '').localeCompare(String(right ?? ''), 'zh-Hans-CN') * direction
  })
})

const isEmpty = computed(() => !props.loading && sorted.value.length === 0)

function columnStyle(column: TableColumn): Record<string, string> {
  return {
    width: typeof column.width === 'number' ? `${column.width}px` : (column.width ?? ''),
    textAlign: column.align ?? 'left',
  }
}

function cellValue(row: TableRow, column: TableColumn, index: number): string {
  if (column.render) return column.render(row, index)
  const value = row[column.key]
  return value === null || value === undefined ? '' : String(value)
}

function rowKey(row: TableRow, index: number): string | number {
  return props.rowKey ? ((row[props.rowKey] as string | number) ?? index) : index
}

function ariaSort(column: TableColumn): 'ascending' | 'descending' | 'none' | undefined {
  if (!column.sortable) return undefined
  if (props.sortKey !== column.key || !props.sortOrder) return 'none'
  return props.sortOrder === 'asc' ? 'ascending' : 'descending'
}

function toggleSort(column: TableColumn): void {
  if (!column.sortable) return
  let next: SortOrder
  if (props.sortKey !== column.key || !props.sortOrder) next = 'asc'
  else if (props.sortOrder === 'asc') next = 'desc'
  else next = null

  const key = next ? column.key : null
  emit('update:sortKey', key)
  emit('update:sortOrder', next)
  emit('sort-change', key, next)
}
</script>

<template>
  <div :class="classes">
    <div :class="ns.e('scroll')">
      <table :class="ns.e('element')" :aria-label="ariaLabel" :aria-busy="loading || undefined">
        <thead>
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              scope="col"
              :class="[ns.e('th'), { [ns.em('th', 'sortable')]: column.sortable }]"
              :style="columnStyle(column)"
              :aria-sort="ariaSort(column)"
            >
              <button
                v-if="column.sortable"
                type="button"
                :class="ns.e('sort')"
                @click="toggleSort(column)"
              >
                <span>{{ column.title }}</span>
                <svg
                  :class="[
                    ns.e('sort-icon'),
                    {
                      [ns.em('sort-icon', 'asc')]: sortKey === column.key && sortOrder === 'asc',
                      [ns.em('sort-icon', 'desc')]: sortKey === column.key && sortOrder === 'desc',
                    },
                  ]"
                  viewBox="0 0 16 16"
                  width="12"
                  height="12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M8 3l3 4H5l3-4zM8 13l3-4H5l3 4z" fill="currentColor" />
                </svg>
              </button>
              <span v-else>{{ column.title }}</span>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(row, index) in sorted" :key="rowKey(row, index)" :class="ns.e('row')">
            <td
              v-for="column in columns"
              :key="column.key"
              :class="[ns.e('td'), { [ns.em('td', 'ellipsis')]: column.ellipsis }]"
              :style="columnStyle(column)"
            >
              <slot name="cell" :row="row" :column="column" :index="index" :value="row[column.key]">
                {{ cellValue(row, column, index) }}
              </slot>
            </td>
          </tr>
          <tr v-if="isEmpty">
            <td :colspan="columns.length" :class="ns.e('empty')">
              {{ emptyText ?? locale.empty }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="loading" :class="ns.e('loading')" role="status" :aria-label="locale.loading">
      <span :class="ns.e('spinner')" aria-hidden="true" />
      <span :class="ns.e('loading-text')">{{ locale.loading }}</span>
    </div>
  </div>
</template>
