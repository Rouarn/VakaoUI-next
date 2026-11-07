export const DEFAULT_NAMESPACE = 'vk'

export interface NamespaceHelpers {
  b: string
  e: (element: string) => string
  m: (modifier: string) => string
  be: (element: string, modifier: string) => string
  bm: (modifier: string) => string
  bem: (element: string, modifier: string) => string
  em: (element: string, modifier: string) => string
}

export function useNamespace(block: string): NamespaceHelpers {
  const b = `${DEFAULT_NAMESPACE}-${block}`
  const e = (element: string) => `${b}__${element}`
  const m = (modifier: string) => `${b}--${modifier}`
  const be = (element: string, modifier: string) => `${b}__${element}--${modifier}`
  const em = (element: string, modifier: string) => be(element, modifier)

  return { b, e, m, be, bm: m, bem: be, em }
}
