<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { useDismiss, useFormControl, useLocale, useNamespace } from '@/core'
import type { StatusType } from '@/core/types'
import type { SelectEmits, SelectOption, SelectProps } from './types'

let selectSeed = 0

defineOptions({ name: 'VkSelect' })

const props = withDefaults(defineProps<SelectProps>(), {
  modelValue: null,
  placeholder: undefined,
  disabled: false,
  clearable: false,
  size: undefined,
  status: undefined,
  id: undefined,
  ariaLabel: undefined,
})

const emit = defineEmits<SelectEmits>()

const ns = useNamespace('select')
const locale = useLocale()
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
  selectSeed += 1
  return selectSeed
})()

const rootRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLElement | null>(null)
const open = ref(false)
const activeIndex = ref(-1)

const listboxId = `vk-select-${seed}-listbox`

const selectedOption = computed<SelectOption | null>(
  () => props.options.find((option) => option.value === props.modelValue) ?? null,
)

const displayLabel = computed(() => selectedOption.value?.label ?? '')

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

function optionId(index: number): string {
  return `${listboxId}-option-${index}`
}

function firstEnabled(from = 0, step = 1): number {
  const total = props.options.length
  for (let offset = 0; offset < total; offset += 1) {
    const index = (from + offset * step + total) % total
    if (!props.options[index]?.disabled) return index
  }
  return -1
}

function openPanel(): void {
  if (isDisabled.value) return
  open.value = true
  const selected = props.options.findIndex((option) => option.value === props.modelValue)
  activeIndex.value = selected >= 0 ? selected : firstEnabled()
}

function closePanel(): void {
  open.value = false
  activeIndex.value = -1
}

function toggle(): void {
  if (open.value) closePanel()
  else openPanel()
}

function selectOption(option: SelectOption): void {
  if (option.disabled) return
  emit('update:modelValue', option.value)
  emit('change', option.value, option)
  validate('change')
  closePanel()
  void nextTick(() => triggerRef.value?.focus())
}

function move(step: number): void {
  if (props.options.length === 0) return
  const start = activeIndex.value === -1 ? (step > 0 ? -1 : 0) : activeIndex.value
  activeIndex.value = firstEnabled(start + step, step)
}

function onKeydown(event: KeyboardEvent): void {
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
    case 'Home':
      if (open.value) {
        event.preventDefault()
        activeIndex.value = firstEnabled()
      }
      break
    case 'End':
      if (open.value) {
        event.preventDefault()
        activeIndex.value = firstEnabled(props.options.length - 1, -1)
      }
      break
    case 'Enter':
    case ' ':
      event.preventDefault()
      if (!open.value) openPanel()
      else if (activeIndex.value >= 0 && props.options[activeIndex.value]) {
        selectOption(props.options[activeIndex.value])
      }
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
  emit('change', null, null)
  emit('clear')
  validate('change')
  void nextTick(() => triggerRef.value?.focus())
}

function onOptionHover(index: number, option: SelectOption): void {
  if (!option.disabled) activeIndex.value = index
}

function onBlur(event: FocusEvent): void {
  if (!rootRef.value?.contains(event.relatedTarget as Node | null)) closePanel()
}

useDismiss({
  enabled: () => open.value,
  onDismiss: closePanel,
  inside: [rootRef],
})

defineExpose({ focus: () => triggerRef.value?.focus() })
</script>

<template>
  <div ref="rootRef" :class="classes" @blur="onBlur">
    <div
      :id="inputId"
      ref="triggerRef"
      :class="ns.e('trigger')"
      role="combobox"
      :tabindex="isDisabled ? -1 : 0"
      :aria-expanded="open"
      :aria-controls="listboxId"
      :aria-disabled="isDisabled || undefined"
      :aria-describedby="ariaDescribedby"
      :aria-invalid="ariaInvalid"
      :aria-label="ariaLabel"
      :aria-activedescendant="open && activeIndex >= 0 ? optionId(activeIndex) : undefined"
      aria-haspopup="listbox"
      @click="toggle"
      @keydown="onKeydown"
    >
      <span :class="[ns.e('value'), { [ns.em('value', 'placeholder')]: selectedOption === null }]">
        {{ selectedOption ? displayLabel : (placeholder ?? locale.selectPlaceholder) }}
      </span>

      <button
        v-if="clearable && selectedOption && !isDisabled"
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

    <Transition :name="ns.m('fade')">
      <ul
        v-if="open"
        :id="listboxId"
        :class="ns.e('listbox')"
        role="listbox"
        :aria-label="ariaLabel"
      >
        <li
          v-for="(option, index) in options"
          :id="optionId(index)"
          :key="option.value"
          role="option"
          :class="[
            ns.e('option'),
            {
              [ns.em('option', 'active')]: index === activeIndex,
              [ns.em('option', 'selected')]: option.value === modelValue,
              [ns.em('option', 'disabled')]: option.disabled,
            },
          ]"
          :aria-selected="option.value === modelValue"
          :aria-disabled="option.disabled || undefined"
          @mousedown.prevent
          @click="selectOption(option)"
          @mousemove="onOptionHover(index, option)"
        >
          {{ option.label }}
        </li>
        <li v-if="options.length === 0" :class="ns.e('empty')" role="presentation">
          {{ locale.selectEmpty }}
        </li>
      </ul>
    </Transition>
  </div>
</template>
