let lockCount = 0
let previousOverflow = ''
let previousPaddingRight = ''

/**
 * 锁定页面滚动。多个弹层同时存在时按引用计数恢复，
 * 并补偿滚动条宽度，避免打开弹层时页面横向抖动。
 */
export function lockScroll(): void {
  if (typeof document === 'undefined') return
  if (lockCount === 0) {
    const gap = window.innerWidth - document.documentElement.clientWidth
    previousOverflow = document.body.style.overflow
    previousPaddingRight = document.body.style.paddingRight
    document.body.style.overflow = 'hidden'
    if (gap > 0 && gap < 40) {
      const current = Number.parseFloat(getComputedStyle(document.body).paddingRight) || 0
      document.body.style.paddingRight = `${current + gap}px`
    }
  }
  lockCount += 1
}

/** 解除一次滚动锁 */
export function unlockScroll(): void {
  if (typeof document === 'undefined' || lockCount === 0) return
  lockCount -= 1
  if (lockCount === 0) {
    document.body.style.overflow = previousOverflow
    document.body.style.paddingRight = previousPaddingRight
  }
}
