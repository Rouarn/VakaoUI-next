<script setup lang="ts">
import { reactive, ref } from 'vue'
import { VkButton } from '@/components/button'
import { VkForm, VkFormItem } from '@/components/form'
import { VkInput } from '@/components/input'

const formRef = ref<{ validate: () => Promise<boolean> } | null>(null)
const model = reactive({ username: '', password: '' })
const result = ref('')

async function submit(): Promise<void> {
  const valid = await formRef.value?.validate()
  result.value = valid ? '校验通过' : '校验未通过'
}
</script>

<template>
  <div>
    <VkForm ref="formRef" :model="model" layout="vertical" style="width: 320px" @submit.prevent>
      <VkFormItem field="username" label="用户名" required>
        <VkInput v-model="model.username" placeholder="至少 3 个字符" />
      </VkFormItem>
      <VkFormItem
        field="password"
        label="密码"
        :rules="[
          { required: true, message: '请输入密码' },
          { min: 6, message: '密码至少 6 位' },
        ]"
      >
        <VkInput v-model="model.password" type="password" placeholder="至少 6 位" />
      </VkFormItem>
      <VkFormItem :show-label="false">
        <VkButton type="primary" @click="submit">登录</VkButton>
      </VkFormItem>
    </VkForm>
    <p v-if="result">{{ result }}</p>
  </div>
</template>
