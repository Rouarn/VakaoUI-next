<script setup lang="ts">
import { reactive, ref } from 'vue'
import { VkButton } from '@/components/button'
import { VkConfigProvider } from '@/components/config-provider'
import { VkForm, VkFormItem } from '@/components/form'
import type { ComponentSize } from '@/core/types'
import type { ThemeMode } from '@/core/theme'
import { brandTokens } from '@/tokens'

const theme = ref<ThemeMode>('light')
const size = ref<ComponentSize>('medium')
const loading = ref(false)
const sizes: ComponentSize[] = ['small', 'medium', 'large']

const formRef = ref<{ validate: () => Promise<boolean> } | null>(null)
const formModel = reactive({ name: '', email: '' })
const submitted = ref('')

async function submitForm() {
  const valid = await formRef.value?.validate()
  submitted.value = valid ? '校验通过' : '校验未通过'
}

const swatches = [
  { name: 'paper', value: brandTokens.color.paper },
  { name: 'raised', value: brandTokens.color.raised },
  { name: 'ink', value: brandTokens.color.ink },
  { name: 'accent', value: brandTokens.color.accent },
  { name: 'orange', value: brandTokens.color.orange },
  { name: 'blue', value: brandTokens.color.blue },
  { name: 'purple', value: brandTokens.color.purple },
  { name: 'yellow', value: brandTokens.color.yellow },
]

function toggleLoading() {
  loading.value = true
  window.setTimeout(() => {
    loading.value = false
  }, 1500)
}
</script>

<template>
  <VkConfigProvider :theme="theme" :size="size">
    <main class="playground">
      <header class="playground__header">
        <p class="playground__eyebrow">VAKAO / UI</p>
        <h1 class="playground__title">组件骨架预览</h1>
        <p class="playground__desc">
          纸面、墨色与四芒星四色构成令牌基线；主题由 ConfigProvider 以 CSS 变量注入，不写全局
          :root。
        </p>
      </header>

      <section class="playground__panel">
        <h2>主题与尺寸</h2>
        <div class="playground__row">
          <VkButton variant="outline" @click="theme = theme === 'light' ? 'dark' : 'light'">
            切换 {{ theme === 'light' ? '暗色' : '亮色' }}
          </VkButton>
          <VkButton
            v-for="item in sizes"
            :key="item"
            :size="item"
            :type="size === item ? 'primary' : 'default'"
            variant="ghost"
            @click="size = item"
          >
            {{ item }}
          </VkButton>
        </div>
      </section>

      <section class="playground__panel">
        <h2>按钮类型</h2>
        <div class="playground__row">
          <VkButton>默认按钮</VkButton>
          <VkButton type="primary">主按钮</VkButton>
          <VkButton type="primary" variant="outline">描边</VkButton>
          <VkButton type="primary" variant="ghost">幽灵</VkButton>
          <VkButton type="primary" variant="text">文字</VkButton>
          <VkButton disabled>禁用</VkButton>
          <VkButton type="primary" :loading="loading" @click="toggleLoading">加载</VkButton>
        </div>
        <div class="playground__row">
          <VkButton block type="primary">整行按钮</VkButton>
        </div>
      </section>

      <section class="playground__panel">
        <h2>表单校验</h2>
        <VkForm
          ref="formRef"
          :model="formModel"
          :rules="{
            name: { required: true, message: '请输入名称' },
            email: { type: 'email', message: '邮箱格式不正确' },
          }"
          @submit="submitForm"
        >
          <VkFormItem field="name" label="名称">
            <input v-model="formModel.name" class="playground__input" />
          </VkFormItem>
          <VkFormItem field="email" label="邮箱">
            <input v-model="formModel.email" class="playground__input" />
          </VkFormItem>
          <VkFormItem :show-label="false">
            <VkButton type="primary" html-type="submit">提交</VkButton>
          </VkFormItem>
        </VkForm>
        <p v-if="submitted" class="playground__result">{{ submitted }}</p>
      </section>

      <section class="playground__panel">
        <h2>品牌色板</h2>
        <div class="playground__swatches">
          <div v-for="swatch in swatches" :key="swatch.name" class="playground__swatch">
            <span class="playground__chip" :style="{ background: swatch.value }" />
            <span>{{ swatch.name }}</span>
            <code>{{ swatch.value }}</code>
          </div>
        </div>
      </section>
    </main>
  </VkConfigProvider>
</template>

<style>
body {
  margin: 0;
}

.playground {
  min-height: 100vh;
  padding: 48px;
  background: var(--vk-color-body);
  color: var(--vk-text-color-1);
  font-family: var(--vk-font-family);
  transition: background-color var(--vk-motion-base) var(--vk-easing-standard);
}

.playground__header {
  max-width: 640px;
  margin-bottom: 32px;
}

.playground__eyebrow {
  margin: 0 0 8px;
  color: var(--vk-text-color-3);
  font-family: var(--vk-font-family-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.playground__title {
  margin: 0 0 12px;
  font-family: var(--vk-font-family-display);
  font-size: var(--vk-font-size-title);
  font-weight: 700;
  letter-spacing: -0.01em;
}

.playground__desc {
  margin: 0;
  color: var(--vk-text-color-2);
  line-height: var(--vk-line-height);
}

.playground__panel {
  margin-bottom: 24px;
  padding: 24px;
  border: var(--vk-border-width) solid var(--vk-border-color);
  border-radius: var(--vk-radius-large);
  background: var(--vk-color-card);
}

.playground__panel h2 {
  margin: 0 0 16px;
  font-size: var(--vk-font-size-medium);
  font-weight: var(--vk-font-weight-strong);
  color: var(--vk-text-color-2);
}

.playground__row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.playground__row + .playground__row {
  margin-top: 16px;
}

.playground__input {
  box-sizing: border-box;
  height: var(--vk-height-medium);
  padding: 0 var(--vk-space-3);
  border: var(--vk-border-width) solid var(--vk-border-color);
  border-radius: var(--vk-radius-medium);
  background: var(--vk-color-card);
  color: var(--vk-text-color-1);
  font-family: var(--vk-font-family);
  font-size: var(--vk-font-size-medium);
}

.playground__input:focus-visible {
  border-color: var(--vk-color-primary);
  outline: 2px solid var(--vk-color-primary-suppl);
}

.playground__result {
  margin: 16px 0 0;
  color: var(--vk-text-color-2);
}

.playground__swatches {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
}

.playground__swatch {
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 4px 12px;
  align-items: center;
  color: var(--vk-text-color-2);
  font-size: var(--vk-font-size-small);
}

.playground__chip {
  grid-row: span 2;
  width: 24px;
  height: 24px;
  border: var(--vk-border-width) solid var(--vk-border-color);
  border-radius: var(--vk-radius-small);
}

.playground__swatch code {
  color: var(--vk-text-color-3);
  font-family: var(--vk-font-family-mono);
  font-size: 12px;
}
</style>
