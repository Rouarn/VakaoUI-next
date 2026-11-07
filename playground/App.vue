<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { VkButton } from '@/components/button'
import { VkConfigProvider } from '@/components/config-provider'
import { VkForm, VkFormItem } from '@/components/form'
import { VkInput } from '@/components/input'
import { VkSelect, type SelectOption } from '@/components/select'
import { VkSwitch } from '@/components/switch'
import { VkTag } from '@/components/tag'
import { VkAlert } from '@/components/alert'
import { VkProgress } from '@/components/progress'
import type { ComponentSize } from '@/core/types'
import type { ThemeMode } from '@/core/theme'
import { brandTokens } from '@/tokens'

interface DemoMeta {
  key: string
  title: string
  category: string
  desc: string
  code: string
}

const STORAGE_KEY = 'vk-playground:prefs'

interface Prefs {
  theme?: ThemeMode
  size?: ComponentSize
  demo?: string
}

function readPrefs(): Prefs {
  if (typeof localStorage === 'undefined') return {}
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as Prefs
  } catch {
    return {}
  }
}

const prefs = readPrefs()
const prefersDark =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches

const theme = ref<ThemeMode>(prefs.theme ?? (prefersDark ? 'dark' : 'light'))
const size = ref<ComponentSize>(prefs.size ?? 'medium')
const sizes: ComponentSize[] = ['small', 'medium', 'large']

const demos: DemoMeta[] = [
  {
    key: 'button',
    title: 'Button 按钮',
    category: '基础',
    desc: '六种形态覆盖主次操作；加载态、禁用态与整行按钮共用同一套高度令牌。',
    code: `<VkButton>默认按钮</VkButton>
<VkButton type="primary">主按钮</VkButton>
<VkButton type="primary" variant="outline">描边</VkButton>
<VkButton type="primary" variant="ghost">幽灵</VkButton>
<VkButton type="primary" variant="text">文字</VkButton>
<VkButton disabled>禁用</VkButton>
<VkButton type="primary" :loading="loading" @click="toggleLoading">
  加载
</VkButton>`,
  },
  {
    key: 'tag',
    title: 'Tag 标签',
    category: '基础',
    desc: '语义色标签支持圆角、无边框与可关闭形态，用于状态与分类标记。',
    code: `<VkTag type="primary">设计</VkTag>
<VkTag type="info">构建</VkTag>
<VkTag type="success">稳定</VkTag>
<VkTag type="warning" closable @close="remove">待迁移</VkTag>
<VkTag round>圆角</VkTag>
<VkTag :bordered="false" type="error">无边框</VkTag>`,
  },
  {
    key: 'input',
    title: 'Input 输入框',
    category: '表单',
    desc: '基础、可清空、错误、只读与禁用状态，聚焦环跟随主题强调色。',
    code: `<VkInput v-model="value" placeholder="基础输入框" clearable />
<VkInput v-model="email" status="error" placeholder="带错误态的输入框" />
<VkInput model-value="只读内容" readonly />
<VkInput model-value="禁用内容" disabled />`,
  },
  {
    key: 'select',
    title: 'Select 选择器',
    category: '表单',
    desc: '浮层选择器与 ConfigProvider 共用主题和尺寸，支持禁用项与清空。',
    code: `const city = ref('hangzhou')
const options = [
  { label: '杭州', value: 'hangzhou' },
  { label: '上海', value: 'shanghai' },
  { label: '深圳', value: 'shenzhen' },
  { label: '成都（暂未开通）', value: 'chengdu', disabled: true },
]

<VkSelect v-model="city" :options="options" clearable aria-label="城市" />`,
  },
  {
    key: 'switch',
    title: 'Switch 开关',
    category: '表单',
    desc: '即时的二元状态切换，支持小号、禁用与加载态。',
    code: `<VkSwitch v-model="notify" label="接收通知" />
<VkSwitch v-model="dark" label="暗色模式" size="small" />
<VkSwitch v-model="locked" label="已锁定" disabled />
<VkSwitch :model-value="false" loading label="正在保存" />`,
  },
  {
    key: 'form',
    title: 'Form 表单',
    category: '表单',
    desc: '字段级规则与提交校验，错误信息由 async-validator 统一驱动。',
    code: `<VkForm ref="formRef" :model="formModel" :rules="rules" @submit="submitForm">
  <VkFormItem field="name" label="名称">
    <VkInput v-model="formModel.name" />
  </VkFormItem>
  <VkFormItem field="email" label="邮箱">
    <VkInput v-model="formModel.email" />
  </VkFormItem>
  <VkFormItem :show-label="false">
    <VkButton type="primary" html-type="submit">提交</VkButton>
  </VkFormItem>
</VkForm>`,
  },
  {
    key: 'alert',
    title: 'Alert 提示',
    category: '反馈',
    desc: '信息、成功、警告与错误四种语义，可关闭的提示条。',
    code: `<VkAlert type="info" title="信息" description="这是一条普通信息提示。" />
<VkAlert type="success" title="已完成" description="变更已保存。" />
<VkAlert type="warning" title="请注意" description="该操作会影响所有成员。" />
<VkAlert
  type="error"
  title="保存失败"
  description="网络不可用，请检查连接后重试。"
  closable
/>`,
  },
  {
    key: 'progress',
    title: 'Progress 进度条',
    category: '反馈',
    desc: '线性进度条带标签，数值变化通过按钮即时反馈。',
    code: `const value = ref(36)

<VkProgress :value="value" show-label />
<VkButton size="small" @click="value = Math.max(0, value - 10)">-10</VkButton>
<VkButton size="small" @click="value = Math.min(100, value + 10)">+10</VkButton>`,
  },
  {
    key: 'tokens',
    title: '设计令牌',
    category: '主题',
    desc: '纸面、墨色与四色星构成品牌基线；组件只消费 --vk-* 令牌。',
    code: `--vk-color-paper: ${brandTokens.color.paper};
--vk-color-raised: ${brandTokens.color.raised};
--vk-color-ink: ${brandTokens.color.ink};
--vk-color-primary: ${brandTokens.color.accent};
--vk-color-orange: ${brandTokens.color.orange};
--vk-color-blue: ${brandTokens.color.blue};
--vk-color-purple: ${brandTokens.color.purple};
--vk-color-yellow: ${brandTokens.color.yellow};`,
  },
]

