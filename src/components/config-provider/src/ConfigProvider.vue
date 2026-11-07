<script setup lang="ts">
import { computed, inject, provide } from 'vue'
import {
  configProviderInjectionKey,
  resolveTheme,
  useResolvedTheme,
  type ConfigProviderContext,
} from '@/core'
import { locales, zhCN, type VkLocale } from '@/core/locale'
import { themeToCssVars } from '@/tokens'
import type { ConfigProviderProps } from './types'

defineOptions({
  name: 'VkConfigProvider',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ConfigProviderProps>(), {
  theme: undefined,
  themeOverrides: undefined,
  size: undefined,
  zIndex: undefined,
  locale: undefined,
  getPopupContainer: undefined,
  tag: 'div',
})

const parent = inject(configProviderInjectionKey, null)

const themeName = useResolvedTheme(
  computed(() => props.theme ?? parent?.themeName.value ?? 'light'),
)
const theme = computed(() => resolveTheme(themeName.value, props.themeOverrides))
const cssVars = computed(() => themeToCssVars(theme.value))
const size = computed(() => props.size ?? parent?.size.value ?? 'medium')
const zIndex = computed(() => props.zIndex ?? parent?.zIndex.value ?? 2000)
const locale = computed<VkLocale>(() => {
  const local = props.locale
  if (!local) return parent?.locale.value ?? zhCN
  if (typeof local === 'string') return locales[local] ?? zhCN
  return { ...(parent?.locale.value ?? zhCN), ...local }
})

function resolvePopupContainer(): HTMLElement | null {
  return props.getPopupContainer?.() ?? parent?.getPopupContainer?.() ?? null
}

provide(configProviderInjectionKey, {
  theme,
  themeName,
  size,
  zIndex,
  locale,
  getPopupContainer: resolvePopupContainer,
} satisfies ConfigProviderContext)
</script>

<template>
  <component
    :is="tag"
    class="vk-config-provider"
    :style="cssVars"
    :data-vk-theme="themeName"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>
