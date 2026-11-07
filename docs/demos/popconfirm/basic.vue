<script setup lang="ts">
import { ref } from 'vue'
import { VkPopconfirm } from '@/components/popconfirm'
import { VkButton } from '@/components/button'
import { VkAlert } from '@/components/alert'

const removed = ref(0)
</script>

<template>
  <VkPopconfirm
    title="确认删除该项目？"
    content="删除后无法恢复，请谨慎操作。"
    confirm-type="danger"
    @confirm="removed += 1"
  >
    <template #trigger>
      <VkButton>删除项目</VkButton>
    </template>
  </VkPopconfirm>

  <VkAlert v-if="removed" class="tip" type="success" :title="`已删除 ${removed} 次`" />
</template>

<style scoped>
.tip {
  margin-top: 16px;
}
</style>
