<script setup lang="ts">
import { reactive } from 'vue'
import { VkButton } from '@/components/button'
import { VkForm, VkFormItem } from '@/components/form'
import { VkInput } from '@/components/input'

const model = reactive({ name: '', email: '' })
</script>

<template>
  <VkForm
    :model="model"
    :rules="{
      name: { required: true, message: '请输入名称' },
      email: { type: 'email', message: '邮箱格式不正确' },
    }"
    style="width: 340px"
    @submit.prevent
  >
    <VkFormItem field="name" label="名称">
      <VkInput v-model="model.name" placeholder="请输入名称" />
    </VkFormItem>
    <VkFormItem field="email" label="邮箱">
      <VkInput v-model="model.email" placeholder="name@example.com" />
    </VkFormItem>
    <VkFormItem :show-label="false">
      <VkButton type="primary" html-type="submit">提交</VkButton>
    </VkFormItem>
  </VkForm>
</template>
