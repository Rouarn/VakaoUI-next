<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@/core'
import type { TimelineItem, TimelineItemType, TimelineProps, TimelineSlots } from './types'

defineOptions({ name: 'VkTimeline' })

const props = withDefaults(defineProps<TimelineProps>(), {
  items: () => [],
  horizontal: false,
})

defineSlots<TimelineSlots>()

const ns = useNamespace('timeline')

const classes = computed(() => [ns.b, { [ns.m('horizontal')]: props.horizontal }])

function typeOf(item: TimelineItem): TimelineItemType {
  return item.type ?? 'default'
}
</script>

<template>
  <ol :class="classes" role="list">
    <li
      v-for="(item, index) in items"
      :key="item.key ?? index"
      :class="[ns.e('item'), ns.em('item', typeOf(item))]"
    >
      <span :class="ns.e('dot')" aria-hidden="true">
        <slot name="icon" :item="item" :index="index">
          <component :is="item.icon" v-if="item.icon" />
        </slot>
      </span>

      <div :class="ns.e('content')">
        <slot name="item" :item="item" :index="index">
          <div v-if="item.title" :class="ns.e('title')">{{ item.title }}</div>
          <div v-if="item.content" :class="ns.e('text')">{{ item.content }}</div>
          <div v-if="item.time" :class="ns.e('time')">{{ item.time }}</div>
        </slot>
      </div>
    </li>
  </ol>
</template>
