<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useLocale, useNamespace } from '@/core'
import TreeItem from './TreeItem.vue'
import type { TreeEmits, TreeKey, TreeNode, TreeProps } from './types'

defineOptions({ name: 'VkTree' })

const props = withDefaults(defineProps<TreeProps>(), {
  data: () => [],
  selectedKeys: undefined,
  defaultSelectedKeys: () => [],
  checkedKeys: undefined,
  defaultCheckedKeys: () => [],
  expandedKeys: undefined,
  defaultExpandedKeys: () => [],
  defaultExpandAll: false,
  checkable: false,
  selectable: true,
  multiple: false,
  disabled: false,
  indent: 24,
  loadData: undefined,
  ariaLabel: undefined,
})

const emit = defineEmits<TreeEmits>()

const ns = useNamespace('tree')
const locale = useLocale()

const rootRef = ref<HTMLElement | null>(null)
const focusedKey = ref<TreeKey | null>(null)
const loadedChildren = ref(new Map<TreeKey, TreeNode[]>())
const loadingKeys = ref(new Set<TreeKey>())

const internalExpanded = ref<TreeKey[]>(initialExpandedKeys())
const internalSelected = ref<TreeKey[]>([...props.defaultSelectedKeys])
const internalChecked = ref<TreeKey[]>([...props.defaultCheckedKeys])

const currentExpanded = computed(() => props.expandedKeys ?? internalExpanded.value)
const currentSelected = computed(() => props.selectedKeys ?? internalSelected.value)
const currentChecked = computed(() => props.checkedKeys ?? internalChecked.value)

function collectExpandableKeys(nodes: TreeNode[], keys: TreeKey[] = []): TreeKey[] {
  for (const node of nodes) {
    const children = node.children ?? []
    if (children.length > 0) {
      keys.push(node.key)
      collectExpandableKeys(children, keys)
    }
  }
  return keys
}

function initialExpandedKeys(): TreeKey[] {
  const keys = [...props.defaultExpandedKeys]
  if (!props.defaultExpandAll) return keys
  for (const key of collectExpandableKeys(props.data)) {
    if (!keys.includes(key)) keys.push(key)
  }
  return keys
}

function getChildren(node: TreeNode): TreeNode[] {
  return loadedChildren.value.get(node.key) ?? node.children ?? []
}

const nodeIndex = computed(() => {
  const index = new Map<TreeKey, { node: TreeNode; parentKey: TreeKey | null }>()
  function walk(node: TreeNode, parentKey: TreeKey | null): void {
    index.set(node.key, { node, parentKey })
    for (const child of getChildren(node)) walk(child, node.key)
  }
  for (const node of props.data) walk(node, null)
  return index
})

const parentMap = computed(() => {
  const map = new Map<TreeKey, TreeKey>()
  for (const [key, item] of nodeIndex.value) {
    if (item.parentKey !== null) map.set(key, item.parentKey)
  }
  return map
})

const visibleNodes = computed<TreeNode[]>(() => {
  const result: TreeNode[] = []
  const expanded = new Set(currentExpanded.value)
  function walk(nodes: TreeNode[]): void {
    for (const node of nodes) {
      result.push(node)
      const children = getChildren(node)
      if (expanded.has(node.key) && children.length > 0) walk(children)
    }
  }
  walk(props.data)
  return result
})

const activeFocusKey = computed<TreeKey | null>(() => {
  const key = focusedKey.value
  if (key !== null && visibleNodes.value.some((node) => node.key === key)) return key
  return visibleNodes.value[0]?.key ?? null
})

interface CheckState {
  checked: boolean
  half: boolean
}

function computeCheckStates(keys: TreeKey[]): Map<TreeKey, CheckState> {
  const checked = new Set(keys)
  const states = new Map<TreeKey, CheckState>()

  function walk(node: TreeNode): CheckState {
    const children = getChildren(node)
    let all = true
    let any = false
    for (const child of children) {
      const childState = walk(child)
      if (child.disabled) continue
      if (!childState.checked) all = false
      if (childState.checked || childState.half) any = true
    }
    const enabledChildren = children.filter((child) => !child.disabled)
    const selfChecked = checked.has(node.key)
    let state: CheckState = { checked: selfChecked, half: false }
    if (enabledChildren.length > 0) {
      if (all) state = { checked: true, half: false }
      else if (any && !selfChecked) state = { checked: false, half: true }
    }
    states.set(node.key, state)
    return state
  }

  for (const node of props.data) walk(node)
  return states
}

