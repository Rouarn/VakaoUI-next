<script setup lang="ts">
import { computed, ref } from 'vue'
import { VkButton } from '@/components/button'
import { VkCountdown } from '@/components/countdown'

const countdown = ref<InstanceType<typeof VkCountdown>>()
const active = ref(true)
const finished = ref(false)

const status = computed(() => {
  if (finished.value) return '已结束'
  return active.value ? '计时中' : '已暂停'
})

function restart(): void {
  finished.value = false
  countdown.value?.restart()
}
</script>

<template>
  <div class="demo">
    <VkCountdown
      ref="countdown"
      class="clock"
      :duration="45_000"
      :active="active"
      :precision="1"
      aria-label="剩余时间"
      @finish="finished = true"
    />
    <div class="actions">
      <VkButton size="small" :disabled="finished" @click="active = !active">
        {{ active ? '暂停' : '继续' }}
      </VkButton>
      <VkButton size="small" type="primary" @click="restart">重新开始</VkButton>
      <span class="status">{{ status }}</span>
    </div>
  </div>
</template>

<style scoped>
.demo {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}

.clock {
  color: var(--vk-color-primary);
  font-family: var(--vk-font-family-mono);
  font-size: 28px;
  font-weight: var(--vk-font-weight-strong);
  letter-spacing: 0.04em;
}

.actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status {
  color: var(--vk-text-color-3);
  font-size: 12px;
}
</style>
