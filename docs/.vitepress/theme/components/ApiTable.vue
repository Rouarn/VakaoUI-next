<script setup lang="ts">
import { computed } from 'vue'
import api from '../../data/api.json'

interface ApiItem {
  name: string
  type: string
  required?: boolean
  default?: string
  description?: string
}

interface ApiMeta {
  props?: ApiItem[]
  events?: ApiItem[]
  slots?: ApiItem[]
  exposed?: ApiItem[]
}

const props = defineProps<{
  /** 组件名，需与 .vue 文件名一致，例如 Button */
  name: string
}>()

const meta = computed<ApiMeta>(() => (api as Record<string, ApiMeta>)[props.name] ?? {})

const propsRows = computed(() => meta.value.props ?? [])
const eventRows = computed(() => meta.value.events ?? [])
const slotRows = computed(() => meta.value.slots ?? [])
const exposedRows = computed(() => meta.value.exposed ?? [])

const hasAny = computed(
  () =>
    propsRows.value.length ||
    eventRows.value.length ||
    slotRows.value.length ||
    exposedRows.value.length,
)

function clean(value: string | undefined): string {
  const text = (value ?? '').replace(/\s+/g, ' ').trim()
  if (!text || text === 'undefined' || text === 'null') return '—'
  return text
}
</script>

<template>
  <div v-if="hasAny" class="vk-api">
    <template v-if="propsRows.length">
      <h3 class="vk-api__section">
        Props<code>{{ propsRows.length }}</code>
      </h3>
      <table>
        <thead>
          <tr>
            <th>名称</th>
            <th>类型</th>
            <th>默认值</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in propsRows" :key="row.name">
            <td>
              <code>{{ row.name }}</code>
              <span v-if="row.required" class="vk-api__required">必填</span>
            </td>
            <td>
              <span class="vk-api__type">{{ clean(row.type) }}</span>
            </td>
            <td>
              <span class="vk-api__type">{{ clean(row.default) }}</span>
            </td>
            <td>{{ row.description || '—' }}</td>
          </tr>
        </tbody>
      </table>
    </template>

    <template v-if="eventRows.length">
      <h3 class="vk-api__section">
        Events<code>{{ eventRows.length }}</code>
      </h3>
      <table>
        <thead>
          <tr>
            <th>名称</th>
            <th>签名</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in eventRows" :key="row.name">
            <td>
              <code>{{ row.name }}</code>
            </td>
            <td>
              <span class="vk-api__type">{{ clean(row.type) }}</span>
            </td>
            <td>{{ row.description || '—' }}</td>
          </tr>
        </tbody>
      </table>
    </template>

    <template v-if="slotRows.length">
      <h3 class="vk-api__section">
        Slots<code>{{ slotRows.length }}</code>
      </h3>
      <table>
        <thead>
          <tr>
            <th>名称</th>
            <th>作用域</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in slotRows" :key="row.name">
            <td>
              <code>{{ row.name }}</code>
            </td>
            <td>
              <span class="vk-api__type">{{ clean(row.type) }}</span>
            </td>
            <td>{{ row.description || '—' }}</td>
          </tr>
        </tbody>
      </table>
    </template>

    <template v-if="exposedRows.length">
      <h3 class="vk-api__section">
        Exposed<code>{{ exposedRows.length }}</code>
      </h3>
      <table>
        <thead>
          <tr>
            <th>名称</th>
            <th>类型</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in exposedRows" :key="row.name">
            <td>
              <code>{{ row.name }}</code>
            </td>
            <td>
              <span class="vk-api__type">{{ clean(row.type) }}</span>
            </td>
            <td>{{ row.description || '—' }}</td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
  <p v-else class="vk-api__empty">
    未找到 <code>{{ name }}</code> 的 API 元数据，请运行 <code>pnpm api</code> 生成。
  </p>
</template>
