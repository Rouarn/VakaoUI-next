<script setup lang="ts">
import { ref } from 'vue'
import { VkUpload } from '@/components/upload'
import type { UploadFile, UploadProps } from '@/components/upload'

const fileList = ref<UploadFile[]>([])
const failed = new Set<string>()

const customRequest: NonNullable<UploadProps['customRequest']> = ({
  file,
  onProgress,
  onSuccess,
  onError,
}) => {
  let percent = 0
  const timer = window.setInterval(() => {
    percent = Math.min(100, percent + 20)
    onProgress(percent)
    if (percent < 100) return
    window.clearInterval(timer)
    if (!failed.has(file.uid)) {
      failed.add(file.uid)
      onError(new Error('模拟网络异常'))
      return
    }
    onSuccess({ url: `https://example.com/${file.name}` })
  }, 240)
}
</script>

<template>
  <div class="demo">
    <VkUpload
      v-model:file-list="fileList"
      drag
      multiple
      accept=".png,.jpg,.jpeg,image/*,.pdf"
      :max-size="10 * 1024 * 1024"
      :max-count="6"
      :custom-request="customRequest"
    >
      <div class="drop">
        <strong>拖拽文件到这里，或点击选择</strong>
        <span>支持图片与 PDF，单个不超过 10 MB</span>
      </div>
      <template #tip>首次上传会模拟失败，点击“重新上传”即可成功。</template>
    </VkUpload>
  </div>
</template>

<style scoped>
.demo {
  width: 100%;
}

.drop {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.drop strong {
  color: var(--vk-text-color-1);
  font-weight: var(--vk-font-weight-strong);
}

.drop span {
  color: var(--vk-text-color-3);
  font-size: var(--vk-font-size-small);
}
</style>