const checkStates = computed(() => computeCheckStates(currentChecked.value))

const halfCheckedKeys = computed<TreeKey[]>(() => {
  const keys: TreeKey[] = []
  for (const [key, state] of checkStates.value) {
    if (state.half) keys.push(key)
  }
  return keys
})

function collectCheckedSubtree(node: TreeNode, checked: Set<TreeKey>, next: boolean): void {
  if (node.disabled) return
  if (next) checked.add(node.key)
  else checked.delete(node.key)
  for (const child of getChildren(node)) collectCheckedSubtree(child, checked, next)
}

function handleCheck(node: TreeNode): void {
  if (!props.checkable || props.disabled || node.disabled) return
  const next = !(checkStates.value.get(node.key)?.checked ?? false)
  const checked = new Set(currentChecked.value)
  collectCheckedSubtree(node, checked, next)

  let parentKey = parentMap.value.get(node.key)
  while (parentKey !== undefined) {
    const parent = nodeIndex.value.get(parentKey)?.node
    if (!parent || parent.disabled) break
    const children = getChildren(parent).filter((child) => !child.disabled)
    const allChecked = children.length > 0 && children.every((child) => checked.has(child.key))
    if (allChecked) checked.add(parent.key)
    else checked.delete(parent.key)
    parentKey = parentMap.value.get(parentKey)
  }

  const keys = Array.from(checked)
  const nextStates = computeCheckStates(keys)
  const nextHalf: TreeKey[] = []
  for (const [key, state] of nextStates) {
    if (state.half) nextHalf.push(key)
  }

  if (props.checkedKeys === undefined) internalChecked.value = keys
  emit('update:checkedKeys', keys)
  emit('check', keys, node, { checked: next, halfCheckedKeys: nextHalf })
}

function handleSelect(node: TreeNode, event?: MouseEvent): void {
  if (!props.selectable || props.disabled || node.disabled) return
  const current = currentSelected.value
  let next: TreeKey[]
  if (props.multiple && event && (event.ctrlKey || event.metaKey)) {
    next = current.includes(node.key)
      ? current.filter((key) => key !== node.key)
      : [...current, node.key]
  } else {
    next = [node.key]
  }
  if (props.selectedKeys === undefined) internalSelected.value = next
  emit('update:selectedKeys', next)
  emit('select', next, node)
}

async function ensureLoaded(node: TreeNode): Promise<void> {
  if (!props.loadData || node.isLeaf) return
  if (getChildren(node).length > 0) return
  if (loadedChildren.value.has(node.key) || loadingKeys.value.has(node.key)) return

  loadingKeys.value.add(node.key)
  try {
    const children = (await props.loadData(node)) ?? []
    loadedChildren.value.set(node.key, children)
    emit('load', node, children)
  } catch {
    // 加载失败时保持当前展开状态，由使用方决定是否重试
  } finally {
    loadingKeys.value.delete(node.key)
  }
}

function handleToggle(node: TreeNode): void {
  if (props.disabled) return
  const expanded = currentExpanded.value
  const isExpanded = expanded.includes(node.key)
  const next = isExpanded ? expanded.filter((key) => key !== node.key) : [...expanded, node.key]

  if (props.expandedKeys === undefined) internalExpanded.value = next
  emit('update:expandedKeys', next)
  emit('expand', next, node)
  if (!isExpanded) void ensureLoaded(node)
}

function isExpandable(node: TreeNode): boolean {
  return !node.isLeaf && (getChildren(node).length > 0 || props.loadData !== undefined)
}

function findNodeElement(key: TreeKey): HTMLElement | null {
  const root = rootRef.value
  if (!root) return null
  const elements = root.querySelectorAll<HTMLElement>('[data-tree-key]')
  for (const element of elements) {
    if (element.dataset.treeKey === String(key)) return element
  }
  return null
}