const groups = [
  { title: '基础', keys: ['button', 'tag'] },
  { title: '表单', keys: ['input', 'select', 'switch', 'form'] },
  { title: '反馈', keys: ['alert', 'progress'] },
  { title: '主题', keys: ['tokens'] },
]

const demoMap = new Map(demos.map((demo) => [demo.key, demo]))
const demoTitle = (key: string) => demoMap.get(key)?.title ?? key

const activeKey = ref(
  prefs.demo && demos.some((demo) => demo.key === prefs.demo) ? prefs.demo : 'button',
)
const active = computed(() => demos.find((demo) => demo.key === activeKey.value) ?? demos[0])
const showCode = ref(false)
const copied = ref(false)

watch([theme, size, activeKey], ([nextTheme, nextSize, nextDemo]) => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ theme: nextTheme, size: nextSize, demo: nextDemo }),
    )
  } catch {
    /* 忽略隐私模式下的写入失败 */
  }
})

watch(activeKey, () => {
  showCode.value = false
  copied.value = false
})

let copiedTimer: number | undefined

async function copyCode() {
  if (!active.value.code) return
  try {
    await navigator.clipboard.writeText(active.value.code)
    copied.value = true
    window.clearTimeout(copiedTimer)
    copiedTimer = window.setTimeout(() => {
      copied.value = false
    }, 1600)
  } catch {
    copied.value = false
  }
}

const loading = ref(false)

