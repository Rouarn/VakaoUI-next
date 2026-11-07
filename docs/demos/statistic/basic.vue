<script setup lang="ts">
import { VkStatistic } from '@/components/statistic'
</script>

<template>
  <div class="grid">
    <VkStatistic label="本月营收" :value="1284630.5" prefix="¥" :precision="2" />
    <VkStatistic label="活跃用户" :value="48291" />
    <VkStatistic label="转化率" :value="18.6" suffix="%" :precision="1" />
    <VkStatistic label="同比增长" :value="-7.25" suffix="%" :precision="2" />
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px 24px;
  max-width: 480px;
}
</style>
