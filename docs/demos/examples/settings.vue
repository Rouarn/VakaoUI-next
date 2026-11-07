<script setup lang="ts">
import { reactive, ref } from 'vue'
import { VkTabs } from '@/components/tabs'
import { VkSwitch } from '@/components/switch'
import { VkSelect } from '@/components/select'
import { VkButton } from '@/components/button'
import { VkInput } from '@/components/input'
import { VkAlert } from '@/components/alert'

const active = ref('profile')
const saved = ref(false)
const dirty = ref(false)

const model = reactive({
  name: '夏季',
  email: 'linyi@vakao.cn',
  language: 'zh-CN' as string | number | null,
  publicProfile: true,
  weeklyDigest: false,
  mentions: true,
  twoFactor: false,
})

const items = [
  { key: 'profile', label: '个人资料' },
  { key: 'notifications', label: '通知' },
  { key: 'security', label: '安全' },
]

const languages = [
  { label: '简体中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' },
]

const sections = [
  { key: 'profile', label: '个人资料' },
  { key: 'notifications', label: '通知' },
  { key: 'security', label: '安全与登录' },
]

function mark(): void {
  dirty.value = true
  saved.value = false
}

function save(): void {
  saved.value = true
  dirty.value = false
}
</script>

<template>
  <div class="settings">
    <header class="settings__top">
      <div class="settings__brand">
        <span class="settings__logo">VaKao</span>
        <span class="settings__crumb">设置</span>
      </div>
      <div class="settings__top-right">
        <span v-if="dirty" class="settings__unsaved">有未保存的改动</span>
        <VkButton size="small" type="primary" :disabled="!dirty" @click="save">保存更改</VkButton>
      </div>
    </header>

    <div class="settings__body">
      <aside class="settings__side">
        <p class="settings__side-title">账户</p>
        <a
          v-for="section in sections"
          :key="section.key"
          class="settings__side-item"
          :class="{ 'is-active': active === section.key }"
          href="#"
          @click.prevent="active = section.key"
        >
          {{ section.label }}
        </a>
        <p class="settings__side-title">工作区</p>
        <a class="settings__side-item" href="#" @click.prevent>成员与权限</a>
        <a class="settings__side-item" href="#" @click.prevent>计费</a>
      </aside>

      <main class="settings__main">
        <div class="settings__intro">
          <h1 class="settings__title">设置</h1>
          <p class="settings__desc">管理你的个人资料、通知偏好与登录安全。</p>
        </div>

        <VkTabs v-model="active" :items="items" aria-label="设置分类">
          <template #panel-profile>
            <section class="card">
              <div class="card__head">
                <h2 class="card__title">基本信息</h2>
                <p class="card__desc">这些信息会显示在项目成员列表里。</p>
              </div>

              <div class="avatar-row">
                <span class="avatar">林</span>
                <div class="avatar-row__meta">
                  <div class="avatar-row__name">夏季</div>
                  <div class="avatar-row__hint">支持 JPG / PNG，建议 400×400</div>
                </div>
                <VkButton size="small">更换头像</VkButton>
              </div>

              <div class="field-grid">
                <label class="field">
                  <span class="field__label">显示名称</span>
                  <VkInput v-model="model.name" size="medium" @update:model-value="mark" />
                </label>
                <label class="field">
                  <span class="field__label">邮箱</span>
                  <VkInput v-model="model.email" size="medium" @update:model-value="mark" />
                  <span class="field__hint">用于登录与接收通知</span>
                </label>
              </div>

              <div class="field-grid">
                <div class="field">
                  <span class="field__label">界面语言</span>
                  <VkSelect
                    v-model="model.language"
                    :options="languages"
                    aria-label="界面语言"
                    @update:model-value="mark"
                  />
                </div>
                <div class="field">
                  <span class="field__label">时区</span>
                  <div class="field__static">(GMT+08:00) Asia/Shanghai</div>
                </div>
              </div>
            </section>

            <section class="card">
              <div class="card__head">
                <h2 class="card__title">公开资料</h2>
                <p class="card__desc">控制其他成员能看到什么。</p>
              </div>
              <div class="row">
                <div>
                  <div class="row__title">公开个人主页</div>
                  <div class="row__hint">允许工作区成员查看你的项目列表</div>
                </div>
                <VkSwitch v-model="model.publicProfile" @update:model-value="mark" />
              </div>
            </section>
          </template>

          <template #panel-notifications>
            <section class="card">
              <div class="card__head">
                <h2 class="card__title">邮件通知</h2>
                <p class="card__desc">选择你希望收到的邮件类型。</p>
              </div>
              <div class="row">
                <div>
                  <div class="row__title">每周摘要</div>
                  <div class="row__hint">每周一发送项目进展汇总</div>
                </div>
                <VkSwitch v-model="model.weeklyDigest" @update:model-value="mark" />
              </div>
              <div class="row">
                <div>
                  <div class="row__title">被提及时通知</div>
                  <div class="row__hint">有人在评论中提到你时立即发送</div>
                </div>
                <VkSwitch v-model="model.mentions" @update:model-value="mark" />
              </div>
            </section>
            <VkAlert
              type="info"
              title="静默时段"
              description="22:00 至次日 08:00 的通知会合并到早晨发送。"
            />
          </template>

          <template #panel-security>
            <section class="card">
              <div class="card__head">
                <h2 class="card__title">登录安全</h2>
                <p class="card__desc">建议开启两步验证，降低账号风险。</p>
              </div>
              <div class="row">
                <div>
                  <div class="row__title">两步验证</div>
                  <div class="row__hint">登录时需要输入动态验证码</div>
                </div>
                <VkSwitch v-model="model.twoFactor" @update:model-value="mark" />
              </div>
              <div class="row">
                <div>
                  <div class="row__title">密码</div>
                  <div class="row__hint">上次修改于 2026-08-14</div>
                </div>
                <VkButton size="small">修改密码</VkButton>
              </div>
            </section>
            <VkAlert
              type="warning"
              title="敏感操作"
              description="关闭两步验证后，新设备登录将只校验密码。"
            />
          </template>
        </VkTabs>

        <Transition name="fade">
          <VkAlert
            v-if="saved"
            class="toast"
            type="success"
            title="已保存"
            description="设置已更新到本地示例状态。"
          />
        </Transition>
      </main>
    </div>
  </div>
