import brand from './brand.json'
import theme from './theme.json'

export type ThemeName = 'light' | 'dark'

export type ThemeCommonVars = {
  [K in keyof typeof theme.light]: string
}

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

export type ThemeOverrides = DeepPartial<ThemeCommonVars>

export const brandTokens = brand

export const lightTheme: ThemeCommonVars = theme.light

export const darkTheme: ThemeCommonVars = {
  ...theme.light,
  ...theme.dark,
} as ThemeCommonVars

export const themes: Record<ThemeName, ThemeCommonVars> = {
  light: lightTheme,
  dark: darkTheme,
}

export function mergeTheme(
  base: ThemeCommonVars,
  overrides?: ThemeOverrides | null,
): ThemeCommonVars {
  if (!overrides) return base
  return { ...base, ...overrides } as ThemeCommonVars
}

export function kebabCase(value: string): string {
  return value.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`)
}

export function themeToCssVars(
  themeVars: Partial<ThemeCommonVars>,
  prefix = 'vk',
): Record<string, string> {
  const result: Record<string, string> = {}
  for (const [key, value] of Object.entries(themeVars)) {
    if (typeof value === 'string') result[`--${prefix}-${kebabCase(key)}`] = value
  }
  return result
}

export { brand, theme }
