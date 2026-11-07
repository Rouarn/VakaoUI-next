<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { useDismiss, useNamespace } from '@/core'
import type { DropdownEmits, DropdownItem, DropdownProps } from './types'

defineOptions({ name: 'VkDropdown' })

const props = withDefaults(defineProps<DropdownProps>(), {
  open: undefined,
  trigger: 'click',
  placement: 'bottom',
  disabled: false,
  ariaLabel: '菜单',
})

const emit = defineEmits<DropdownEmits>()

const ns = useNamespace('dropdown')
const rootRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const innerOpen = ref(false)

const isOpen = computed(() => props.open ?? innerOpen.value)

function setOpen(next: boolean): void {
  if (next === isOpen.value) return
  if (props.open === undefined) innerOpen.value = next
  emit('update:open', next)
  if (next) emit('open')
  else emit('close')
  if (next) {
    void nextTick(() => {
      const first = panelRef.value?.querySelector<HTMLElement>('[role="menuitem"]:not(:disabled)')
      first?.focus()
    })
  }
}

function toggle(): void {
  if (props.disabled) return
  setOpen(!isOpen.value)
}

function onTriggerKeydown(event: KeyboardEvent): void {
  if (event.target !== triggerRef.value) return
  if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
    event.preventDefault()
    setOpen(true)
  }
}

function onTriggerEnter(): void {
  if (props.trigger === 'hover') setOpen(true)
}

function onRootLeave(): void {
  if (props.trigger === 'hover') setOpen(false)
}

function select(item: DropdownItem): void {
  if (item.disabled) return
  emit('select', item.key, item)
  setOpen(false)
  triggerRef.value?.focus()
}

function focusables(): HTMLElement[] {
  if (!panelRef.value) return []
  return Array.from(
    panelRef.value.querySelectorAll<HTMLElement>('[role="menuitem"]:not(:disabled)'),
  )
}

function onMenuKeydown(event: KeyboardEvent): void {
  const items = focusables()
  if (event.key === 'Escape') {
    event.stopPropagation()
    setOpen(false)
    triggerRef.value?.focus()
    return
  }
  if (items.length === 0) return
  const index = items.indexOf(document.activeElement as HTMLElement)
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    items[(index + 1) % items.length]?.focus()
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    items[(index - 1 + items.length) % items.length]?.focus()
  } else if (event.key === 'Home') {
    event.preventDefault()
    items[0]?.focus()
  } else if (event.key === 'End') {
    event.preventDefault()
    items[items.length - 1]?.focus()
  }
}

useDismiss({
  enabled: () => isOpen.value,
  onDismiss: () => setOpen(false),
  inside: [rootRef, panelRef],
})
</script>

<template>
  <span ref="rootRef" :class="ns.b" @mouseenter="onTriggerEnter" @mouseleave="onRootLeave">
    <span
      ref="triggerRef"
      :class="ns.e('trigger')"
      :tabindex="$slots.trigger || $slots.default ? undefined : 0"
      aria-haspopup="menu"
      :aria-expanded="isOpen"
      @click="trigger === 'click' && toggle()"
      @keydown="onTriggerKeydown"
    >
      <slot name="trigger"><slot /></slot>
    </span>

    <Transition :name="ns.m('fade')">
      <div
        v-if="isOpen"
        ref="panelRef"
        :class="[ns.e('panel'), ns.m(placement)]"
        role="menu"
        :aria-label="ariaLabel"
        @keydown="onMenuKeydown"
      >
        <template v-for="(item, index) in items" :key="`${item.key}-${index}`">
          <div v-if="item.divider" :class="ns.e('divider')" role="separator" />
          <button
            v-else
            type="button"
            :class="[ns.e('item'), { [ns.em('item', 'danger')]: item.danger }]"
            role="menuitem"
            :disabled="item.disabled"
            @click="select(item)"
          >
            {{ item.label }}
          </button>
        </template>
      </div>
    </Transition>
  </span>
</template>