function toggleLoading() {
  loading.value = true
  window.setTimeout(() => {
    loading.value = false
  }, 1500)
}

const formRef = ref<{ validate: () => Promise<boolean> } | null>(null)
const formModel = reactive({ name: '', email: '' })
const formSubmitted = ref('')

async function submitForm() {
  const valid = await formRef.value?.validate()
  formSubmitted.value = valid ? '校验通过，表单已提交' : '校验未通过，请检查字段'
}

const city = ref<string | number | null>('hangzhou')
const cityOptions: SelectOption[] = [
  { label: '杭州', value: 'hangzhou' },
  { label: '上海', value: 'shanghai' },
  { label: '深圳', value: 'shenzhen' },
  { label: '成都（暂未开通）', value: 'chengdu', disabled: true },
]

const notify = ref(true)
const compact = ref(false)
const locked = ref(true)

const tags = ref([
  { key: 'design', label: '设计', type: 'primary' as const },
  { key: 'build', label: '构建', type: 'info' as const },
  { key: 'stable', label: '稳定', type: 'success' as const },
  { key: 'deprecated', label: '待迁移', type: 'warning' as const },
])

function removeTag(key: string) {
  tags.value = tags.value.filter((tag) => tag.key !== key)
}

const inputValue = ref('')
const inputEmail = ref('not-an-email')
const progress = ref(36)

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

const isDark = computed(() => theme.value === 'dark')
</script>

