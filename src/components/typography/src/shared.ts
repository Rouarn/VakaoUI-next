import { computed } from 'vue'
import { useNamespace } from '@/core'
import type { TypographyType } from './types'

export interface TypographyModifiers {
  strong?: boolean
  italic?: boolean
  underline?: boolean
  deleted?: boolean
  code?: boolean
  truncate?: boolean
}

/**
 * 统一生成排版类名，保证 Typography / Text 两个入口的修饰符行为一致。
 */
export function useTypography(
  props: { type?: TypographyType } & TypographyModifiers,
  block = 'typography',
) {
  const ns = useNamespace(block)
  const classes = computed(() => [
    ns.b,
    ns.m(props.type ?? 'default'),
    {
      [ns.m('strong')]: props.strong,
      [ns.m('italic')]: props.italic,
      [ns.m('underline')]: props.underline,
      [ns.m('deleted')]: props.deleted,
      [ns.m('code')]: props.code,
      [ns.m('truncate')]: props.truncate,
    },
  ])
  return { ns, classes }
}
