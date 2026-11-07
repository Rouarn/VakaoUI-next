<script setup lang="ts">
import { ref } from 'vue'
import { VkConfigProvider } from '@/components/config-provider'
import { VkButton } from '@/components/button'
import type { ThemeMode } from '@/core'

const theme = ref<ThemeMode>('light')
</script>

<template>
  <div>
    <div style="display: flex; gap: 8px; margin-bottom: 16px">
      <VkButton
        size="small"
        :type="theme === 'light' ? 'primary' : 'default'"
        @click="theme = 'light'"
      >
        亮色
      </VkButton>
      <VkButton
        size="small"
        :type="theme === 'dark' ? 'primary' : 'default'"
        @click="theme = 'dark'"
      >
        暗色
      </VkButton>
      <VkButton
        size="small"
        :type="theme === 'auto' ? 'primary' : 'default'"
        @click="theme = 'auto'"
      >
        跟随系统
      </VkButton>
    </div>

    <VkConfigProvider :theme="theme" size="small">
      <div
        style="
          display: flex;
          gap: 8px;
          padding: 20px;
          border-radius: 16px;
          background: var(--vk-color-body);
        "
      >
        <VkButton type="primary">小号主按钮</VkButton>
        <VkButton>小号按钮</VkButton>
      </div>
    </VkConfigProvider>
  </div>
</template>