<template>
  <VkConfigProvider :theme="theme" :size="size">
    <div class="pg" :class="{ 'pg--dark': isDark }">
      <header class="pg-topbar">
        <a class="pg-brand" href="https://ui.woyuxiaji.cn" aria-label="VaKao UI 文档站">
          <svg class="pg-mark" viewBox="0 0 2048 2048" aria-hidden="true">
            <path
              d="M 1024 1024 C 1024 1024 718.15 718.15 718.15 718.15 C 855.936 508.605 957.886 282.875 1024 40.96 C 1090.114 282.875 1192.064 508.605 1329.85 718.15 C 1329.85 718.15 1024 1024 1024 1024 Z"
              fill="#F0995F"
            />
            <path
              d="M 1024 1024 C 1024 1024 718.15 718.15 718.15 718.15 C 855.936 508.605 957.886 282.875 1024 40.96 C 1090.114 282.875 1192.064 508.605 1329.85 718.15 C 1329.85 718.15 1024 1024 1024 1024 Z"
              fill="#5FBEDC"
              transform="rotate(90 1024 1024)"
            />
            <path
              d="M 1024 1024 C 1024 1024 718.15 718.15 718.15 718.15 C 855.936 508.605 957.886 282.875 1024 40.96 C 1090.114 282.875 1192.064 508.605 1329.85 718.15 C 1329.85 718.15 1024 1024 1024 1024 Z"
              fill="#A27FC2"
              transform="rotate(180 1024 1024)"
            />
            <path
              d="M 1024 1024 C 1024 1024 718.15 718.15 718.15 718.15 C 855.936 508.605 957.886 282.875 1024 40.96 C 1090.114 282.875 1192.064 508.605 1329.85 718.15 C 1329.85 718.15 1024 1024 1024 1024 Z"
              fill="#EDDF55"
              transform="rotate(270 1024 1024)"
            />
          </svg>
          <span class="pg-brand__name">VaKao UI</span>
          <span class="pg-brand__tag">Playground</span>
        </a>

        <div class="pg-tools">
          <div class="pg-size" role="group" aria-label="组件尺寸">
            <button
              v-for="item in sizes"
              :key="item"
              type="button"
              class="pg-size__btn"
              :class="{ 'is-active': size === item }"
              :aria-pressed="size === item"
              @click="size = item"
            >
              {{ item === 'small' ? 'S' : item === 'medium' ? 'M' : 'L' }}
            </button>
          </div>
          <button
            type="button"
            class="pg-theme"
            :aria-label="isDark ? '切换到浅色模式' : '切换到暗色模式'"
            :title="isDark ? '切换到浅色模式' : '切换到暗色模式'"
            @click="theme = isDark ? 'light' : 'dark'"
          >
            <svg v-if="isDark" viewBox="0 0 24 24" aria-hidden="true">
              <circle
                cx="12"
                cy="12"
                r="4.2"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
              />
              <path
                d="M12 2.4v2.2M12 19.4v2.2M2.4 12h2.2M19.4 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
              />
            </svg>
            <svg v-else viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M20.2 14.2A8.4 8.4 0 1 1 9.8 3.8a6.8 6.8 0 0 0 10.4 10.4Z"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </header>

      <div class="pg-body">
        <aside class="pg-nav" aria-label="组件导航">
          <div v-for="group in groups" :key="group.title" class="pg-nav__group">
            <p class="pg-nav__title">{{ group.title }}</p>
            <button
              v-for="key in group.keys"
              :key="key"
              type="button"
              class="pg-nav__item"
              :data-demo="key"
              :class="{ 'is-active': activeKey === key }"
              :aria-current="activeKey === key ? 'true' : undefined"
              @click="activeKey = key"
            >
              <span class="pg-nav__name">{{ demoTitle(key) }}</span>
            </button>
          </div>
        </aside>

        <main class="pg-main">
          <p class="pg-crumb">Playground / {{ active.category }}</p>
          <h1 class="pg-title">{{ active.title }}</h1>
          <p class="pg-desc">{{ active.desc }}</p>

          <section class="pg-stage">
            <div class="pg-stage__bar">
              <span class="pg-stage__label">预览</span>
              <div class="pg-stage__actions">
                <button type="button" class="pg-action" @click="copyCode">
                  {{ copied ? '已复制' : '复制代码' }}
                </button>
                <button
                  type="button"
                  class="pg-action"
                  :aria-expanded="showCode"
                  @click="showCode = !showCode"
                >
                  {{ showCode ? '收起代码' : '查看代码' }}
                </button>
              </div>
            </div>

            <div class="pg-preview">
              <div v-if="activeKey === 'button'" class="demo demo--wide">
                <div class="demo__row">
                  <VkButton>默认按钮</VkButton>
                  <VkButton type="primary">主按钮</VkButton>
                  <VkButton type="primary" variant="outline">描边</VkButton>
                  <VkButton type="primary" variant="ghost">幽灵</VkButton>
                  <VkButton type="primary" variant="text">文字</VkButton>
                  <VkButton disabled>禁用</VkButton>
                  <VkButton type="primary" :loading="loading" @click="toggleLoading">加载</VkButton>
                </div>
                <div class="demo__row">
                  <VkButton block type="primary">整行按钮</VkButton>
                </div>
              </div>

              <div v-else-if="activeKey === 'tag'" class="demo">
                <div class="demo__row">
                  <VkTag
                    v-for="tag in tags"
                    :key="tag.key"
                    :type="tag.type"
                    closable
                    @close="removeTag(tag.key)"
                  >
                    {{ tag.label }}
                  </VkTag>
                </div>
                <div class="demo__row">
                  <VkTag>默认</VkTag>
                  <VkTag round>圆角</VkTag>
                  <VkTag :bordered="false" type="error">无边框</VkTag>
                  <VkTag size="small">小号</VkTag>
                  <VkTag size="large" type="primary">大号</VkTag>
                  <VkTag disabled>禁用</VkTag>
                </div>
              </div>

              <div v-else-if="activeKey === 'input'" class="demo demo--narrow">
                <VkInput v-model="inputValue" placeholder="基础输入框" clearable />
                <VkInput v-model="inputEmail" status="error" placeholder="带错误态的输入框" />
                <VkInput model-value="只读内容" readonly />
                <VkInput model-value="禁用内容" disabled />
              </div>

              <div v-else-if="activeKey === 'select'" class="demo demo--narrow">
                <VkSelect v-model="city" :options="cityOptions" clearable aria-label="城市" />
                <p class="demo__hint">当前选择：{{ city ?? '未选择' }}</p>
              </div>

              <div v-else-if="activeKey === 'switch'" class="demo demo--narrow">
                <VkSwitch v-model="notify" label="接收通知" />
                <VkSwitch v-model="compact" label="紧凑模式" size="small" />
                <VkSwitch v-model="locked" label="已锁定" disabled />
                <VkSwitch :model-value="false" loading label="正在保存" />
              </div>

              <div v-else-if="activeKey === 'form'" class="demo demo--narrow">
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
                    <VkInput v-model="formModel.name" placeholder="请输入名称" />
                  </VkFormItem>
                  <VkFormItem field="email" label="邮箱">
                    <VkInput v-model="formModel.email" placeholder="name@example.com" />
                  </VkFormItem>
                  <VkFormItem :show-label="false">
                    <VkButton type="primary" html-type="submit">提交</VkButton>
                  </VkFormItem>
                </VkForm>
                <p v-if="formSubmitted" class="demo__hint" aria-live="polite">
                  {{ formSubmitted }}
                </p>
              </div>

              <div v-else-if="activeKey === 'alert'" class="demo demo--wide">
                <VkAlert type="info" title="信息" description="这是一条普通信息提示。" />
                <VkAlert type="success" title="已完成" description="变更已保存。" />
                <VkAlert type="warning" title="请注意" description="该操作会影响所有成员。" />
                <VkAlert
                  type="error"
                  title="保存失败"
                  description="网络不可用，请检查连接后重试。"
                  closable
                />
              </div>

              <div v-else-if="activeKey === 'progress'" class="demo demo--narrow">
                <VkProgress :value="progress" show-label />
                <div class="demo__row demo__row--center">
                  <VkButton size="small" @click="progress = Math.max(0, progress - 10)">
                    -10
                  </VkButton>
                  <VkButton
                    size="small"
                    type="primary"
                    @click="progress = Math.min(100, progress + 10)"
                  >
                    +10
                  </VkButton>
                </div>
              </div>

              <div v-else class="demo demo--wide">
                <div class="pg-swatches">
                  <div v-for="swatch in swatches" :key="swatch.name" class="pg-swatch">
                    <span class="pg-swatch__chip" :style="{ background: swatch.value }" />
                    <span class="pg-swatch__name">{{ swatch.name }}</span>
                    <code class="pg-swatch__value">{{ swatch.value }}</code>
                  </div>
                </div>
                <div class="pg-type">
                  <p class="pg-type__display">纸面、墨色与四色星</p>
                  <p class="pg-type__body">
                    VaKao UI 用一套令牌贯穿组件、文档与示例，主题切换只替换变量，不复制样式。
                  </p>
                  <code class="pg-type__mono">--vk-font-family-mono</code>
                </div>
              </div>
            </div>

            <pre v-if="showCode" class="pg-code"><code>{{ active.code }}</code></pre>
          </section>

          <dl class="pg-meta">
            <div>
              <dt>组件尺寸</dt>
              <dd>{{ size }}</dd>
            </div>
            <div>
              <dt>当前主题</dt>
              <dd>{{ isDark ? 'dark' : 'light' }}</dd>
            </div>
            <div>
              <dt>令牌前缀</dt>
              <dd><code>--vk-*</code></dd>
            </div>
          </dl>
        </main>
      </div>
    </div>
  </VkConfigProvider>
