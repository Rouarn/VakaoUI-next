import {
  computed,
  onBeforeUnmount,
  ref,
  watch,
  type CSSProperties,
  type ComputedRef,
  type Ref,
} from 'vue'
import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
  size,
  type Middleware,
  type Placement,
} from '@floating-ui/dom'
import { useConfig } from './config'

/** 浮层允许的朝向，与组件 placement 属性一致 */
export type FloatingSide = 'top' | 'bottom' | 'left' | 'right'

export interface UseFloatingOptions {
  /** 触发元素，定位锚点 */
  trigger: Ref<HTMLElement | null>
  /** 浮层元素 */
  panel: Ref<HTMLElement | null>
  /** 浮层是否可见 */
  open: () => boolean
  /** 首选朝向，默认 bottom */
  placement?: () => FloatingSide
  /** 上下朝向时与触发元素的对齐方式，默认居中 */
  align?: 'start' | 'center'
  /** 与触发元素的间距 */
  gap?: number
  /** 浮层最小宽度跟随触发元素 */
  matchTriggerWidth?: boolean
  /** 浮层最小宽度下限，与触发元素宽度取较大值 */
  minWidth?: number
  /** 浮层自身的宽度上限，与视口可用宽度取较小值 */
  maxWidth?: number
  /** 浮层自身的高度上限，超出后在浮层内部滚动 */
  maxHeight?: number
}

export interface UseFloatingReturn {
  /** 绑定到浮层元素上的定位样式 */
  floatingStyle: ComputedRef<CSSProperties>
  /** 实际生效的朝向（翻转后） */
  actualPlacement: Ref<FloatingSide>
  /** 主动重新定位 */
  update: () => Promise<void>
}

const VIEWPORT_PADDING = 8

function limit(available: number, cap?: number): string | undefined {
  if (available <= 0 && cap === undefined) return undefined
  const value = cap === undefined ? available : Math.min(available, cap)
  return `${Math.max(0, Math.floor(value))}px`
}

const SIDE_ALIGN: Record<FloatingSide, Placement> = {
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
}

/**
 * 统一的浮层定位：浮层必须渲染在 body（或 ConfigProvider 指定的容器）下，
 * 这里只负责相对触发元素计算坐标，并处理边界翻转与位移收敛。
 */
export function useFloating(options: UseFloatingOptions): UseFloatingReturn {
  const config = useConfig()

  const x = ref(0)
  const y = ref(0)
  const placement = ref<FloatingSide>(options.placement?.() ?? 'bottom')
  const availableWidth = ref(0)
  const availableHeight = ref(0)
  const minWidth = ref(0)

  const floatingStyle = computed<CSSProperties>(() => {
    const floor = Math.max(options.minWidth ?? 0, options.matchTriggerWidth ? minWidth.value : 0)
    return {
      position: 'absolute',
      top: `${y.value}px`,
      left: `${x.value}px`,
      zIndex: String(config.zIndex.value + 100),
      minWidth: floor > 0 ? `${floor}px` : undefined,
      maxWidth: limit(availableWidth.value, options.maxWidth),
      maxHeight: limit(availableHeight.value, options.maxHeight),
    }
  })

  async function update(): Promise<void> {
    const triggerEl = options.trigger.value
    const panelEl = options.panel.value
    if (!triggerEl || !panelEl) return

    const middleware: Middleware[] = [
      offset(options.gap ?? 8),
      flip({ padding: VIEWPORT_PADDING, crossAxis: false, fallbackAxisSideDirection: 'end' }),
      shift({ padding: VIEWPORT_PADDING }),
      size({
        padding: VIEWPORT_PADDING,
        apply({ rects, availableWidth: width, availableHeight: height }) {
          availableWidth.value = Math.floor(width)
          availableHeight.value = Math.floor(height)
          minWidth.value = Math.ceil(rects.reference.width)
        },
      }),
    ]

    const side = options.placement?.() ?? 'bottom'
    const shouldStart = options.align === 'start' && (side === 'top' || side === 'bottom')
    const result = await computePosition(triggerEl, panelEl, {
      placement: shouldStart ? `${side}-start` : SIDE_ALIGN[side],
      strategy: 'absolute',
      middleware,
    })

    x.value = Math.round(result.x)
    y.value = Math.round(result.y)
    placement.value = result.placement.split('-')[0] as FloatingSide
  }

  let stopAutoUpdate: (() => void) | null = null

  function stop(): void {
    stopAutoUpdate?.()
    stopAutoUpdate = null
  }

  function start(): void {
    stop()
    const triggerEl = options.trigger.value
    const panelEl = options.panel.value
    if (!triggerEl || !panelEl || !options.open()) return
    void update()
    stopAutoUpdate = autoUpdate(triggerEl, panelEl, () => void update(), {
      ancestorScroll: true,
      ancestorResize: true,
      elementResize: typeof ResizeObserver !== 'undefined',
      layoutShift: typeof IntersectionObserver !== 'undefined',
    })
  }

  watch(
    () => [options.open(), options.panel.value, options.placement?.()] as const,
    () => start(),
    { flush: 'post' },
  )

  onBeforeUnmount(stop)

  return { floatingStyle, actualPlacement: placement, update }
}

/**
 * 浮层挂载容器：默认 body，可通过 ConfigProvider 的 getPopupContainer 覆盖。
 */
export function usePopupContainer(): ComputedRef<string | HTMLElement> {
  const config = useConfig()
  return computed(() => config.getPopupContainer?.() ?? 'body')
}
