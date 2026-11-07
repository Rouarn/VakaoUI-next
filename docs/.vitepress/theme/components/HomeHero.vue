<script setup lang="ts">
import { ref } from 'vue'
import { withBase } from 'vitepress'
import { VkInput } from '@/components/input'
import { VkSwitch } from '@/components/switch'
import { VkButton } from '@/components/button'

const name = ref('夏季')
const notify = ref(true)
</script>

<template>
  <div class="vk-hero">
    <div>
      <span class="vk-hero__eyebrow"> VaKao Design System 0.1.0 </span>
      <h1 class="vk-hero__title">
        让每个界面<br />
        落在<em>同一张纸</em>上。
      </h1>
      <p class="vk-hero__desc">
        一套为 VaKao 产品线打磨的 Vue 3 组件库。纸面、墨色与四色星构成完整的视觉语言，
        令牌驱动、亮暗同源，组件本身不发明颜色。
      </p>
      <div class="vk-hero__actions">
        <a class="vk-home-btn vk-home-btn--primary" :href="withBase('/guide/getting-started')">
          开始使用
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M3.5 8h9m0 0L9 4.5M12.5 8 9 11.5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
        <a class="vk-home-btn vk-home-btn--ghost" :href="withBase('/components/')">
          浏览 56 个组件
        </a>
      </div>
      <div class="vk-hero__meta">
        <div class="vk-hero__meta-item">
          <span class="vk-hero__meta-value">56</span>
          <span class="vk-hero__meta-label">可发布组件</span>
        </div>
        <div class="vk-hero__meta-item">
          <span class="vk-hero__meta-value">2</span>
          <span class="vk-hero__meta-label">亮暗主题</span>
        </div>
        <div class="vk-hero__meta-item">
          <span class="vk-hero__meta-value">100%</span>
          <span class="vk-hero__meta-label">令牌着色</span>
        </div>
        <div class="vk-hero__meta-item">
          <span class="vk-hero__meta-value">AA</span>
          <span class="vk-hero__meta-label">对比度基线</span>
        </div>
      </div>
    </div>

    <div class="vk-specimen" aria-hidden="true">
      <div class="vk-specimen__head">
        <span class="vk-specimen__title">Live specimen</span>
        <span class="vk-specimen__badge">朱砂 #C43A21</span>
      </div>

      <div class="vk-specimen__field">
        <label class="vk-specimen__label" for="vk-specimen-name">显示名称</label>
        <VkInput id="vk-specimen-name" v-model="name" size="medium" />
      </div>

      <div class="vk-specimen__row">
        <div>
          <div class="vk-specimen__row-title">邮件通知</div>
          <div class="vk-specimen__row-hint">每周一发送项目摘要</div>
        </div>
        <VkSwitch v-model="notify" size="small" aria-label="邮件通知" />
      </div>

      <div class="vk-specimen__row">
        <div>
          <div class="vk-specimen__row-title">保存改动</div>
          <div class="vk-specimen__row-hint">令牌实时生效</div>
        </div>
        <VkButton type="primary" size="small">保存</VkButton>
      </div>

      <div class="vk-specimen__chips">
        <span class="vk-specimen__chip" style="background: #c43a21" />
        <span class="vk-specimen__chip" style="background: #eddf55" />
        <span class="vk-specimen__chip" style="background: #f0995f" />
        <span class="vk-specimen__chip" style="background: #a27fc2" />
        <span class="vk-specimen__chip" style="background: #5fbedc" />
        <span class="vk-specimen__chip" style="background: #f3f1ec" />
        <span class="vk-specimen__chip" style="background: #171512" />
      </div>

      <div class="vk-specimen__caption">
        <span class="vk-specimen__chip vk-specimen__chip--lg" style="background: #c43a21" />
        <span>强调色用于按钮、选中态与 focus ring，<br />小面积、高对比。</span>
      </div>
    </div>
  </div>
</template>
