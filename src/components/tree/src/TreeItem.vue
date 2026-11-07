<script setup lang="ts">
import { computed } from 'vue'
import { useLocale, useNamespace } from '@/core'
import type { TreeKey, TreeNode } from './types'

interface TreeItemProps {
  node: TreeNode
  level: number
  indent: number
  expandedKeys: TreeKey[]
  selectedKeys: TreeKey[]
  checkStates: Map<TreeKey, { checked: boolean; half: boolean }>
  loadingKeys: Set<TreeKey>
  focusedKey: TreeKey | null
  checkable: boolean
  selectable: boolean
  treeDisabled: boolean
  loadable: boolean
  getChildren: (node: TreeNode) => TreeNode[]
  toggleNode: (node: TreeNode) => void
  selectNode: (node: TreeNode, event?: MouseEvent) => void
  checkNode: (node: TreeNode) => void
  focusNode: (node: TreeNode) => void
}

defineOptions({ name: 'VkTreeItem' })

const props = defineProps<TreeItemProps>()

const ns = useNamespace('tree')
const locale = useLocale()

const children = computed(() => props.getChildren(props.node))
const isDisabled = computed(() => props.treeDisabled || Boolean(props.node.disabled))
const isExpandable = computed(
  () => !props.node.isLeaf && (children.value.length > 0 || props.loadable),
)
const expanded = computed(() => props.expandedKeys.includes(props.node.key))
const selected = computed(() => props.selectedKeys.includes(props.node.key))
const checkState = computed(
  () => props.checkStates.get(props.node.key) ?? { checked: false, half: false },
)
const loading = computed(() => props.loadingKeys.has(props.node.key))
const focusable = computed(() => props.focusedKey === props.node.key)

const ariaChecked = computed<'true' | 'false' | 'mixed'>(() => {
  if (checkState.value.checked) return 'true'
  if (checkState.value.half) return 'mixed'
  return 'false'
})

const rowStyle = computed(() => ({ paddingLeft: `${(props.level - 1) * props.indent}px` }))
const loadingStyle = computed(() => ({
  paddingLeft: `${props.level * props.indent + 20}px`,
}))
</script>

<template>
  <div
    :class="[
      ns.e('node'),
      {
        [ns.em('node', 'selected')]: selected,
        [ns.em('node', 'disabled')]: isDisabled,
      },
    ]"
    role="treeitem"
    :data-tree-key="String(node.key)"
    :tabindex="focusable ? 0 : -1"
    :aria-level="level"
    :aria-expanded="isExpandable ? expanded : undefined"
    :aria-selected="selected"
    :aria-checked="checkable ? ariaChecked : undefined"
    :aria-disabled="isDisabled || undefined"
    :style="rowStyle"
    @click="selectNode(node, $event)"
    @focus="focusNode(node)"
  >
    <span
      v-if="isExpandable"
      :class="[ns.e('arrow'), { [ns.em('arrow', 'expanded')]: expanded }]"
      aria-hidden="true"
      @click.stop="toggleNode(node)"
    >
      <svg viewBox="0 0 16 16" width="12" height="12" fill="none">
        <path
          d="M6 4l4 4-4 4"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
    <span v-else :class="ns.e('arrow-placeholder')" aria-hidden="true" />

    <span
      v-if="checkable"
      :class="[
        ns.e('checkbox'),
        {
          [ns.em('checkbox', 'checked')]: checkState.checked,
          [ns.em('checkbox', 'half')]: checkState.half,
          [ns.em('checkbox', 'disabled')]: isDisabled,
        },
      ]"
      aria-hidden="true"
      @click.stop="checkNode(node)"
    >
      <svg v-if="checkState.checked" :class="ns.e('check')" viewBox="0 0 12 12" fill="none">
        <path
          d="M2.5 6.2 4.8 8.5 9.5 3.6"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span v-else-if="checkState.half" :class="ns.e('dash')" />
    </span>

    <span :class="ns.e('label')">
      <slot :node="node">{{ node.label }}</slot>
    </span>
  </div>

  <template v-if="isExpandable && expanded">
    <div v-if="loading" :class="ns.e('loading')" :style="loadingStyle" role="presentation">
      <span :class="ns.e('spinner')" aria-hidden="true" />
      {{ locale.loading }}
    </div>
    <template v-else>
      <TreeItem
        v-for="child in children"
        :key="child.key"
        :node="child"
        :level="level + 1"
        :indent="indent"
        :expanded-keys="expandedKeys"
        :selected-keys="selectedKeys"
        :check-states="checkStates"
        :loading-keys="loadingKeys"
        :focused-key="focusedKey"
        :checkable="checkable"
        :selectable="selectable"
        :tree-disabled="treeDisabled"
        :loadable="loadable"
        :get-children="getChildren"
        :toggle-node="toggleNode"
        :select-node="selectNode"
        :check-node="checkNode"
        :focus-node="focusNode"
      >
        <template #label="scope">
          <slot name="label" :node="scope.node" />
        </template>
      </TreeItem>
    </template>
  </template>
</template>
