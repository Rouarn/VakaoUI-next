<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useNamespace } from '@/core'
import type {
  CountdownChunks,
  CountdownEmits,
  CountdownExpose,
  CountdownProps,
  CountdownSlots,
} from './types'

defineOptions({ name: 'VkCountdown' })

const props = withDefaults(defineProps<CountdownProps>(), {
  duration: 0,
  active: true,
  precision: 0,
  format: undefined,
  renderer: undefined,
  ariaLabel: undefined,
})

const emit = defineEmits<CountdownEmits>()

defineSlots<CountdownSlots>()

const ns = useNamespace('countdown')

const remain = ref(Math.max(0, props.duration))
let timer: number | undefined
let endAt = 0
let finished = false

const chunks = computed<CountdownChunks>(() => {
  const total = remain.value
  return {
    days: Math.floor(total / 86_400_000),
    hours: Math.floor((total % 86_400_000) / 3_600_000),
    minutes: Math.floor((total % 3_600_000) / 60_000),
    seconds: Math.floor((total % 60_000) / 1000),
    milliseconds: Math.floor(total % 1000),
    total,
  }
})

function pad(value: number): string {
  return String(value).padStart(2, '0')
}

const fraction = computed(() => {
  if (props.precision <= 0) return ''
  return String(chunks.value.milliseconds).padStart(3, '0').slice(0, props.precision)
})

const formatted = computed(() => {
  const { days, hours, minutes, seconds } = chunks.value
  const format = props.format ?? (props.precision > 0 ? 'HH:mm:ss.SSS' : undefined)

  if (format) {
    return format
      .replace(/DD/g, pad(days))
      .replace(/HH/g, pad(hours))
      .replace(/mm/g, pad(minutes))
      .replace(/ss/g, pad(seconds))
      .replace(/SSS/g, fraction.value)
  }

  const time = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}${fraction.value ? `.${fraction.value}` : ''}`
  return days > 0 ? `${days} 天 ${time}` : time
})

const classes = computed(() => ns.b)

const Renderer = () => (props.renderer ? props.renderer(chunks.value) : null)

function stopTimer(): void {
  if (timer !== undefined) {
    window.clearInterval(timer)
    timer = undefined
  }
}

function tick(): void {
  remain.value = Math.max(0, endAt - Date.now())
  if (remain.value === 0) {
    stopTimer()
    if (!finished) {
      finished = true
      emit('finish')
    }
  }
}

function start(): void {
  if (remain.value <= 0) return
  stopTimer()
  finished = false
  endAt = Date.now() + remain.value
  timer = window.setInterval(tick, props.precision > 0 ? 16 : 100)
  tick()
}

function pause(): void {
  if (timer === undefined) return
  remain.value = Math.max(0, endAt - Date.now())
  stopTimer()
}

function reset(emitRestart: boolean): void {
  stopTimer()
  remain.value = Math.max(0, props.duration)
  finished = false
  if (props.active) start()
  if (emitRestart) emit('restart')
}

function restart(): void {
  reset(true)
}

watch(
  () => props.active,
  (value) => {
    if (value) start()
    else pause()
  },
)

watch(
  () => props.duration,
  () => reset(false),
)

onMounted(() => {
  if (props.active) start()
})

onBeforeUnmount(stopTimer)

defineExpose<CountdownExpose>({ restart })
</script>

<template>
  <span :class="classes" role="timer" :aria-label="ariaLabel">
    <slot
      v-if="$slots.default"
      :days="chunks.days"
      :hours="chunks.hours"
      :minutes="chunks.minutes"
      :seconds="chunks.seconds"
      :milliseconds="chunks.milliseconds"
      :total="chunks.total"
    />
    <Renderer v-else-if="renderer" />
    <template v-else>{{ formatted }}</template>
  </span>
</template>