</template>

<style scoped>
.settings {
  min-height: 660px;
  background: var(--vk-color-body);
  color: var(--vk-text-color-1);
}

.settings__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  height: 58px;
  padding: 0 28px;
  border-bottom: 1px solid var(--vk-border-color);
  background: var(--vk-color-body);
}

.settings__brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.settings__logo {
  font-family: var(--vk-font-family-display);
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.settings__crumb {
  padding-left: 10px;
  border-left: 1px solid var(--vk-border-color);
  font-size: 12px;
  color: var(--vk-text-color-3);
}

.settings__top-right {
  display: flex;
  align-items: center;
  gap: 14px;
}

.settings__unsaved {
  font-size: 11.5px;
  color: var(--vk-color-warning-text);
}

.settings__body {
  display: grid;
  grid-template-columns: 196px minmax(0, 1fr);
}

.settings__side {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 24px 16px;
  border-right: 1px solid var(--vk-border-color);
}

.settings__side-title {
  margin: 18px 0 6px;
  padding: 0 10px;
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--vk-text-color-3);
}

.settings__side-title:first-child {
  margin-top: 0;
}

.settings__side-item {
  padding: 7px 10px;
  border-radius: var(--vk-radius-small);
  color: var(--vk-text-color-2);
  font-size: 13px;
  text-decoration: none;
}

.settings__side-item:hover {
  background: var(--vk-fill-color);
}

.settings__side-item.is-active {
  background: var(--vk-color-primary-soft);
  color: var(--vk-color-primary-soft-text);
  font-weight: 600;
}

.settings__main {
  max-width: 900px;
  padding: 32px 32px 56px;
}

.settings__intro {
  margin-bottom: 22px;
}

.settings__title {
  margin: 0;
  font-family: var(--vk-font-family-display);
  font-size: 26px;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.settings__desc {
  margin: 6px 0 0;
  font-size: 12.5px;
  color: var(--vk-text-color-2);
}

.card {
  margin-bottom: 16px;
  padding: 22px 24px;
  border: 1px solid var(--vk-border-color);
  border-radius: var(--vk-radius-large);
  background: var(--vk-color-card);
}

.card__head {
  margin-bottom: 18px;
}

.card__title {
  margin: 0;
  font-size: 14.5px;
  font-weight: 600;
}

.card__desc {
  margin: 4px 0 0;
  font-size: 12px;
  color: var(--vk-text-color-3);
}

.avatar-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--vk-border-color);
}

.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--vk-color-primary-soft);
  color: var(--vk-color-primary-soft-text);
  font-size: 17px;
  font-weight: 600;
}

.avatar-row__meta {
  flex: 1;
}

.avatar-row__name {
  font-size: 13.5px;
  font-weight: 500;
}

.avatar-row__hint {
  margin-top: 2px;
  font-size: 11.5px;
  color: var(--vk-text-color-3);
}

.field-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-top: 18px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field__label {
  font-size: 12px;
  font-weight: 500;
  color: var(--vk-text-color-2);
}

.field__hint {
  font-size: 11px;
  color: var(--vk-text-color-3);
}

.field__static {
  display: flex;
  align-items: center;
  height: var(--vk-height-medium);
  padding: 0 12px;
  border: 1px solid var(--vk-border-color);
  border-radius: var(--vk-radius-medium);
  background: var(--vk-fill-color);
  color: var(--vk-text-color-3);
  font-size: 12.5px;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 14px 0;
  border-top: 1px solid var(--vk-border-color);
}

.row__title {
  font-size: 13px;
  font-weight: 500;
}

.row__hint {
  margin-top: 2px;
  font-size: 11.5px;
  color: var(--vk-text-color-3);
}

.toast {
  margin-top: 16px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--vk-motion-base) var(--vk-easing-standard);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 860px) {
  .settings__body {
    grid-template-columns: minmax(0, 1fr);
  }

  .settings__side {
    display: none;
  }

  .settings__main {
    padding: 24px 20px 40px;
  }

  .field-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
