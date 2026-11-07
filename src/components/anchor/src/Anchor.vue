<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useNamespace } from '@/core'
import type { AnchorEmits, AnchorItem, AnchorProps } from './types'

defineOptions({ name: 'VkAnchor' })

const props = withDefaults(defineProps<AnchorProps>(), {
  items: () => [],
  container: undefined,
  offsetTop: 0,
  affix: true,
  smooth: true,
  ariaLabel: '页内导航',
})

const emit = defineEmits<AnchorEmits>()

const ns = useNamespace('anchor')
const activeKey = ref('')
const scroller = ref<HTMLElement | Window>()
let listening = false
let frame = 0

const classes = computed(() => [ns.b, { [ns.m('affix')]: props.affix }])

function resolveContainer(): HTMLElement | Window {
  if (!props.container) return window
  return document.querySelector<HTMLElement>(props.container) ?? window
}

function targetElement(href: string): HTMLElement | null {
  if (!href.startsWith('#')) return null
  const id = href.slice(1)
  return id ? document.getElementById(id) : null
}

function flatten(items: AnchorItem[] = props.items): AnchorItem[] {
  const result: AnchorItem[] = []
  for (const item of items) {
    result.push(item)
    if (item.children?.length) result.push(...flatten(item.children))
  }
  return result
}

function topWithin(element: HTMLElement, container: HTMLElement | Window): number {
  const elementTop = element.getBoundingClientRect().top
  if (container === window) return elementTop
  return elementTop - (container as HTMLElement).getBoundingClientRect().top
}

function measure(): void {
  const container = scroller.value ?? window
  let nextKey = ''
  for (const item of flatten()) {
    const element = targetElement(item.href)
    if (!element) continue
    if (topWithin(element, container) <= props.offsetTop + 1) nextKey = item.key
  }

  if (nextKey !== activeKey.value) {
    activeKey.value = nextKey
    emit('change', nextKey)
  }
}

function schedule(): void {
  if (frame) return
  frame = requestAnimationFrame(() => {
    frame = 0
    measure()
  })
}

function scrollToTarget(element: HTMLElement): void {
  const behavior = props.smooth ? 'smooth' : 'auto'
  const container = scroller.value ?? window

  if (container === window) {
    const top = element.getBoundingClientRect().top + window.scrollY - props.offsetTop
    window.scrollTo({ top, behavior })
    return
  }

  const box = container as HTMLElement
  const top =
    element.getBoundingClientRect().top -
    box.getBoundingClientRect().top +
    box.scrollTop -
    props.offsetTop
  box.scrollTo({ top, behavior })
}

function onClick(item: AnchorItem, event: MouseEvent): void {
  emit('click', { item, event })
  const element = targetElement(item.href)
  if (!element) return
  event.preventDefault()
  scrollToTarget(element)
}

function linkClasses(item: AnchorItem): Array<string | Record<string, boolean>> {
  return [ns.e('link'), { [ns.em('link', 'active')]: activeKey.value === item.key }]
}

function bind(): void {
  scroller.value = resolveContainer()
  scroller.value.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)
  listening = true
  measure()
}

function unbind(): void {
  if (frame) {
    cancelAnimationFrame(frame)
    frame = 0
  }
  if (!listening) return
  scroller.value?.removeEventListener('scroll', schedule)
  window.removeEventListener('resize', schedule)
  listening = false
}

onMounted(bind)
onBeforeUnmount(unbind)
</script>

<template>
  <nav :class="classes" :aria-label="ariaLabel">
    <ul :class="ns.e('list')">
      <li v-for="item in items" :key="item.key" :class="ns.e('item')">
        <a
          :class="linkClasses(item)"
          :href="item.href"
          :aria-current="activeKey === item.key ? 'location' : undefined"
          @click="onClick(item, $event)"
        >
          {{ item.title }}
        </a>

        <ul v-if="item.children?.length" :class="[ns.e('list'), ns.em('list', 'child')]">
          <li v-for="child in item.children" :key="child.key" :class="ns.e('item')">
            <a
              :class="linkClasses(child)"
              :href="child.href"
              :aria-current="activeKey === child.key ? 'location' : undefined"
              @click="onClick(child, $event)"
            >
              {{ child.title }}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>
