import { computed, inject, isRef, type ComputedRef, type InjectionKey } from 'vue'
import { lightTheme, type ThemeCommonVars, type ThemeName } from '@/tokens'
import { zhCN, type VkLocale } from './locale'
import type { ComponentSize, MaybeRef } from './types'

export interface ConfigProviderContext {
  theme: ComputedRef<ThemeCommonVars>
  themeName: ComputedRef<ThemeName>
  size: ComputedRef<ComponentSize>
  zIndex: ComputedRef<number>
  locale: ComputedRef<VkLocale>
  getPopupContainer?: () => HTMLElement | null
}

export const configProviderInjectionKey: InjectionKey<ConfigProviderContext> =
  Symbol('vakao-config-provider')

const fallbackConfig: ConfigProviderContext = {
  theme: computed(() => lightTheme),
  themeName: computed(() => 'light'),
  size: computed(() => 'medium'),
  zIndex: computed(() => 2000),
  locale: computed(() => zhCN),
}

export function useConfig(): ConfigProviderContext {
  return inject(configProviderInjectionKey, fallbackConfig)
}

export function useComponentSize(
  size?: MaybeRef<ComponentSize | undefined>,
): ComputedRef<ComponentSize> {
  const config = useConfig()
  return computed(() => {
    const localSize = isRef(size) ? size.value : size
    return localSize ?? config.size.value
  })
}

export function useLocale(): ComputedRef<VkLocale> {
  return useConfig().locale
}
