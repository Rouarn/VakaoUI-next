<script setup lang="ts">
import { ref } from 'vue'
import { VkModal } from '@/components/modal'
import { VkButton } from '@/components/button'
import { VkInput } from '@/components/input'

const open = ref(false)
const name = ref('')
</script>

<template>
  <VkButton type="primary" @click="open = true">新建项目</VkButton>

  <VkModal v-model:open="open" title="新建项目" @ok="open = false">
    <p class="hint">给项目起一个名字，之后可以随时修改。</p>
    <VkInput v-model="name" placeholder="项目名称" aria-label="项目名称" />
  </VkModal>
</template>

<style scoped>
.hint {
  margin: 0 0 12px;
  color: var(--vk-text-color-2);
  font-size: 13px;
}
</style>
