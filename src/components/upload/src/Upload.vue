<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useLocale, useNamespace } from '@/core'
import type {
  UploadEmits,
  UploadFile,
  UploadProps,
  UploadRequestOptions,
  UploadSlots,
} from './types'

defineOptions({ name: 'VkUpload' })

const props = withDefaults(defineProps<UploadProps>(), {
  fileList: undefined,
  defaultFileList: () => [],
  multiple: false,
  accept: undefined,
  maxSize: undefined,
  minSize: undefined,
  maxCount: undefined,
  disabled: false,
  drag: false,
  autoUpload: true,
  showFileList: true,
  beforeUpload: undefined,
  customRequest: undefined,
  ariaLabel: undefined,
})

const emit = defineEmits<UploadEmits>()
defineSlots<UploadSlots>()

const ns = useNamespace('upload')
const locale = useLocale()

let uploadSeed = 0

const inputRef = ref<HTMLInputElement | null>(null)
const internalFiles = ref<UploadFile[]>((props.fileList ?? props.defaultFileList).slice())
const dragging = ref(false)

const files = computed(() => props.fileList ?? internalFiles.value)

const classes = computed(() => [
  ns.b,
  {
    [ns.m('disabled')]: props.disabled,
    [ns.m('drag')]: props.drag,
    [ns.m('dragover')]: dragging.value,
  },
])

const triggerClasses = computed(() => [
  ns.e('trigger'),
  {
    [ns.em('trigger', 'drag')]: props.drag,
    [ns.em('trigger', 'dragover')]: dragging.value,
  },
])

watch(
  () => props.fileList,
  (value) => {
    if (value !== undefined) internalFiles.value = value.slice()
  },
  { deep: true },
)

function createFile(raw: File): UploadFile {
  uploadSeed += 1
  return {
    uid: `vk-upload-${uploadSeed}`,
    name: raw.name,
    size: raw.size,
    type: raw.type,
    status: 'ready',
    percent: 0,
    raw,
  }
}

function matchesAccept(file: File): boolean {
  const accept = props.accept?.trim()
  if (!accept) return true
  const tokens = accept
    .split(',')
    .map((token) => token.trim().toLowerCase())
    .filter(Boolean)
  if (tokens.length === 0) return true

  const name = file.name.toLowerCase()
  const type = (file.type || '').toLowerCase()

  return tokens.some((token) => {
    if (token === '*' || token === '*/*') return true
    if (token.startsWith('.')) return name.endsWith(token)
    if (token.endsWith('/*')) return type.startsWith(token.slice(0, -1))
    return type === token
  })
}

function matchesSize(file: File): boolean {
  if (props.maxSize !== undefined && file.size > props.maxSize) return false
  if (props.minSize !== undefined && file.size < props.minSize) return false
  return true
}

function setFiles(next: UploadFile[]): void {
  internalFiles.value = next
  emit('update:fileList', next)
}

function patchFile(uid: string, patch: Partial<UploadFile>): UploadFile | null {
  const index = internalFiles.value.findIndex((file) => file.uid === uid)
  if (index === -1) return null
  const next = internalFiles.value.slice()
  const updated: UploadFile = { ...internalFiles.value[index], ...patch }
  next[index] = updated
  setFiles(next)
  return updated
}

function openPicker(): void {
  if (props.disabled) return
  inputRef.value?.click()
}

function onTriggerKeydown(event: KeyboardEvent): void {
  if (props.disabled) return
  if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
    event.preventDefault()
    openPicker()
  }
}

function onDragOver(event: DragEvent): void {
  if (!props.drag || props.disabled) return
  event.preventDefault()
  dragging.value = true
}

function onDragLeave(event: DragEvent): void {
  if (!props.drag || props.disabled) return
  const current = event.currentTarget as Node | null
  const related = event.relatedTarget as Node | null
  if (current && related && current.contains(related)) return
  dragging.value = false
}

