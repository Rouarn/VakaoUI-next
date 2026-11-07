<script setup lang="ts">
import { computed } from 'vue'
import { useLocale, useNamespace } from '@/core'
import type { PaginationEmits, PaginationProps } from './types'

defineOptions({ name: 'VkPagination' })

const props = withDefaults(defineProps<PaginationProps>(), {
  pageSize: 10,
  current: 1,
  siblingCount: 1,
  showTotal: true,
  showSizeChanger: false,
  pageSizeOptions: () => [10, 20, 50, 100],
  disabled: false,
  ariaLabel: undefined,
})

const emit = defineEmits<PaginationEmits>()

const ns = useNamespace('pagination')
const locale = useLocale()

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / Math.max(1, props.pageSize))))
const currentPage = computed(() => Math.min(Math.max(props.current, 1), totalPages.value))

type PageItem = number | 'prev-ellipsis' | 'next-ellipsis'

const pages = computed<PageItem[]>(() => {
  const total = totalPages.value
  const current = currentPage.value
  const sibling = Math.max(0, props.siblingCount)
  const items: PageItem[] = [1]

  const start = Math.max(2, current - sibling)
  const end = Math.min(total - 1, current + sibling)

  if (start > 2) items.push('prev-ellipsis')
  for (let page = start; page <= end; page += 1) items.push(page)
  if (end < total - 1) items.push('next-ellipsis')
  if (total > 1) items.push(total)

  return items
})

function go(page: number): void {
  if (props.disabled) return
  const next = Math.min(Math.max(page, 1), totalPages.value)
  if (next === currentPage.value) return
  emit('update:current', next)
  emit('change', next, props.pageSize)
}

function onSizeChange(event: Event): void {
  const next = Number((event.target as HTMLSelectElement).value)
  emit('update:pageSize', next)
  emit('update:current', 1)
  emit('change', 1, next)
}
</script>

<template>
  <nav :class="[ns.b, { [ns.m('disabled')]: disabled }]" :aria-label="ariaLabel ?? 'Pagination'">
    <span v-if="showTotal" :class="ns.e('total')">{{ locale.paginationTotal(total) }}</span>

    <ul :class="ns.e('list')">
      <li>
        <button
          type="button"
          :class="[ns.e('item'), ns.em('item', 'arrow')]"
          :aria-label="locale.paginationPrev"
          :disabled="disabled || currentPage <= 1"
          @click="go(currentPage - 1)"
        >
          <svg viewBox="0 0 16 16" width="12" height="12" fill="none" aria-hidden="true">
            <path
              d="M10 3L5 8l5 5"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </li>

      <li v-for="item in pages" :key="item">
        <span v-if="typeof item !== 'number'" :class="ns.e('ellipsis')" aria-hidden="true">…</span>
        <button
          v-else
          type="button"
          :class="[ns.e('item'), { [ns.em('item', 'active')]: item === currentPage }]"
          :aria-current="item === currentPage ? 'page' : undefined"
          :aria-label="`${item}`"
          :disabled="disabled"
          @click="go(item)"
        >
          {{ item }}
        </button>
      </li>

      <li>
        <button
          type="button"
          :class="[ns.e('item'), ns.em('item', 'arrow')]"
          :aria-label="locale.paginationNext"
          :disabled="disabled || currentPage >= totalPages"
          @click="go(currentPage + 1)"
        >
          <svg viewBox="0 0 16 16" width="12" height="12" fill="none" aria-hidden="true">
            <path
              d="M6 3l5 5-5 5"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </li>
    </ul>

    <label v-if="showSizeChanger" :class="ns.e('size')">
      <select
        :class="ns.e('select')"
        :value="pageSize"
        :disabled="disabled"
        :aria-label="locale.paginationPageSize(pageSize)"
        @change="onSizeChange"
      >
        <option v-for="option in pageSizeOptions" :key="option" :value="option">
          {{ locale.paginationPageSize(option) }}
        </option>
      </select>
    </label>
  </nav>
</template>
