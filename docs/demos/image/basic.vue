<script setup lang="ts">
import { VkImage } from '@/components/image'
</script>

<template>
  <div class="demo">
    <div class="row">
      <VkImage
        src="https://picsum.photos/seed/vakao-1/640/400"
        alt="默认封面"
        :width="220"
        :height="140"
      />
      <VkImage
        src="https://picsum.photos/seed/vakao-2/640/400"
        alt="圆形裁切"
        :width="140"
        :height="140"
        round
      />
      <VkImage
        src="https://picsum.photos/seed/vakao-3/640/400"
        preview-src="https://picsum.photos/seed/vakao-3/1600/1000"
        alt="点击预览"
        :width="220"
        :height="140"
        preview
      />
    </div>

    <div class="row">
      <VkImage
        src="/images/this-file-does-not-exist.jpg"
        fallback-src="https://picsum.photos/seed/vakao-4/640/400"
        alt="回退图片"
        :width="220"
        :height="140"
      />
    </div>
  </div>
</template>

<style scoped>
.demo {
  display: grid;
  gap: 16px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