function onDrop(event: DragEvent): void {
  event.preventDefault()
  if (!props.drag || props.disabled) return
  dragging.value = false
  const dropped = event.dataTransfer?.files
  if (dropped) addFiles(Array.from(dropped))
}

function onInputChange(event: Event): void {
  const input = event.target as HTMLInputElement
  if (input.files) addFiles(Array.from(input.files))
  input.value = ''
}

function addFiles(rawFiles: File[]): void {
  if (props.disabled || rawFiles.length === 0) return
  const candidates = props.multiple ? rawFiles : rawFiles.slice(0, 1)
  const accepted: UploadFile[] = []
  const excess: UploadFile[] = []
  const total = internalFiles.value.length

  for (const raw of candidates) {
    const file = createFile(raw)
    if (!matchesAccept(raw)) {
      emit('reject', file, 'type')
      continue
    }
    if (!matchesSize(raw)) {
      emit('reject', file, 'size')
      continue
    }
    if (props.maxCount !== undefined && total + accepted.length >= props.maxCount) {
      emit('reject', file, 'count')
      excess.push(file)
      continue
    }
    accepted.push(file)
  }

  if (excess.length > 0) emit('exceed', excess, internalFiles.value.slice())
  if (accepted.length === 0) return
  void confirmFiles(accepted)
}

async function confirmFiles(candidates: UploadFile[]): Promise<void> {
  const passed: UploadFile[] = []

  for (const file of candidates) {
    if (props.beforeUpload && file.raw) {
      let allowed: boolean
      try {
        allowed = await props.beforeUpload(file.raw, internalFiles.value.slice())
      } catch {
        allowed = false
      }
      if (!allowed) continue
    }
    passed.push(file)
  }

  for (const file of passed) {
    setFiles([...internalFiles.value, file])
    emit('change', file, internalFiles.value.slice())
    if (props.autoUpload && props.customRequest) startUpload(file)
  }
}

function startUpload(file: UploadFile): void {
  const request = props.customRequest
  const raw = file.raw
  if (!request || !raw || props.disabled || file.status === 'uploading') return

  const started = patchFile(file.uid, { status: 'uploading', percent: 0, error: undefined })
  if (!started) return
  emit('change', started, internalFiles.value.slice())

  let settled = false

  const options: UploadRequestOptions = {
    file: started,
    raw,
    onProgress(percent) {
      if (settled) return
      const value = Math.min(100, Math.max(0, Math.round(percent)))
      const updated = patchFile(file.uid, { percent: value })
      if (updated) emit('progress', updated)
    },
    onSuccess(response) {
      if (settled) return
      settled = true
      const updated = patchFile(file.uid, { status: 'success', percent: 100, response })
      if (!updated) return
      emit('success', updated, response)
      emit('change', updated, internalFiles.value.slice())
    },
    onError(error) {
      if (settled) return
      settled = true
      const updated = patchFile(file.uid, { status: 'error', error })
      if (!updated) return
      emit('error', updated, error)
      emit('change', updated, internalFiles.value.slice())
    },
  }

  try {
    const result = request(options)
    if (result && typeof (result as Promise<void>).then === 'function') {
      void (result as Promise<void>).then(
        () => options.onSuccess(),
        (error: unknown) => options.onError(error),
      )
    }
  } catch (error) {
    options.onError(error)
  }
}

function submit(): void {
  const ready = internalFiles.value.filter((file) => file.status === 'ready')
  for (const file of ready) startUpload(file)
}

function retry(file?: UploadFile): void {
  if (!props.customRequest) return
  const targets = file ? [file] : internalFiles.value.filter((item) => item.status === 'error')
  for (const target of targets) {
    const current = internalFiles.value.find((item) => item.uid === target.uid)
    if (current) startUpload(current)
  }
}