</template>

<style>
html,
body {
  margin: 0;
}

body {
  background: #fbfaf7;
}

.pg {
  --pg-bg: #fbfaf7;
  --pg-surface: #ffffff;
  --pg-surface-2: #f6f4ef;
  --pg-surface-3: #f1eee7;
  --pg-line: #e9e4db;
  --pg-ink: #171512;
  --pg-ink-2: #57524a;
  --pg-ink-3: #857f73;
  --pg-accent: #c43a21;
  --pg-accent-soft: #fbede8;
  --pg-accent-ink: #a8321b;
  --pg-preview: #f7f5f0;
  --pg-code-bg: #faf9f6;
  --pg-code-ink: #2a2723;
  --pg-shadow: 0 1px 2px rgba(23, 21, 18, 0.03), 0 4px 12px rgba(23, 21, 18, 0.035);
  --pg-shadow-lg: 0 2px 4px rgba(23, 21, 18, 0.03), 0 16px 40px rgba(23, 21, 18, 0.06);
  --pg-font:
    'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', 'PingFang SC',
    'Hiragino Sans GB', 'Noto Sans SC', 'Microsoft YaHei', sans-serif;
  --pg-mono: 'SF Mono', 'JetBrains Mono', Menlo, Consolas, 'Liberation Mono', monospace;
  --pg-fast: 150ms;
  --pg-ease: cubic-bezier(0.2, 0, 0, 1);

  min-height: 100vh;
  background: var(--pg-bg);
  color: var(--pg-ink);
  font-family: var(--pg-font);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

.pg--dark {
  --pg-bg: #0f0e0d;
  --pg-surface: #181614;
  --pg-surface-2: #1f1c19;
  --pg-surface-3: #25211d;
  --pg-line: #2c2924;
  --pg-ink: #f4f1e9;
  --pg-ink-2: #bdb7ab;
  --pg-ink-3: #928c80;
  --pg-accent: #ff8a5b;
  --pg-accent-soft: #33231c;
  --pg-accent-ink: #ffa184;
  --pg-preview: #151310;
  --pg-code-bg: #141311;
  --pg-code-ink: #e6e2d8;
  --pg-shadow: 0 1px 2px rgba(0, 0, 0, 0.24), 0 4px 12px rgba(0, 0, 0, 0.18);
  --pg-shadow-lg: 0 2px 4px rgba(0, 0, 0, 0.24), 0 16px 40px rgba(0, 0, 0, 0.3);
}

.pg *,
.pg *::before,
.pg *::after {
  box-sizing: border-box;
}

.pg :focus-visible {
  outline: 2px solid var(--pg-accent);
  outline-offset: 2px;
}

.pg-topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 16px;
  height: 64px;
  padding: 0 clamp(16px, 4vw, 48px);
  border-bottom: 1px solid var(--pg-line);
  background: color-mix(in srgb, var(--pg-bg) 84%, transparent);
  backdrop-filter: saturate(180%) blur(16px);
}

