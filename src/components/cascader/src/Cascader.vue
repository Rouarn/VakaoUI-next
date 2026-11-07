<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import {
  useDismiss,
  useFloating,
  useFormControl,
  useLocale,
  useNamespace,
  usePopupContainer,
} from '@/core'
import type { StatusType } from '@/core/types'
import type { CascaderEmits, CascaderKey, CascaderOption, CascaderProps } from './types'

let cascaderSeed = 0

defineOptions({ name: 'VkCascader' })

const props = withDefaults(defineProps<CascaderProps>(), {
  options: () => [],
  modelValue: null,
  placeholder: undefined,
  disabled: false,
  clearable: false,
  changeOnSelect: false,
  separator: ' / ',
  size: undefined,
  status: undefined,
  id: undefined,
  ariaLabel: undefined,
})

const emit = defineEmits<CascaderEmits>()

const ns = useNamespace('cascader')
const locale = useLocale()
const container = usePopupContainer()
const {
  inputId,
  disabled: isDisabled,
  size: mergedSize,
  ariaDescribedby,
  ariaInvalid,
  validate,
} = useFormControl({
  size: computed(() => props.size),
  disabled: computed(() => props.disabled),
  id: computed(() => props.id),
})

const seed = (() => {
  cascaderSeed += 1
  return cascaderSeed
})()

const rootRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const open = ref(false)
const path = ref<CascaderKey[]>([])
const activeColumn = ref(0)
const activeIndex = ref(0)

const { floatingStyle } = useFloating({
  trigger: triggerRef,
  panel: panelRef,
  open: () => open.value,
  gap: 6,
  align: 'start',
  matchTriggerWidth: true,
  maxWidth: 640,
  maxHeight: 280,
})

const panelId = `vk-cascader-${seed}-panel`

function findPath(options: CascaderOption[], keys: CascaderKey[]): CascaderOption[] {
  const result: CascaderOption[] = []
  let level: CascaderOption[] | undefined = options
  for (const key of keys) {
    const found: CascaderOption | undefined = level?.find((option) => option.value === key)
    if (!found) return []
    result.push(found)
    level = found.children
  }
  return result
}

const selectedPath = computed<CascaderOption[]>(() => {
  if (!props.modelValue || props.modelValue.length === 0) return []
  const found = findPath(props.options, props.modelValue)
  return found.length === props.modelValue.length ? found : []
})

const hasValue = computed(() => selectedPath.value.length > 0)

const displayLabel = computed(() =>
  selectedPath.value.map((option) => option.label).join(props.separator),
)

const columns = computed<CascaderOption[][]>(() => {
  const result: CascaderOption[][] = [props.options]
  let level = props.options
  for (const key of path.value) {
    const found = level.find((option) => option.value === key)
    const children = found?.children ?? []
    if (children.length === 0) break
    result.push(children)
    level = children
  }
  return result
})

const status = computed<StatusType | undefined>(() => (ariaInvalid.value ? 'error' : props.status))

const classes = computed(() => [
  ns.b,
  ns.m(mergedSize.value),
  {
    [ns.m('open')]: open.value,
    [ns.m('disabled')]: isDisabled.value,
    [ns.m(status.value ?? 'default')]: status.value !== undefined,
  },
])

function optionId(columnIndex: number, index: number): string {
  return `${panelId}-col-${columnIndex}-option-${index}`
}

const activeDescendant = computed<string | undefined>(() => {
  if (!open.value || activeIndex.value < 0) return undefined
  const column = columns.value[activeColumn.value] ?? []
  if (!column[activeIndex.value]) return undefined
  return optionId(activeColumn.value, activeIndex.value)
})

function isExpandable(option: CascaderOption): boolean {
  return option.isLeaf !== true && (option.children?.length ?? 0) > 0
}

function firstEnabled(list: CascaderOption[], from = 0, step = 1): number {
  const total = list.length
  for (let offset = 0; offset < total; offset += 1) {
    const index = (from + offset * step + total) % total
    if (!list[index]?.disabled) return index
  }
  return -1
}

function initialPath(): CascaderKey[] {
  if (!props.modelValue || props.modelValue.length === 0) return []
  const found = findPath(props.options, props.modelValue)
  if (found.length !== props.modelValue.length) return []
  return [...props.modelValue]
}