function removeFile(file: UploadFile): void {
  if (props.disabled) return
  const next = internalFiles.value.filter((item) => item.uid !== file.uid)
  setFiles(next)
  emit('remove', file, next)
  emit('change', file, next)
}

function clear(): void {
  setFiles([])
  dragging.value = false
  if (inputRef.value) inputRef.value.value = ''
}

function formatSize(size: number): string {
  if (size < 1024) return `${size} B`
  if (size < 1024 * 1024) return `${trimNumber(size / 1024)} KB`
  return `${trimNumber(size / (1024 * 1024))} MB`
}

function trimNumber(value: number): string {
  return Number(value.toFixed(1)).toString()
}

function statusText(file: UploadFile): string {
  if (file.status === 'uploading') return locale.value.uploadUploading
  if (file.status === 'success') return locale.value.uploadSuccess
  if (file.status === 'error') return locale.value.uploadFailed
  return ''
}

defineExpose({ submit, retry, clear, input: inputRef })
</script>

<template>
  <div :class="classes">
    <input
      ref="inputRef"
      :class="ns.e('input')"
      type="file"
      :multiple="multiple"
      :accept="accept"
      :disabled="disabled"
      tabindex="-1"
      aria-hidden="true"
      @change="onInputChange"
    />

    <div
      :class="triggerClasses"
      role="button"
      :tabindex="disabled ? -1 : 0"
      :aria-label="ariaLabel ?? locale.uploadDrop"
      :aria-disabled="disabled || undefined"
      @click="openPicker"
      @keydown="onTriggerKeydown"
      @dragover="onDragOver"
      @dragenter="onDragOver"
      @dragleave="onDragLeave"
      @drop="onDrop"
    >
      <slot>
        <span :class="ns.e('icon')" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
            <path
              d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4 15v3.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V15"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
            />
          </svg>
        </span>
        <span :class="ns.e('text')">{{ locale.uploadDrop }}</span>
        <span :class="ns.e('hint')">{{ locale.uploadHint }}</span>
      </slot>
    </div>

    <div v-if="$slots.tip" :class="ns.e('tip')">
      <slot name="tip" />
    </div>

    <ul v-if="showFileList && files.length > 0" :class="ns.e('list')" role="list">
      <li v-for="file in files" :key="file.uid" :class="[ns.e('item'), ns.em('item', file.status)]">
        <div :class="ns.e('info')">
          <span :class="ns.e('name')" :title="file.name">{{ file.name }}</span>
          <span :class="ns.e('meta')">
            <span :class="ns.e('size')">{{ formatSize(file.size) }}</span>
            <span v-if="statusText(file)" :class="[ns.e('status'), ns.em('status', file.status)]">
              {{ statusText(file) }}
            </span>
          </span>
        </div>

        <div
          v-if="file.status === 'uploading' || file.status === 'success'"
          :class="ns.e('progress')"
        >
          <div
            :class="ns.e('progress-bar')"
            role="progressbar"
            :aria-valuenow="file.percent"
            aria-valuemin="0"
            aria-valuemax="100"
            :aria-label="file.name"
          >
            <div :class="ns.e('progress-fill')" :style="{ width: `${file.percent}%` }" />
          </div>
          <span :class="ns.e('percent')">{{ file.percent }}%</span>
        </div>

        <div :class="ns.e('actions')">
          <button
            v-if="file.status === 'error'"
            type="button"
            :class="ns.e('action')"
            :disabled="disabled"
            :aria-label="locale.uploadRetry"
            @click="retry(file)"
          >
            {{ locale.uploadRetry }}
          </button>
          <button
            type="button"
            :class="[ns.e('action'), ns.em('action', 'remove')]"
            :disabled="disabled"
            :aria-label="`${locale.uploadRemove} ${file.name}`"
            @click="removeFile(file)"
          >
            <svg viewBox="0 0 16 16" width="12" height="12" fill="none" aria-hidden="true">
              <path
                d="M4 4l8 8M12 4l-8 8"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
