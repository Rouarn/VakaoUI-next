<script setup lang="ts">
import { computed, ref } from 'vue'
import { VkButton } from '@/components/button'
import { VkWatermark } from '@/components/watermark'

type Mode = 'single' | 'multi' | 'image'

const mode = ref<Mode>('single')

const content = computed<string | string[]>(() =>
  mode.value === 'multi' ? ['机密资料', '仅限内部传阅'] : '机密资料',
)

const markImage = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="60"><rect width="120" height="60" rx="12" fill="#C43A21" fill-opacity="0.16"/><text x="60" y="38" text-anchor="middle" font-family="sans-serif" font-size="20" fill="#C43A21">VK</text></svg>',
)}`
</script>

<template>
  <div class="stack">
    <div class="actions">
      <VkButton
        size="small"
        :type="mode === 'single' ? 'primary' : 'default'"
        @click="mode = 'single'"
      >
        单行文字
      </VkButton>
      <VkButton
        size="small"
        :type="mode === 'multi' ? 'primary' : 'default'"
        @click="mode = 'multi'"
      >
        多行文字
      </VkButton>
      <VkButton
        size="small"
        :type="mode === 'image' ? 'primary' : 'default'"
        @click="mode = 'image'"
      >
        图片水印
      </VkButton>
    </div>

    <VkWatermark
      :content="mode === 'image' ? '' : content"
      :image="mode === 'image' ? markImage : undefined"
      :gap="[120, 120]"
    >
      <div class="panel">
        <div class="panel__title">季度经营简报</div>
        <p class="panel__text">
          水印层覆盖在内容之上但不拦截鼠标事件，切换上方按钮可以查看单行、多行与图片水印的差异。
        </p>
      </div>
    </VkWatermark>
  </div>
</template>

<style scoped>
.stack {
  display: grid;
  gap: 16px;
  max-width: 560px;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.panel {
  box-sizing: border-box;
  min-height: 220px;
  padding: 24px;
  border: 1px solid var(--vk-border-color);
  border-radius: var(--vk-radius-large);
  background: var(--vk-color-card);
}

.panel__title {
  margin-bottom: 12px;
  color: var(--vk-text-color-1);
  font-size: 16px;
  font-weight: var(--vk-font-weight-strong);
}

.panel__text {
  margin: 0;
  color: var(--vk-text-color-2);
  font-size: 13px;
  line-height: 1.7;
}
</style>
