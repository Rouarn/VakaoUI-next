import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { VkCountdown } from '@/components/countdown'
import type { CountdownChunks } from '@/components/countdown'
import { VkQrCode, encodeQrCode } from '@/components/qr-code'
import { VkScrollbar } from '@/components/scrollbar'

afterEach(() => {
  document.body.innerHTML = ''
  vi.useRealTimers()
})

function setMetrics(
  element: Element,
  metrics: { clientHeight: number; scrollHeight: number; clientWidth: number; scrollWidth: number },
): void {
  for (const [key, value] of Object.entries(metrics)) {
    Object.defineProperty(element, key, { value, configurable: true, writable: true })
  }
}

describe('VkScrollbar', () => {
  it('measures content and shows the vertical thumb when always is set', async () => {
    const wrapper = mount(VkScrollbar, {
      props: { always: true },
      slots: { default: () => '滚动内容' },
      attachTo: document.body,
    })

    const container = wrapper.get('.vk-scrollbar__container')
    expect(container.attributes('tabindex')).toBe('0')

    const bar = wrapper.get('.vk-scrollbar__bar--vertical')
    expect(bar.attributes('style')).toContain('display: none')

    setMetrics(container.element, {
      clientHeight: 100,
      scrollHeight: 400,
      clientWidth: 100,
      scrollWidth: 100,
    })
    ;(wrapper.vm as unknown as { update: () => void }).update()
    await nextTick()

    expect(bar.attributes('style') ?? '').not.toContain('display: none')
    expect(wrapper.get('.vk-scrollbar__thumb').attributes('style')).toContain('translateY(0px)')
  })

  it('emits scroll state and updates thumb offset', async () => {
    const wrapper = mount(VkScrollbar, {
      slots: { default: () => '滚动内容' },
      attachTo: document.body,
    })

    const container = wrapper.get('.vk-scrollbar__container')
    setMetrics(container.element, {
      clientHeight: 100,
      scrollHeight: 400,
      clientWidth: 100,
      scrollWidth: 100,
    })
    ;(wrapper.vm as unknown as { update: () => void }).update()
    container.element.scrollTop = 120
    await container.trigger('scroll')

    expect(wrapper.emitted('scroll')?.[0]?.[0]).toMatchObject({
      scrollTop: 120,
      scrollHeight: 400,
      clientHeight: 100,
    })
    expect(wrapper.get('.vk-scrollbar__thumb').attributes('style')).not.toContain('translateY(0px)')
  })

  it('keeps the horizontal bar hidden unless x-scrollable is set', async () => {
    const wrapper = mount(VkScrollbar, {
      slots: { default: () => '滚动内容' },
      attachTo: document.body,
    })

    const container = wrapper.get('.vk-scrollbar__container')
    setMetrics(container.element, {
      clientHeight: 100,
      scrollHeight: 100,
      clientWidth: 100,
      scrollWidth: 400,
    })
    ;(wrapper.vm as unknown as { update: () => void }).update()
    await nextTick()

    expect(wrapper.get('.vk-scrollbar__bar--horizontal').attributes('style')).toContain(
      'display: none',
    )
  })

  it('falls back to the native scrollbar with the native prop', () => {
    const wrapper = mount(VkScrollbar, { props: { native: true } })
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['vk-scrollbar', 'vk-scrollbar--native']),
    )
  })
})

