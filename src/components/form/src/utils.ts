import type { FormRule, FormValidateTrigger } from './types'

export function getValueByPath(
  source: Record<string, unknown> | undefined,
  path?: string,
): unknown {
  if (!source || !path) return undefined
  if (!path.includes('.')) return source[path]

  return path.split('.').reduce<unknown>((current, key) => {
    if (current && typeof current === 'object') {
      return (current as Record<string, unknown>)[key]
    }
    return undefined
  }, source)
}

export function setValueByPath(
  target: Record<string, unknown>,
  path: string,
  value: unknown,
): void {
  const keys = path.split('.')
  let current = target

  for (const key of keys.slice(0, -1)) {
    const next = current[key]
    if (!next || typeof next !== 'object') current[key] = {}
    current = current[key] as Record<string, unknown>
  }

  current[keys[keys.length - 1]] = value
}

export function normalizeRules(rules?: FormRule | FormRule[]): FormRule[] {
  if (!rules) return []
  return Array.isArray(rules) ? rules : [rules]
}

export function filterRulesByTrigger(rules: FormRule[], trigger?: FormValidateTrigger): FormRule[] {
  if (!trigger) return rules

  return rules.filter((rule) => {
    if (!rule.trigger) return true
    const triggers = Array.isArray(rule.trigger) ? rule.trigger : [rule.trigger]
    return triggers.includes(trigger)
  })
}

let formItemCounter = 0

export function nextFormItemId(): string {
  formItemCounter += 1
  return `vk-form-item-${formItemCounter}`
}

export function snapshotValue(value: unknown): unknown {
  if (value === null || typeof value !== 'object') return value
  try {
    return structuredClone(value)
  } catch {
    return value
  }
}
