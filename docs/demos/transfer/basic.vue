<script setup lang="ts">
import { ref } from 'vue'
import { VkTransfer } from '@/components/transfer'
import type { TransferKey, TransferOption } from '@/components/transfer'

const options: TransferOption[] = [
  { value: 'design', label: '设计稿' },
  { value: 'api', label: '接口文档' },
  { value: 'data', label: '数据字典' },
  { value: 'ops', label: '运维手册' },
  { value: 'brand', label: '品牌素材' },
  { value: 'report', label: '周报模板' },
  { value: 'audit', label: '审计日志（无权限）', disabled: true },
  { value: 'secret', label: '密钥管理（无权限）', disabled: true },
]

const value = ref<TransferKey[]>(['design', 'api'])
</script>

<template>
  <div class="demo">
    <VkTransfer v-model="value" :options="options" :list-height="240" />

    <p class="result">右侧已选：{{ value.length }} 项</p>
  </div>
</template>

<style scoped>
.demo {
  width: 100%;
}

.result {
  margin: 12px 0 0;
  color: var(--vk-text-color-2);
  font-size: 13px;
}
</style>
