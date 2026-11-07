import { onBeforeUnmount, onMounted, type Ref } from 'vue'

export interface DismissOptions {
  /** 是否处于可关闭状态 */
  enabled: () => boolean
  /** 点击外部或按 Esc 时触发 */
  onDismiss: () => void
  /** 被视为内部的元素，点击这些区域不会关闭 */
  inside: Ref<HTMLElement | null>[]
}

/**
 * 点击外部 / Esc 关闭。监听器在组件卸载时自动移除。
 */
export function useDismiss(options: DismissOptions): void {
  function onPointerDown(event: Event): void {
    if (!options.enabled()) return
    const target = event.target as Node | null
    if (!target) return
    const isInside = options.inside.some((ref) => ref.value?.contains(target))
    if (isInside) return
    options.onDismiss()
  }

  function onKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Escape' || !options.enabled()) return
    event.stopPropagation()
    options.onDismiss()
  }

  onMounted(() => {
    document.addEventListener('pointerdown', onPointerDown, true)
    document.addEventListener('keydown', onKeydown, true)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('pointerdown', onPointerDown, true)
    document.removeEventListener('keydown', onKeydown, true)
  })
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * 把 Tab 焦点限制在容器内，用于模态对话框。
 */
export function trapFocus(event: KeyboardEvent, container: HTMLElement | null): void {
  if (event.key !== 'Tab' || !container) return
  const focusable = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (element) => element.offsetParent !== null || element === document.activeElement,
  )
  if (focusable.length === 0) {
    event.preventDefault()
    container.focus()
    return
  }
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  const active = document.activeElement
  if (event.shiftKey && (active === first || active === container)) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && active === last) {
    event.preventDefault()
    first.focus()
  }
}
