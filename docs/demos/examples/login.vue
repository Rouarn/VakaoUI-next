<script setup lang="ts">
import { reactive, ref } from 'vue'
import { VkForm, VkFormItem } from '@/components/form'
import { VkInput } from '@/components/input'
import { VkCheckbox } from '@/components/checkbox'
import { VkButton } from '@/components/button'
import { VkAlert } from '@/components/alert'

const formRef = ref<{ validate: () => Promise<boolean> } | null>(null)
const model = reactive({ email: '', password: '', remember: true })
const status = ref<'idle' | 'busy' | 'ok' | 'error'>('idle')

async function submit(): Promise<void> {
  status.value = 'busy'
  const valid = await formRef.value?.validate()
  status.value = valid ? 'ok' : 'error'
}
</script>

<template>
  <div class="auth">
    <aside class="auth__brand">
      <div class="auth__brand-top">
        <span class="auth__mark">VaKao</span>
        <span class="auth__mark-dot" />
      </div>

      <div class="auth__brand-copy">
        <p class="auth__eyebrow">Workspace</p>
        <h2 class="auth__title">回到你的<br />工作台。</h2>
        <p class="auth__lede">项目、文档与设计稿都在同一处。<br />登录后继续上次的进度。</p>
      </div>

      <div class="auth__brand-foot">
        <div class="auth__dots" aria-hidden="true">
          <span style="background: #eddf55" />
          <span style="background: #f0995f" />
          <span style="background: #a27fc2" />
          <span style="background: #5fbedc" />
        </div>
        <span class="auth__foot-text">VaKao Design System · Paper &amp; Ink</span>
      </div>
    </aside>

    <main class="auth__panel">
      <div class="auth__form">
        <p class="auth__kicker">登录</p>
        <h1 class="auth__heading">欢迎回来</h1>
        <p class="auth__sub">使用团队邮箱继续访问工作区。</p>

        <VkForm
          ref="formRef"
          :model="model"
          layout="vertical"
          size="large"
          :rules="{
            email: [
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '邮箱格式不正确' },
            ],
            password: { required: true, message: '请输入密码' },
          }"
          @submit="submit"
        >
          <VkFormItem field="email" label="邮箱">
            <VkInput
              v-model="model.email"
              size="large"
              placeholder="name@vakao.cn"
              autocomplete="email"
            />
          </VkFormItem>
          <VkFormItem field="password" label="密码">
            <VkInput
              v-model="model.password"
              size="large"
              type="password"
              placeholder="至少 8 位字符"
              autocomplete="current-password"
            />
          </VkFormItem>

          <div class="auth__row">
            <VkCheckbox v-model="model.remember" label="保持登录" />
            <a class="auth__link" href="#reset">忘记密码？</a>
          </div>

          <VkButton
            type="primary"
            html-type="submit"
            size="large"
            block
            :loading="status === 'busy'"
          >
            登录
          </VkButton>
        </VkForm>

        <div class="auth__divider"><span>或</span></div>

        <VkButton size="large" block>使用企业 SSO 登录</VkButton>

        <p class="auth__legal">
          继续即表示同意 <a href="#terms">服务条款</a> 与 <a href="#privacy">隐私政策</a>。
        </p>

        <VkAlert
          v-if="status === 'ok' || status === 'error'"
          class="auth__feedback"
          :type="status === 'ok' ? 'success' : 'error'"
          :title="status === 'ok' ? '校验通过' : '请检查表单'"
          :description="
            status === 'ok' ? '示例不会真的发起请求。' : '错误字段已用图标、边框和文案标出。'
          "
        />
      </div>
    </main>
  </div>
</template>

<style scoped>
.auth {
  display: grid;
  grid-template-columns: minmax(280px, 0.86fr) minmax(0, 1.14fr);
  min-height: 620px;
}

.auth__brand {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 44px 40px;
  background:
    radial-gradient(120% 90% at 12% 0%, rgba(255, 255, 255, 0.22), transparent 58%),
    linear-gradient(155deg, #c43a21 0%, #a5301b 48%, #7d2414 100%);
  color: #fff6f1;
  overflow: hidden;
}

.auth__brand::after {
  content: '';
  position: absolute;
  right: -90px;
  bottom: -120px;
  width: 320px;
  height: 320px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 50%;
  box-shadow:
    0 0 0 40px rgba(255, 255, 255, 0.05),
    0 0 0 90px rgba(255, 255, 255, 0.04);
}

.auth__brand-top {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--vk-font-family-display);
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.auth__mark-dot {
  width: 6px;
  height: 6px;
  margin-top: 6px;
  border-radius: 50%;
  background: #ffd9c9;
}

.auth__eyebrow {
  margin: 0 0 14px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  opacity: 0.72;
}

.auth__title {
  margin: 0;
  font-family: var(--vk-font-family-display);
  font-size: 36px;
  font-weight: 600;
  line-height: 1.16;
  letter-spacing: -0.03em;
}

.auth__lede {
  margin: 16px 0 0;
  font-size: 13.5px;
  line-height: 1.8;
  opacity: 0.82;
}

.auth__brand-foot {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.auth__dots {
  display: flex;
  gap: 6px;
}

.auth__dots span {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}

.auth__foot-text {
  font-size: 11px;
  letter-spacing: 0.04em;
  opacity: 0.66;
}

.auth__panel {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 56px 32px;
  background: var(--vk-color-body);
}

.auth__form {
  width: 100%;
  max-width: 356px;
}

.auth__kicker {
  margin: 0 0 10px;
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--vk-color-primary);
}

.auth__heading {
  margin: 0;
  font-family: var(--vk-font-family-display);
  font-size: 28px;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.025em;
  color: var(--vk-text-color-1);
}

.auth__sub {
  margin: 8px 0 28px;
  font-size: 13.5px;
  line-height: 1.7;
  color: var(--vk-text-color-2);
}

.auth__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 18px 0 22px;
}

.auth__link {
  font-size: 12.5px;
  color: var(--vk-color-primary);
  text-decoration: none;
}

.auth__link:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.auth__divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 22px 0;
  color: var(--vk-text-color-3);
  font-size: 11.5px;
}

.auth__divider::before,
.auth__divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--vk-border-color);
}

.auth__legal {
  margin: 22px 0 0;
  font-size: 11.5px;
  line-height: 1.7;
  color: var(--vk-text-color-3);
  text-align: center;
}

.auth__legal a {
  color: var(--vk-text-color-2);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.auth__feedback {
  margin-top: 20px;
}

@media (max-width: 820px) {
  .auth {
    grid-template-columns: minmax(0, 1fr);
  }

  .auth__brand {
    min-height: 240px;
    padding: 32px;
  }

  .auth__title {
    font-size: 28px;
  }

  .auth__brand-foot {
    display: none;
  }
}
</style>