function indexOfPath(columnIndex: number): number {
  const value = path.value[columnIndex]
  if (value === undefined) return -1
  const column = columns.value[columnIndex] ?? []
  return column.findIndex((option) => option.value === value)
}

function activateColumn(columnIndex: number): void {
  const maxIndex = Math.max(0, columns.value.length - 1)
  activeColumn.value = Math.min(Math.max(columnIndex, 0), maxIndex)
  const found = indexOfPath(activeColumn.value)
  activeIndex.value = found >= 0 ? found : firstEnabled(columns.value[activeColumn.value] ?? [])
}

function openPanel(): void {
  if (isDisabled.value) return
  path.value = initialPath()
  activeColumn.value = 0
  const firstValue = props.modelValue?.[0]
  const column = columns.value[0] ?? []
  const found =
    firstValue === undefined ? -1 : column.findIndex((option) => option.value === firstValue)
  activeIndex.value = found >= 0 ? found : firstEnabled(column)
  open.value = true
}

function closePanel(): void {
  open.value = false
}

function toggle(): void {
  if (isDisabled.value) return
  if (open.value) closePanel()
  else openPanel()
}

function enterOption(option: CascaderOption, columnIndex: number): void {
  path.value = [...path.value.slice(0, columnIndex), option.value]
  activeColumn.value = Math.min(columnIndex + 1, columns.value.length - 1)
  const column = columns.value[activeColumn.value] ?? []
  activeIndex.value = firstEnabled(column)
}

function selectValues(values: CascaderKey[]): void {
  const options = findPath(props.options, values)
  emit('update:modelValue', values)
  emit('change', values, options)
  validate('change')
  closePanel()
  void nextTick(() => triggerRef.value?.focus())
}

function onOptionClick(option: CascaderOption, columnIndex: number): void {
  if (isDisabled.value || option.disabled) return
  const values = [...path.value.slice(0, columnIndex), option.value]
  if (isExpandable(option) && !props.changeOnSelect) {
    enterOption(option, columnIndex)
    return
  }
  selectValues(values)
}

function onOptionHover(columnIndex: number, index: number, option: CascaderOption): void {
  if (option.disabled) return
  activeColumn.value = columnIndex
  activeIndex.value = index
}

function move(step: number): void {
  const column = columns.value[activeColumn.value] ?? []
  if (column.length === 0) return
  const start = activeIndex.value === -1 ? (step > 0 ? -1 : 0) : activeIndex.value
  const next = firstEnabled(column, start + step, step)
  if (next >= 0) activeIndex.value = next
}

function currentOption(): CascaderOption | null {
  const column = columns.value[activeColumn.value] ?? []
  return column[activeIndex.value] ?? null
}

function isPathOption(columnIndex: number, option: CascaderOption): boolean {
  return path.value[columnIndex] === option.value
}

function commitOption(option: CascaderOption): void {
  if (isExpandable(option)) {
    if (isPathOption(activeColumn.value, option) && activeColumn.value < columns.value.length - 1) {
      activateColumn(activeColumn.value + 1)
    } else {
      enterOption(option, activeColumn.value)
    }
    return
  }
  selectValues([...path.value.slice(0, activeColumn.value), option.value])
}

function handleKeydown(event: KeyboardEvent): void {
  if (isDisabled.value) return
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      if (!open.value) openPanel()
      else move(1)
      break
    case 'ArrowUp':
      event.preventDefault()
      if (!open.value) openPanel()
      else move(-1)
      break
    case 'ArrowRight': {
      const option = currentOption()
      if (!open.value || !option || option.disabled) break
      event.preventDefault()
      if (
        isPathOption(activeColumn.value, option) &&
        activeColumn.value < columns.value.length - 1
      ) {
        activateColumn(activeColumn.value + 1)
      } else if (isExpandable(option)) {
        enterOption(option, activeColumn.value)
      }
      break
    }
    case 'ArrowLeft':
      if (!open.value) break
      event.preventDefault()
      if (activeColumn.value > 0) activateColumn(activeColumn.value - 1)
      break
    case 'Backspace':
      if (!open.value) break
      event.preventDefault()
      if (activeColumn.value > 0) activateColumn(activeColumn.value - 1)
      break
    case 'Enter': {
      event.preventDefault()
      if (!open.value) {
        openPanel()
        break
      }
      const option = currentOption()
      if (option && !option.disabled) commitOption(option)
      break
    }
    case ' ':
      event.preventDefault()
      if (!open.value) openPanel()
      break
    case 'Escape':
      if (open.value) {
        event.stopPropagation()
        closePanel()
      }
      break
    case 'Tab':
      closePanel()
      break
  }
}

