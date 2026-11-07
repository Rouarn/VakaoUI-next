import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  unref,
  type ComputedRef,
  type MaybeRef,
  type Ref,
} from 'vue'
import {
  darkTheme,
  lightTheme,
  mergeTheme,
  themeToCssVars,
  type ThemeCommonVars,
  type ThemeName,
  type ThemeOverrides,
} from '@/tokens'

export type ThemeMode = ThemeName | 'auto'

export function resolveTheme(
  themeName: ThemeName,
  overrides?: ThemeOverrides | null,
): ThemeCommonVars {
  return mergeTheme(themeName === 'dark' ? darkTheme : lightTheme, overrides)
}

const MEDIA_QUERY = '(prefers-color-scheme: dark)'

export function usePreferredDark(): { isDark: Ref<boolean> } {
  const isDark = ref(false)
  let media: MediaQueryList | null = null

  const update = (event: MediaQueryList | MediaQueryListEvent) => {
    isDark.value = event.matches
  }

  onMounted(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    media = window.matchMedia(MEDIA_QUERY)
    update(media)
    media.addEventListener('change', update)
  })

  onBeforeUnmount(() => {
    media?.removeEventListener('change', update)
    media = null
  })

  return { isDark }
}

export function useResolvedTheme(mode: MaybeRef<ThemeMode>): ComputedRef<ThemeName> {
  const { isDark } = usePreferredDark()
  return computed(() => {
    const value = unref(mode)
    if (value === 'auto') return isDark.value ? 'dark' : 'light'
    return value
  })
}

export function useThemeCssVars(
  themeName: MaybeRef<ThemeName>,
  overrides: MaybeRef<ThemeOverrides | undefined>,
): ComputedRef<Record<string, string>> {
  return computed(() => themeToCssVars(resolveTheme(unref(themeName), unref(overrides))))
}