describe('VkCountdown', () => {
  it('counts down, formats the default text and emits finish once', async () => {
    vi.useFakeTimers()
    const wrapper = mount(VkCountdown, { props: { duration: 3000 } })

    expect(wrapper.text()).toBe('00:00:03')

    vi.advanceTimersByTime(1000)
    await nextTick()
    expect(wrapper.text()).toBe('00:00:02')

    vi.advanceTimersByTime(2000)
    await nextTick()
    expect(wrapper.text()).toBe('00:00:00')
    expect(wrapper.emitted('finish')).toHaveLength(1)

    vi.advanceTimersByTime(2000)
    await nextTick()
    expect(wrapper.emitted('finish')).toHaveLength(1)
  })

  it('pauses and resumes through the active prop', async () => {
    vi.useFakeTimers()
    const wrapper = mount(VkCountdown, { props: { duration: 5000 } })

    vi.advanceTimersByTime(2000)
    await nextTick()
    await wrapper.setProps({ active: false })
    vi.advanceTimersByTime(5000)
    await nextTick()
    expect(wrapper.text()).toBe('00:00:03')

    await wrapper.setProps({ active: true })
    vi.advanceTimersByTime(1000)
    await nextTick()
    expect(wrapper.text()).toBe('00:00:02')
  })

  it('restarts from the initial duration and emits restart', async () => {
    vi.useFakeTimers()
    const wrapper = mount(VkCountdown, { props: { duration: 5000 } })

    vi.advanceTimersByTime(3000)
    await nextTick()
    ;(wrapper.vm as unknown as { restart: () => void }).restart()
    await nextTick()

    expect(wrapper.text()).toBe('00:00:05')
    expect(wrapper.emitted('restart')).toHaveLength(1)
  })

  it('supports precision, format tokens and day output', async () => {
    vi.useFakeTimers()
    const precise = mount(VkCountdown, {
      props: { duration: 65_430, precision: 2 },
    })
    expect(precise.text()).toBe('00:01:05.43')

    const formatted = mount(VkCountdown, {
      props: { duration: 65_000, format: 'mm 分 ss 秒' },
    })
    expect(formatted.text()).toBe('01 分 05 秒')

    const days = mount(VkCountdown, { props: { duration: 90_000_000 } })
    expect(days.text()).toBe('1 天 01:00:00')
  })

  it('exposes chunks through the default slot', async () => {
    vi.useFakeTimers()
    const wrapper = mount(VkCountdown, {
      props: { duration: 65_000 },
      slots: {
        default: ({ days, hours, minutes, seconds }: CountdownChunks) =>
          `${days}-${hours}-${minutes}-${seconds}`,
      },
    })
    expect(wrapper.text()).toBe('0-0-1-5')
  })
})

const REFERENCE_V1_MASK0 = [
  '#######..#....#######',
  '#.....#.##.##.#.....#',
  '#.###.#..#..#.#.###.#',
  '#.###.#..###..#.###.#',
  '#.###.#.#.#.#.#.###.#',
  '#.....#.....#.#.....#',
  '#######.#.#.#.#######',
  '.........#.##........',
  '#.#.#.#..###....#..#.',
  '.##.##.#.#....#..#.##',
  '#.#.####.##.#...#####',
  '###.#....#....#....##',
  '.#..#.#..##.#.#.#..##',
  '........#..#.#.#.##.#',
  '#######..#.#.###.#.##',
  '#.....#...####.##....',
  '#.###.#.####.###...##',
  '#.###.#...#...##.#.#.',
  '#.###.#.#...#...###.#',
  '#.....#.......#.#..#.',
  '#######.#...#.##...##',
]

describe('QrCode', () => {
  it('matches the reference matrix for a version 1 code', () => {
    const result = encodeQrCode('vakao', 'M', 0)
    expect(result.version).toBe(1)
    expect(result.size).toBe(21)

    const rows = result.modules.map((row) => row.map((cell) => (cell ? '#' : '.')).join(''))
    expect(rows).toEqual(REFERENCE_V1_MASK0)
  })

  it('picks the smallest version automatically and writes finder patterns', () => {
    const small = encodeQrCode('https://ui.woyuxiaji.cn/', 'M')
    expect(small.version).toBe(2)
    expect(small.size).toBe(25)
    expect(small.mask).toBeGreaterThanOrEqual(0)
    expect(small.mask).toBeLessThanOrEqual(7)

    const corner = small.modules[0].slice(0, 7)
    expect(corner).toEqual([true, true, true, true, true, true, true])
    expect(small.modules[1].slice(0, 7)).toEqual([true, false, false, false, false, false, true])
  })

  it('renders an accessible svg with token-driven colors', () => {
    const wrapper = mount(VkQrCode, { props: { value: 'https://ui.woyuxiaji.cn/' } })

    expect(wrapper.attributes('role')).toBe('img')
    expect(wrapper.attributes('aria-label')).toBe('https://ui.woyuxiaji.cn/')
    expect(wrapper.attributes('style')).toContain('width: 160px')
    expect(wrapper.get('svg').attributes('viewBox')).toBe('0 0 29 29')
    expect(wrapper.get('path').attributes('d')).toBeTruthy()
  })

  it('warns and renders no svg when content exceeds capacity', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const wrapper = mount(VkQrCode, { props: { value: 'x'.repeat(300), level: 'H' } })

    expect(wrapper.find('svg').exists()).toBe(false)
    expect(warn).toHaveBeenCalled()
    warn.mockRestore()
  })
})
