<script setup lang="ts">
import { computed, ref } from 'vue'
import { useNamespace } from '@/core'
import type { MenuEmits, MenuItem, MenuProps } from './types'

defineOptions({ name: 'VkMenu' })

const props = withDefaults(defineProps<MenuProps>(), {
  modelValue: undefined,
  mode: 'vertical',
  ariaLabel: undefined,
})

const emit = defineEmits<MenuEmits>()

const ns = useNamespace('menu')
const rootRef = ref<HTMLElement | null>(null)
const openKeys = ref<string[]>([])

const classes = computed(() => [ns.b, ns.m(props.mode)])

function isOpen(key: string): boolean {
  return openKeys.value.includes(key)
}

function toggle(item: MenuItem): void {
  if (item.disabled) return
  if (item.children?.length) {
    openKeys.value = isOpen(item.key)
      ? openKeys.value.filter((key) => key !== item.key)
      : [...openKeys.value, item.key]
    return
  }
  emit('update:modelValue', item.key)
  emit('select', item)
}

function focusables(): HTMLButtonElement[] {
  if (!rootRef.value) return []
  return Array.from(
    rootRef.value.querySelectorAll<HTMLButtonElement>('button[role="menuitem"]:not(:disabled)'),
  )
}

function moveFocus(step: number): void {
  const list = focusables()
  if (list.length === 0) return
  const index = list.indexOf(document.activeElement as HTMLButtonElement)
  const next = index === -1 ? 0 : (index + step + list.length) % list.length
  list[next]?.focus()
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    moveFocus(1)
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    moveFocus(-1)
  } else if (event.key === 'Home') {
    event.preventDefault()
    focusables()[0]?.focus()
  } else if (event.key === 'End') {
    event.preventDefault()
    const list = focusables()
    list[list.length - 1]?.focus()
  } else if (event.key === 'ArrowRight') {
    const current = document.activeElement
    const key = current?.getAttribute('data-key')
    const item = key ? findItem(key) : undefined
    if (item?.children?.length && !isOpen(item.key)) {
      event.preventDefault()
      openKeys.value = [...openKeys.value, item.key]
    }
  } else if (event.key === 'ArrowLeft') {
    const current = document.activeElement
    const key = current?.getAttribute('data-key')
    const item = key ? findItem(key) : undefined
    if (item?.children?.length && isOpen(item.key)) {
      event.preventDefault()
      openKeys.value = openKeys.value.filter((value) => value !== item.key)
      focusables()
        .find((element) => element.dataset.key === item.key)
        ?.focus()
    }
  }
}

function findItem(key: string): MenuItem | undefined {
  const walk = (items: MenuItem[]): MenuItem | undefined => {
    for (const item of items) {
      if (item.key === key) return item
      const found = item.children ? walk(item.children) : undefined
      if (found) return found
    }
    return undefined
  }
  return walk(props.items)
}
</script>

<template>
  <ul
    ref="rootRef"
    :class="classes"
    role="menubar"
    :aria-label="ariaLabel"
    :aria-orientation="mode === 'vertical' ? 'vertical' : 'horizontal'"
    @keydown="onKeydown"
  >
    <li v-for="item in items" :key="item.key" :class="ns.e('item-wrap')" role="none">
      <button
        type="button"
        role="menuitem"
        :data-key="item.key"
        :class="[
          ns.e('item'),
          {
            [ns.em('item', 'active')]: item.key === modelValue,
            [ns.em('item', 'open')]: isOpen(item.key),
          },
        ]"
        :aria-current="item.key === modelValue ? 'true' : undefined"
        :aria-expanded="item.children?.length ? isOpen(item.key) : undefined"
        :aria-haspopup="item.children?.length ? 'menu' : undefined"
        :disabled="item.disabled"
        @click="toggle(item)"
      >
        <span :class="ns.e('label')">{{ item.label }}</span>
        <svg
          v-if="item.children?.length"
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
      </button>

      <ul v-if="item.children?.length && isOpen(item.key)" :class="ns.e('sub')" role="menu">
        <li v-for="child in item.children" :key="child.key" role="none">
          <button
            type="button"
            role="menuitem"
            :data-key="child.key"
            :class="[
              ns.e('item'),
              ns.em('item', 'sub'),
              { [ns.em('item', 'active')]: child.key === modelValue },
            ]"
            :aria-current="child.key === modelValue ? 'true' : undefined"
            :disabled="child.disabled"
            @click="toggle(child)"
          >
            <span :class="ns.e('label')">{{ child.label }}</span>
          </button>
        </li>
      </ul>
    </li>
  </ul>
</template>
