<script setup lang="ts">
import { computed, ref } from 'vue'
import { VkCascader } from '@/components/cascader'
import type { CascaderKey, CascaderOption } from '@/components/cascader'

const options: CascaderOption[] = [
  {
    value: 'zhejiang',
    label: '浙江省',
    children: [
      {
        value: 'hangzhou',
        label: '杭州市',
        children: [
          { value: 'xihu', label: '西湖区' },
          { value: 'yuhang', label: '余杭区' },
          { value: 'binjiang', label: '滨江区' },
        ],
      },
      {
        value: 'ningbo',
        label: '宁波市',
        children: [
          { value: 'haishu', label: '海曙区' },
          { value: 'yinzhou', label: '鄞州区' },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏省',
    children: [
      {
        value: 'nanjing',
        label: '南京市',
        children: [
          { value: 'xuanwu', label: '玄武区' },
          { value: 'gulou', label: '鼓楼区' },
        ],
      },
      {
        value: 'suzhou',
        label: '苏州市',
        children: [
          { value: 'gusu', label: '姑苏区' },
          { value: 'wuzhong', label: '吴中区' },
        ],
      },
    ],
  },
  {
    value: 'guangdong',
    label: '广东省',
    children: [
      {
        value: 'shenzhen',
        label: '深圳市',
        children: [
          { value: 'nanshan', label: '南山区' },
          { value: 'futian', label: '福田区' },
        ],
      },
      { value: 'zhuhai', label: '珠海市', disabled: true },
    ],
  },
]

const value = ref<CascaderKey[] | null>(['zhejiang', 'hangzhou', 'xihu'])
const changeOnSelect = ref(false)

const modeLabel = computed(() => (changeOnSelect.value ? '任意层级可选' : '仅叶子可选'))
const pathLabel = computed(() => (value.value ? value.value.join(' / ') : '未选择'))
</script>

<template>
  <div class="demo-stack">
    <label class="switch">
      <input v-model="changeOnSelect" type="checkbox" />
      {{ modeLabel }}
    </label>

    <div class="field">
      <VkCascader
        v-model="value"
        :options="options"
        :change-on-select="changeOnSelect"
        clearable
        aria-label="所在地区"
      />
    </div>

    <p class="result">当前路径：{{ pathLabel }}</p>
  </div>
</template>

<style scoped>
.demo-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 420px;
}

.switch {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--vk-text-color-2);
  font-size: 13px;
  cursor: pointer;
}

.switch input {
  accent-color: var(--vk-color-primary);
}

.field {
  width: 100%;
}

.result {
  margin: 0;
  color: var(--vk-text-color-2);
  font-size: 13px;
}
</style>
