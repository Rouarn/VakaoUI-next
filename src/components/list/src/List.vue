<script setup lang="ts">
import { computed } from 'vue'
import { useComponentSize, useNamespace } from '@/core'
import { VkEmpty } from '@/components/empty'
import { VkSpin } from '@/components/spin'
import type { ListProps, ListSlots } from './types'

defineOptions({ name: 'VkList' })

const props = withDefaults(defineProps<ListProps>(), {
  items: () => [],
  bordered: false,
  split: true,
  loading: false,
  hoverable: false,
  selectedKey: undefined,
  size: undefined,
  emptyText: undefined,
})

defineSlots<ListSlots>()

const ns = useNamespace('list')
const size = useComponentSize(computed(() => props.size))

const classes = computed(() => [
  ns.b,
  {
    [ns.m('bordered')]: props.bordered,
    [ns.m('hoverable')]: props.hoverable,
    [ns.m('split')]: props.split,
    [ns.m(size.value)]: Boolean(size.value),
  },
])
</script>

<template>
  <div :class="classes">
    <div v-if="loading" :class="ns.e('loading')">
      <VkSpin :overlay="false" size="small" />
    </div>

    <slot v-else-if="items.length === 0" name="empty">
      <VkEmpty :description="emptyText" />
    </slot>

    <ul v-else :class="ns.e('items')" role="list">
      <li
        v-for="(item, index) in items"
        :key="item.key ?? index"
        :class="[
          ns.e('item'),
          { [ns.em('item', 'selected')]: (item.key ?? index) === selectedKey },
        ]"
      >
        <slot name="item" :item="item" :index="index">
          <div v-if="$slots.avatar" :class="ns.e('avatar')">
            <slot name="avatar" :item="item" :index="index" />
          </div>

          <div :class="ns.e('main')">
            <div v-if="item.title" :class="ns.e('title')">{{ item.title }}</div>
            <div v-if="item.description" :class="ns.e('description')">{{ item.description }}</div>
          </div>

          <div v-if="item.extra !== undefined || $slots.extra" :class="ns.e('extra')">
            <slot name="extra" :item="item" :index="index">{{ item.extra }}</slot>
          </div>
        </slot>
      </li>
    </ul>
  </div>
</template>