function clear(): void {
  emit('update:modelValue', null)
  emit('change', null, [])
  emit('clear')
  validate('change')
  closePanel()
  void nextTick(() => triggerRef.value?.focus())
}

function onBlur(event: FocusEvent): void {
  const next = event.relatedTarget as Node | null
  if (rootRef.value?.contains(next) || panelRef.value?.contains(next)) return
  closePanel()
}

useDismiss({
  enabled: () => open.value,
  onDismiss: closePanel,
  inside: [rootRef, panelRef],
})

defineExpose({ focus: () => triggerRef.value?.focus() })
</script>

<template>
  <div ref="rootRef" :class="classes" @focusout="onBlur">
    <div
      :id="inputId"
      ref="triggerRef"
      :class="ns.e('trigger')"
      role="combobox"
      :tabindex="isDisabled ? -1 : 0"
      :aria-expanded="open"
      :aria-controls="panelId"
      :aria-disabled="isDisabled || undefined"
      :aria-describedby="ariaDescribedby"
      :aria-invalid="ariaInvalid"
      :aria-label="ariaLabel"
      :aria-activedescendant="activeDescendant"
      aria-haspopup="listbox"
      @click="toggle"
      @keydown="handleKeydown"
    >
      <span :class="[ns.e('value'), { [ns.em('value', 'placeholder')]: !hasValue }]">
        {{ hasValue ? displayLabel : (placeholder ?? locale.selectPlaceholder) }}
      </span>

      <button
        v-if="clearable && hasValue && !isDisabled"
        type="button"
        :class="ns.e('clear')"
        :aria-label="locale.clear"
        tabindex="-1"
        @click.stop="clear"
      >
        <svg viewBox="0 0 16 16" width="10" height="10" fill="none" aria-hidden="true">
          <path
            d="M4 4l8 8M12 4l-8 8"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
          />
        </svg>
      </button>

      <svg
        :class="ns.e('arrow')"
        viewBox="0 0 16 16"
        width="12"
        height="12"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M4 6l4 4 4-4"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </div>

  <Teleport :to="container">
    <Transition :name="ns.m('fade')">
      <div
        v-if="open"
        :id="panelId"
        ref="panelRef"
        :class="ns.e('panel')"
        :style="floatingStyle"
        role="presentation"
        @mousedown.prevent
      >
        <ul
          v-for="(column, columnIndex) in columns"
          :key="columnIndex"
          :class="ns.e('column')"
          role="listbox"
          :aria-label="ariaLabel"
        >
          <li
            v-for="(option, index) in column"
            :id="optionId(columnIndex, index)"
            :key="option.value"
            role="option"
            :class="[
              ns.e('option'),
              {
                [ns.em('option', 'active')]: activeColumn === columnIndex && activeIndex === index,
                [ns.em('option', 'selected')]: path[columnIndex] === option.value,
                [ns.em('option', 'disabled')]: option.disabled,
              },
            ]"
            :aria-selected="path[columnIndex] === option.value"
            :aria-disabled="option.disabled || undefined"
            @click="onOptionClick(option, columnIndex)"
            @mousemove="onOptionHover(columnIndex, index, option)"
          >
            <span :class="ns.e('option-label')">{{ option.label }}</span>
            <svg
              v-if="isExpandable(option)"
              :class="ns.e('option-arrow')"
              viewBox="0 0 16 16"
              width="12"
              height="12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 4l4 4-4 4"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </li>
          <li v-if="column.length === 0" :class="ns.e('empty')" role="presentation">
            {{ locale.cascaderEmpty }}
          </li>
        </ul>
      </div>
    </Transition>
  </Teleport>
</template>
