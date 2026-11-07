<script setup lang="ts">
import { ref } from 'vue'
import { VkCollapse, VkCollapseItem } from '@/components/collapse'
import { VkTag } from '@/components/tag'

const expanded = ref<(string | number)[]>(['install'])
const accordion = ref<(string | number)[]>(['a'])
</script>

<template>
  <div class="stack">
    <VkCollapse v-model="expanded">
      <VkCollapseItem name="install" title="安装">
        通过云效私有 npm 安装，并引入全量样式。
      </VkCollapseItem>
      <VkCollapseItem name="usage" title="按需使用">
        每个组件都有独立入口，只有样式需要显式引入。
        <template #extra>
          <VkTag type="primary">推荐</VkTag>
        </template>
      </VkCollapseItem>
      <VkCollapseItem name="theme" title="主题（禁用）" disabled>
        令牌通过 CSS 变量覆盖。
      </VkCollapseItem>
    </VkCollapse>

    <VkCollapse v-model="accordion" accordion :bordered="false">
      <VkCollapseItem name="a" title="手风琴 A">同时只展开一项。</VkCollapseItem>
      <VkCollapseItem name="b" title="手风琴 B">展开 B 会自动收起 A。</VkCollapseItem>
    </VkCollapse>
  </div>
</template>

<style scoped>
.stack {
  display: grid;
  gap: 20px;
  max-width: 560px;
}
</style>
