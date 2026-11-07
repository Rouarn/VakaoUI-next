<script setup lang="ts">
import { ref } from 'vue'
import { VkTree } from '@/components/tree'
import type { TreeKey, TreeNode } from '@/components/tree'

const treeRef = ref<InstanceType<typeof VkTree> | null>(null)

const data: TreeNode[] = [
  {
    key: 'design',
    label: '设计中心',
    children: [
      { key: 'design-ui', label: '界面组' },
      { key: 'design-brand', label: '品牌组（已停用）', disabled: true },
      {
        key: 'design-research',
        label: '用研组',
        children: [{ key: 'design-research-a', label: '定量研究' }],
      },
    ],
  },
  {
    key: 'engineering',
    label: '研发中心',
    children: [
      { key: 'engineering-fe', label: '前端组' },
      { key: 'engineering-be', label: '服务端组' },
    ],
  },
  { key: 'async', label: '异步加载节点（点击箭头或按钮）' },
]

const expandedKeys = ref<TreeKey[]>(['design'])
const selectedKeys = ref<TreeKey[]>(['design-ui'])
const checkedKeys = ref<TreeKey[]>(['design-ui'])
const halfLabel = ref('—')

function loadData(node: TreeNode): Promise<TreeNode[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { key: `${node.key}-1`, label: '异步子节点 A' },
        { key: `${node.key}-2`, label: '异步子节点 B' },
      ])
    }, 300)
  })
}

function expandAsync(): void {
  if (!expandedKeys.value.includes('async')) {
    expandedKeys.value = [...expandedKeys.value, 'async']
  }
}

function inspectHalf(): void {
  const keys = treeRef.value?.getHalfCheckedKeys() ?? []
  halfLabel.value = keys.length ? keys.map((key) => String(key)).join('、') : '无'
}
</script>

<template>
  <div class="demo-stack">
    <VkTree
      ref="treeRef"
      v-model:expanded-keys="expandedKeys"
      v-model:selected-keys="selectedKeys"
      v-model:checked-keys="checkedKeys"
      class="tree"
      :data="data"
      checkable
      :load-data="loadData"
      aria-label="团队结构"
    />

    <div class="toolbar">
      <button type="button" class="action" @click="expandAsync">展开异步节点</button>
      <button type="button" class="action" @click="inspectHalf">读取半选</button>
    </div>

    <p class="result">选中：{{ selectedKeys.join('、') || '无' }}</p>
    <p class="result">半选：{{ halfLabel }}</p>
  </div>
</template>

<style scoped>
.demo-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 460px;
}

.tree {
  box-sizing: border-box;
  width: 100%;
  padding: 8px;
  border: 1px solid var(--vk-border-color);
  border-radius: var(--vk-radius-medium);
  background: var(--vk-color-card);
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.action {
  padding: 6px 12px;
  border: 1px solid var(--vk-border-color);
  border-radius: var(--vk-radius-small);
  background: var(--vk-color-card);
  color: var(--vk-text-color-1);
  font-family: inherit;
  font-size: 13px;
  cursor: pointer;
}

.action:hover {
  border-color: var(--vk-color-primary);
  color: var(--vk-color-primary);
}

.action:focus-visible {
  outline: 2px solid var(--vk-color-primary);
  outline-offset: 2px;
}

.result {
  margin: 0;
  color: var(--vk-text-color-2);
  font-size: 13px;
}
</style>