.pg-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--pg-ink);
  text-decoration: none;
}

.pg-mark {
  width: 28px;
  height: 28px;
  flex: none;
}

.pg-brand__name {
  font-size: 15px;
  font-weight: 650;
  letter-spacing: -0.015em;
}

.pg-brand__tag {
  padding: 3px 8px;
  border: 1px solid var(--pg-line);
  border-radius: 999px;
  color: var(--pg-ink-3);
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.pg-tools {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
}

.pg-size {
  display: inline-flex;
  padding: 3px;
  border: 1px solid var(--pg-line);
  border-radius: 999px;
  background: var(--pg-surface);
}

.pg-size__btn {
  min-width: 28px;
  height: 26px;
  padding: 0 6px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--pg-ink-3);
  font: inherit;
  font-size: 11.5px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background var(--pg-fast) var(--pg-ease),
    color var(--pg-fast) var(--pg-ease);
}

.pg-size__btn:hover {
  color: var(--pg-ink);
}

.pg-size__btn.is-active {
  background: var(--pg-accent);
  color: #fff;
}

.pg-theme {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  padding: 0;
  border: 1px solid var(--pg-line);
  border-radius: 10px;
  background: var(--pg-surface);
  color: var(--pg-ink-2);
  cursor: pointer;
  transition:
    background var(--pg-fast) var(--pg-ease),
    color var(--pg-fast) var(--pg-ease),
    border-color var(--pg-fast) var(--pg-ease);
}

