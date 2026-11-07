<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { useNamespace } from '@/core'
import type { TabItem, TabKey, TabsEmits, TabsProps } from './types'

let tabSeed = 0

defineOptions({ name: 'VkTabs' })

const props = withDefaults(defineProps<TabsProps>(), {
  modelValue: undefined,
  type: 'line',
  block: false,
  ariaLabel: undefined,
})

const emit = defineEmits<TabsEmits>()

const ns = useNamespace('tabs')
const seed = (() => {
  tabSeed += 1
  return tabSeed
})()

const active = computed<TabKey | undefined>(
  () => props.modelValue ?? props.items.find((item) => !item.disabled)?.key,
)

const activeItem = computed<TabItem | undefined>(() =>
  props.items.find((item) => item.key === active.value),
)

const tabRefs = ref<HTMLButtonElement[]>([])

function tabId(key: TabKey): string {
  return `vk-tabs-${seed}-tab-${String(key)}`
}

function panelId(key: TabKey): string {
  return `vk-tabs-${seed}-panel-${String(key)}`
}

function select(item: TabItem, focus = false): void {
  if (item.disabled) return
  if (item.key !== active.value) {
    emit('update:modelValue', item.key)
    emit('change', item.key)
  }
  if (focus) {
    void nextTick(() => {
      const index = props.items.indexOf(item)
      tabRefs.value[index]?.focus()
    })
  }
}

function onKeydown(event: KeyboardEvent, index: number): void {
  const enabled = props.items.filter((item) => !item.disabled)
  if (enabled.length === 0) return
  const currentIndex = enabled.findIndex((item) => item.key === props.items[index]?.key)
  if (currentIndex === -1) return

  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    event.preventDefault()
    select(enabled[(currentIndex + 1) % enabled.length], true)
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    event.preventDefault()
    select(enabled[(currentIndex - 1 + enabled.length) % enabled.length], true)
  } else if (event.key === 'Home') {
    event.preventDefault()
    select(enabled[0], true)
  } else if (event.key === 'End') {
    event.preventDefault()
    select(enabled[enabled.length - 1], true)
  }
}
</script>

<template>
  <div :class="[ns.b, ns.m(type), { [ns.m('block')]: block }]">
    <div :class="ns.e('nav')" role="tablist" :aria-label="ariaLabel">
      <button
        v-for="(item, index) in items"
        :id="tabId(item.key)"
        :key="item.key"
        ref="tabRefs"
        type="button"
        role="tab"
        :class="[ns.e('tab'), { [ns.em('tab', 'active')]: item.key === active }]"
        :aria-selected="item.key === active"
        :aria-controls="panelId(item.key)"
        :tabindex="item.key === active ? 0 : -1"
        :disabled="item.disabled"
        @click="select(item)"
        @keydown="onKeydown($event, index)"
      >
        {{ item.label }}
      </button>
    </div>

    <div
      v-if="activeItem"
      :id="panelId(activeItem.key)"
      :class="ns.e('panel')"
      role="tabpanel"
      :aria-labelledby="tabId(activeItem.key)"
      tabindex="0"
    >
      <slot :name="`panel-${activeItem.key}`" :item="activeItem">
        <slot />
      </slot>
    </div>
  </div>
</template>
