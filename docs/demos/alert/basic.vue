<script setup lang="ts">
import { VkAlert } from '@/components/alert'
</script>

<template>
  <div class="stack">
    <VkAlert type="info" title="信息" description="这是一条普通信息提示。" />
    <VkAlert type="success" title="已完成" description="变更已保存。" />
    <VkAlert type="warning" title="请注意" description="该操作会影响所有成员。" />
    <VkAlert type="error" title="保存失败" description="网络不可用，请检查连接后重试。" closable />
  </div>
</template>

<style scoped>
.stack {
  display: grid;
  gap: 12px;
}
</style>