function focusNode(key: TreeKey): void {
  focusedKey.value = key
  void nextTick(() => findNodeElement(key)?.focus())
}

function handleFocus(node: TreeNode): void {
  focusedKey.value = node.key
}

function handleKeydown(event: KeyboardEvent): void {
  if (props.disabled) return
  const nodes = visibleNodes.value
  if (nodes.length === 0) return

  const currentKey = activeFocusKey.value
  const index = Math.max(
    0,
    nodes.findIndex((node) => node.key === currentKey),
  )
  const node = nodes[index]
  if (!node) return

  switch (event.key) {
    case 'ArrowDown': {
      event.preventDefault()
      const next = nodes[Math.min(index + 1, nodes.length - 1)]
      if (next) focusNode(next.key)
      break
    }
    case 'ArrowUp': {
      event.preventDefault()
      const next = nodes[Math.max(index - 1, 0)]
      if (next) focusNode(next.key)
      break
    }
    case 'ArrowRight': {
      event.preventDefault()
      if (!isExpandable(node)) break
      const children = getChildren(node)
      if (!currentExpanded.value.includes(node.key)) handleToggle(node)
      else if (children.length > 0) focusNode(children[0].key)
      break
    }
    case 'ArrowLeft': {
      if (isExpandable(node) && currentExpanded.value.includes(node.key)) {
        event.preventDefault()
        handleToggle(node)
        break
      }
      const parentKey = parentMap.value.get(node.key)
      if (parentKey !== undefined) {
        event.preventDefault()
        focusNode(parentKey)
      }
      break
    }
    case 'Home': {
      event.preventDefault()
      const first = nodes[0]
      if (first) focusNode(first.key)
      break
    }
    case 'End': {
      event.preventDefault()
      const last = nodes[nodes.length - 1]
      if (last) focusNode(last.key)
      break
    }
    case 'Enter':
      if (props.selectable) {
        event.preventDefault()
        handleSelect(node)
      }
      break
    case ' ':
      if (props.checkable) {
        event.preventDefault()
        handleCheck(node)
      }
      break
  }
}

function applyExpanded(keys: TreeKey[]): void {
  if (props.expandedKeys === undefined) internalExpanded.value = keys
  emit('update:expandedKeys', keys)
}

function expandAll(): void {
  const keys: TreeKey[] = []
  for (const [key, item] of nodeIndex.value) {
    if (!item.node.isLeaf && getChildren(item.node).length > 0) keys.push(key)
  }
  applyExpanded(keys)
}

function collapseAll(): void {
  applyExpanded([])
}

function getHalfCheckedKeys(): TreeKey[] {
  return [...halfCheckedKeys.value]
}

watch(
  () => props.expandedKeys,
  (keys) => {
    if (!keys) return
    for (const key of keys) {
      const node = nodeIndex.value.get(key)?.node
      if (node) void ensureLoaded(node)
    }
  },
  { immediate: true },
)

defineExpose({ expandAll, collapseAll, getHalfCheckedKeys })
</script>

<template>
  <div
    ref="rootRef"
    :class="[ns.b, { [ns.m('disabled')]: disabled }]"
    role="tree"
    :aria-label="ariaLabel"
    :aria-multiselectable="multiple || undefined"
    @keydown="handleKeydown"
  >
    <TreeItem
      v-for="node in data"
      :key="node.key"
      :node="node"
      :level="1"
      :indent="indent"
      :expanded-keys="currentExpanded"
      :selected-keys="currentSelected"
      :check-states="checkStates"
      :loading-keys="loadingKeys"
      :focused-key="activeFocusKey"
      :checkable="checkable"
      :selectable="selectable"
      :tree-disabled="disabled"
      :loadable="loadData !== undefined"
      :get-children="getChildren"
      :toggle-node="handleToggle"
      :select-node="handleSelect"
      :check-node="handleCheck"
      :focus-node="handleFocus"
    >
      <template #label="scope">
        <slot name="label" :node="scope.node" />
      </template>
    </TreeItem>

    <div v-if="data.length === 0" :class="ns.e('empty')" role="presentation">
      {{ locale.treeEmpty }}
    </div>
  </div>
</template>
