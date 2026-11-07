<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useLocale, useNamespace } from '@/core'
import type {
  TransferDirection,
  TransferEmits,
  TransferKey,
  TransferOption,
  TransferProps,
} from './types'

defineOptions({ name: 'VkTransfer' })

const props = withDefaults(defineProps<TransferProps>(), {
  options: () => [],
  modelValue: () => [],
  titles: undefined,
  searchable: true,
  listHeight: 240,
  disabled: false,
  showSelectAll: true,
  ariaLabel: undefined,
})

const emit = defineEmits<TransferEmits>()

const ns = useNamespace('transfer')
const locale = useLocale()

const leftQuery = ref('')
const rightQuery = ref('')
const leftSelectAllRef = ref<HTMLInputElement | null>(null)
const rightSelectAllRef = ref<HTMLInputElement | null>(null)

const selectedKeys = computed(() => new Set(props.modelValue))
const leftOptions = computed(() =>
  props.options.filter((option) => !selectedKeys.value.has(option.value)),
)
const rightOptions = computed(() =>
  props.options.filter((option) => selectedKeys.value.has(option.value)),
)

const leftTitle = computed(() => props.titles?.[0] ?? locale.value.transferSource)
const rightTitle = computed(() => props.titles?.[1] ?? locale.value.transferTarget)

function filterOptions(options: TransferOption[], query: string): TransferOption[] {
  const keyword = query.trim().toLowerCase()
  if (!keyword) return options
  return options.filter((option) => option.label.toLowerCase().includes(keyword))
}

const leftVisible = computed(() => filterOptions(leftOptions.value, leftQuery.value))
const rightVisible = computed(() => filterOptions(rightOptions.value, rightQuery.value))

interface HeaderState {
  total: number
  selected: number
  enabled: number
  checked: boolean
  indeterminate: boolean
}

function headerState(items: TransferOption[]): HeaderState {
  const enabled = items.filter((option) => !option.disabled)
  const selected = enabled.filter((option) => selectedKeys.value.has(option.value)).length
  return {
    total: items.length,
    selected,
    enabled: enabled.length,
    checked: enabled.length > 0 && selected === enabled.length,
    indeterminate: selected > 0 && selected < enabled.length,
  }
}

const leftHeader = computed(() => headerState(leftVisible.value))
const rightHeader = computed(() => headerState(rightVisible.value))

watchEffect(() => {
  if (leftSelectAllRef.value) leftSelectAllRef.value.indeterminate = leftHeader.value.indeterminate
  if (rightSelectAllRef.value) {
    rightSelectAllRef.value.indeterminate = rightHeader.value.indeterminate
  }
})

function commit(next: TransferKey[], direction: TransferDirection, movedKeys: TransferKey[]): void {
  if (movedKeys.length === 0) return
  emit('update:modelValue', next)
  emit('change', next, direction, movedKeys)
}

function moveToRight(option: TransferOption): void {
  if (props.disabled || option.disabled) return
  commit([...props.modelValue, option.value], 'right', [option.value])
}

function moveToLeft(option: TransferOption): void {
  if (props.disabled || option.disabled) return
  commit(
    props.modelValue.filter((key) => key !== option.value),
    'left',
    [option.value],
  )
}

function toggleAll(side: TransferDirection): void {
  if (props.disabled) return
  const visible = side === 'left' ? leftVisible.value : rightVisible.value
  const keys = visible.filter((option) => !option.disabled).map((option) => option.value)
  if (keys.length === 0) return

  if (side === 'left') {
    commit([...props.modelValue, ...keys], 'right', keys)
    return
  }

  const removed = new Set(keys)
  commit(
    props.modelValue.filter((key) => !removed.has(key)),
    'left',
    keys,
  )
}
</script>

<template>
  <div :class="[ns.b, { [ns.m('disabled')]: disabled }]" role="group" :aria-label="ariaLabel">
    <section :class="ns.e('panel')">
      <div :class="ns.e('header')">
        <label v-if="showSelectAll" :class="ns.e('select-all')">
          <input
            ref="leftSelectAllRef"
            type="checkbox"
            :checked="leftHeader.checked"
            :disabled="disabled || leftHeader.enabled === 0"
            :aria-label="locale.transferSelectAll"
            @change="toggleAll('left')"
          />
        </label>
        <span :class="ns.e('title')">{{ leftTitle }}</span>
        <span :class="ns.e('count')">已选 {{ leftHeader.selected }}/{{ leftHeader.total }}</span>
      </div>

      <input
        v-if="searchable"
        v-model="leftQuery"
        :class="ns.e('search')"
        type="search"
        :placeholder="locale.transferSearch"
        :aria-label="`${locale.transferSearch} ${leftTitle}`"
        :disabled="disabled"
      />

      <ul :class="ns.e('list')" :aria-label="leftTitle" :style="{ height: `${listHeight}px` }">
        <li
          v-for="option in leftVisible"
          :key="option.value"
          :class="[ns.e('item'), { [ns.em('item', 'disabled')]: option.disabled }]"
        >
          <label :class="ns.e('option')">
            <input
              :class="ns.e('checkbox')"
              type="checkbox"
              :checked="false"
              :disabled="disabled || option.disabled"
              :aria-label="option.label"
              @change="moveToRight(option)"
            />
            <span :class="ns.e('label')">{{ option.label }}</span>
          </label>
        </li>
        <li v-if="leftVisible.length === 0" :class="ns.e('empty')">
          {{ locale.empty }}
        </li>
      </ul>
    </section>

    <section :class="ns.e('panel')">
      <div :class="ns.e('header')">
        <label v-if="showSelectAll" :class="ns.e('select-all')">
          <input
            ref="rightSelectAllRef"
            type="checkbox"
            :checked="rightHeader.checked"
            :disabled="disabled || rightHeader.enabled === 0"
            :aria-label="locale.transferSelectAll"
            @change="toggleAll('right')"
          />
        </label>
        <span :class="ns.e('title')">{{ rightTitle }}</span>
        <span :class="ns.e('count')">已选 {{ rightHeader.selected }}/{{ rightHeader.total }}</span>
      </div>

      <input
        v-if="searchable"
        v-model="rightQuery"
        :class="ns.e('search')"
        type="search"
        :placeholder="locale.transferSearch"
        :aria-label="`${locale.transferSearch} ${rightTitle}`"
        :disabled="disabled"
      />

      <ul :class="ns.e('list')" :aria-label="rightTitle" :style="{ height: `${listHeight}px` }">
        <li
          v-for="option in rightVisible"
          :key="option.value"
          :class="[ns.e('item'), { [ns.em('item', 'disabled')]: option.disabled }]"
        >
          <label :class="ns.e('option')">
            <input
              :class="ns.e('checkbox')"
              type="checkbox"
              :checked="true"
              :disabled="disabled || option.disabled"
              :aria-label="option.label"
              @change="moveToLeft(option)"
            />
            <span :class="ns.e('label')">{{ option.label }}</span>
          </label>
        </li>
        <li v-if="rightVisible.length === 0" :class="ns.e('empty')">
          {{ locale.empty }}
        </li>
      </ul>
    </section>
  </div>
</template>