.pg-theme:hover {
  border-color: var(--pg-accent);
  color: var(--pg-accent);
}

.pg-theme svg {
  width: 17px;
  height: 17px;
}

.pg-body {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: clamp(24px, 4vw, 56px);
  max-width: 1440px;
  margin: 0 auto;
  padding: 40px clamp(16px, 4vw, 48px) 96px;
  align-items: start;
}

.pg-nav {
  position: sticky;
  top: 104px;
}

.pg-nav__group + .pg-nav__group {
  margin-top: 22px;
}

.pg-nav__title {
  margin: 0 0 8px;
  padding: 0 10px;
  color: var(--pg-ink-3);
  font-size: 10.5px;
  font-weight: 650;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.pg-nav__item {
  display: flex;
  width: 100%;
  align-items: center;
  padding: 7px 10px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--pg-ink-2);
  font: inherit;
  font-size: 13.5px;
  text-align: left;
  cursor: pointer;
  transition:
    background var(--pg-fast) var(--pg-ease),
    color var(--pg-fast) var(--pg-ease);
}

.pg-nav__item:hover {
  background: var(--pg-surface-2);
  color: var(--pg-ink);
}

.pg-nav__item.is-active {
  background: var(--pg-accent-soft);
  color: var(--pg-accent-ink);
  font-weight: 600;
}

.pg-main {
  min-width: 0;
}

.pg-crumb {
  margin: 0 0 10px;
  color: var(--pg-ink-3);
  font-family: var(--pg-mono);
  font-size: 11.5px;
  letter-spacing: 0.04em;
}

.pg-title {
  margin: 0 0 10px;
  font-size: clamp(26px, 3vw, 34px);
  font-weight: 680;
  letter-spacing: -0.025em;
  line-height: 1.2;
}

.pg-desc {
  max-width: 62ch;
  margin: 0 0 28px;
  color: var(--pg-ink-2);
  font-size: 14.5px;
  line-height: 1.7;
}

.pg-stage {
  overflow: hidden;
  border: 1px solid var(--pg-line);
  border-radius: 16px;
  background: var(--pg-surface);
  box-shadow: var(--pg-shadow);
}

.pg-stage__bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px 10px 18px;
  border-bottom: 1px solid var(--pg-line);
}

.pg-stage__label {
  color: var(--pg-ink-3);
  font-size: 10.5px;
  font-weight: 650;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.pg-stage__actions {
  display: flex;
  gap: 6px;
  margin-left: auto;
}

.pg-action {
  padding: 5px 10px;
  border: 1px solid var(--pg-line);
  border-radius: 7px;
  background: var(--pg-surface);
  color: var(--pg-ink-2);
  font: inherit;
  font-size: 12px;
  cursor: pointer;
  transition:
    background var(--pg-fast) var(--pg-ease),
    color var(--pg-fast) var(--pg-ease),
    border-color var(--pg-fast) var(--pg-ease);
}

.pg-action:hover {
  border-color: var(--pg-accent);
  color: var(--pg-accent);
}

.pg-preview {
  display: flex;
  min-height: 220px;
  align-items: center;
  justify-content: center;
  padding: clamp(24px, 3vw, 40px);
  background: var(--pg-preview);
}

.demo {
  display: grid;
  width: 100%;
  justify-items: stretch;
  gap: 16px;
}

.demo--narrow {
  max-width: 380px;
}

.demo--wide {
  max-width: 760px;
}

.demo__row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
}

.demo__row--center {
  justify-content: center;
}

.demo__hint {
  margin: 0;
  color: var(--pg-ink-2);
  font-size: 13px;
}

.pg-code {
  margin: 0;
  padding: 20px 22px;
  border-top: 1px solid var(--pg-line);
  background: var(--pg-code-bg);
  color: var(--pg-code-ink);
  font-family: var(--pg-mono);
  font-size: 12.5px;
  line-height: 1.75;
  overflow-x: auto;
  tab-size: 2;
}

.pg-code code {
  font-family: inherit;
  white-space: pre;
}

.pg-meta {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin: 20px 0 0;
}

.pg-meta div {
  padding: 14px 16px;
  border: 1px solid var(--pg-line);
  border-radius: 12px;
  background: var(--pg-surface);
}

.pg-meta dt {
  margin: 0 0 4px;
  color: var(--pg-ink-3);
  font-size: 11px;
  letter-spacing: 0.04em;
}

.pg-meta dd {
  margin: 0;
  color: var(--pg-ink);
  font-size: 13.5px;
  font-weight: 600;
}

.pg-meta code {
  font-family: var(--pg-mono);
  font-size: 12px;
}

.pg-swatches {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  width: 100%;
}

.pg-swatch {
  display: grid;
  grid-template-columns: 26px minmax(0, 1fr);
  gap: 2px 10px;
  align-items: center;
  padding: 10px;
  border: 1px solid var(--pg-line);
  border-radius: 10px;
  background: var(--pg-surface);
}

.pg-swatch__chip {
  grid-row: span 2;
  width: 26px;
  height: 26px;
  border: 1px solid var(--pg-line);
  border-radius: 7px;
}

.pg-swatch__name {
  color: var(--pg-ink-2);
  font-size: 12px;
  font-weight: 600;
}

.pg-swatch__value {
  overflow: hidden;
  color: var(--pg-ink-3);
  font-family: var(--pg-mono);
  font-size: 11px;
  text-overflow: ellipsis;
}

.pg-type {
  width: 100%;
  padding-top: 6px;
  border-top: 1px solid var(--pg-line);
}

.pg-type__display {
  margin: 14px 0 6px;
  font-size: clamp(20px, 2.4vw, 26px);
  font-weight: 680;
  letter-spacing: -0.02em;
}

.pg-type__body {
  max-width: 56ch;
  margin: 0 0 10px;
  color: var(--pg-ink-2);
  font-size: 13.5px;
  line-height: 1.7;
}

.pg-type__mono {
  color: var(--pg-accent-ink);
  font-family: var(--pg-mono);
  font-size: 12px;
}

@media (max-width: 900px) {
  .pg-body {
    grid-template-columns: minmax(0, 1fr);
    gap: 20px;
    padding-top: 20px;
  }

  .pg-nav {
    position: static;
    display: flex;
    gap: 18px;
    padding: 2px 0 10px;
    overflow-x: auto;
    border-bottom: 1px solid var(--pg-line);
    scrollbar-width: none;
  }

  .pg-nav::-webkit-scrollbar {
    display: none;
  }

  .pg-nav__group {
    display: flex;
    flex: none;
    align-items: center;
    gap: 6px;
  }

  .pg-nav__group + .pg-nav__group {
    margin-top: 0;
    padding-left: 18px;
    border-left: 1px solid var(--pg-line);
  }

  .pg-nav__title {
    margin: 0;
    padding: 0 2px;
    white-space: nowrap;
  }

  .pg-nav__item {
    width: auto;
    padding: 6px 10px;
    white-space: nowrap;
  }

  .pg-crumb {
    font-size: 11px;
  }
}

@media (max-width: 640px) {
  .pg-topbar {
    gap: 10px;
    height: 58px;
  }

  .pg-brand__tag {
    display: none;
  }

  .pg-brand__name {
    font-size: 14px;
  }

  .pg-preview {
    min-height: 180px;
  }

  .pg-meta {
    grid-template-columns: minmax(0, 1fr);
  }

  .pg-stage__bar {
    padding: 8px 10px 8px 14px;
  }

  .pg-action {
    padding: 4px 8px;
    font-size: 11.5px;
  }

  .pg-code {
    padding: 16px;
    font-size: 12px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .pg *,
  .pg *::before,
  .pg *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
</style>
