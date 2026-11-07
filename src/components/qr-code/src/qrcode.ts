export type QrCodeLevel = 'L' | 'M' | 'Q' | 'H'

export interface QrCodeMatrix {
  /** 二维码版本（1–10） */
  version: number
  /** 边长模块数 */
  size: number
  /** 最终使用的掩码编号 */
  mask: number
  /** 模块矩阵，true 表示深色 */
  modules: boolean[][]
}

type BlockSpec = [count: number, total: number, data: number]

const LEVEL_INDEX: Record<QrCodeLevel, number> = { L: 0, M: 1, Q: 2, H: 3 }

const LEVEL_BITS: Record<QrCodeLevel, number> = { L: 1, M: 0, Q: 3, H: 2 }

/** 版本 1–10 的纠错分块：[块数, 总码字数, 数据码字数] */
const RS_BLOCKS: BlockSpec[][][] = [
  [[[1, 26, 19]], [[1, 26, 16]], [[1, 26, 13]], [[1, 26, 9]]],
  [[[1, 44, 34]], [[1, 44, 28]], [[1, 44, 22]], [[1, 44, 16]]],
  [[[1, 70, 55]], [[1, 70, 44]], [[2, 35, 17]], [[2, 35, 13]]],
  [[[1, 100, 80]], [[2, 50, 32]], [[2, 50, 24]], [[4, 25, 9]]],
  [
    [[1, 134, 108]],
    [[2, 67, 43]],
    [
      [2, 33, 15],
      [2, 34, 16],
    ],
    [
      [2, 33, 11],
      [2, 34, 12],
    ],
  ],
  [[[2, 86, 68]], [[4, 43, 27]], [[4, 43, 19]], [[4, 43, 15]]],
  [
    [[2, 98, 78]],
    [[4, 49, 31]],
    [
      [2, 32, 14],
      [4, 33, 15],
    ],
    [
      [4, 39, 13],
      [1, 40, 14],
    ],
  ],
  [
    [[2, 121, 97]],
    [
      [2, 60, 38],
      [2, 61, 39],
    ],
    [
      [4, 40, 18],
      [2, 41, 19],
    ],
    [
      [4, 40, 14],
      [2, 41, 15],
    ],
  ],
  [
    [[2, 146, 116]],
    [
      [3, 58, 36],
      [2, 59, 37],
    ],
    [
      [4, 36, 16],
      [4, 37, 17],
    ],
    [
      [4, 36, 12],
      [4, 37, 13],
    ],
  ],
  [
    [
      [2, 86, 68],
      [2, 87, 69],
    ],
    [
      [4, 69, 43],
      [1, 70, 44],
    ],
    [
      [6, 43, 19],
      [2, 44, 20],
    ],
    [
      [6, 43, 15],
      [2, 44, 16],
    ],
  ],
]

const ALIGNMENT_POSITIONS: number[][] = [
  [],
  [6, 18],
  [6, 22],
  [6, 26],
  [6, 30],
  [6, 34],
  [6, 22, 38],
  [6, 24, 42],
  [6, 26, 46],
  [6, 28, 50],
]

const REMAINDER_BITS = [0, 7, 7, 7, 7, 7, 0, 0, 0, 0]

const MAX_VERSION = 10

const EXP_TABLE = new Array<number>(512)
const LOG_TABLE = new Array<number>(256)

let value = 1
for (let i = 0; i < 255; i += 1) {
  EXP_TABLE[i] = value
  LOG_TABLE[value] = i
  value <<= 1
  if (value & 0x100) value ^= 0x11d
}
for (let i = 255; i < 512; i += 1) EXP_TABLE[i] = EXP_TABLE[i - 255]

function gfMultiply(a: number, b: number): number {
  if (a === 0 || b === 0) return 0
  return EXP_TABLE[LOG_TABLE[a] + LOG_TABLE[b]]
}

function generatorPolynomial(degree: number): number[] {
  let polynomial = [1]
  for (let i = 0; i < degree; i += 1) {
    const next = new Array<number>(polynomial.length + 1).fill(0)
    for (let j = 0; j < polynomial.length; j += 1) {
      next[j] ^= polynomial[j]
      next[j + 1] ^= gfMultiply(polynomial[j], EXP_TABLE[i])
    }
    polynomial = next
  }
  return polynomial
}

function reedSolomon(data: number[], ecCount: number): number[] {
  const generator = generatorPolynomial(ecCount)
  const buffer = [...data, ...new Array<number>(ecCount).fill(0)]

  for (let i = 0; i < data.length; i += 1) {
    const factor = buffer[i]
    if (factor === 0) continue
    for (let j = 0; j < generator.length; j += 1) {
      buffer[i + j] ^= gfMultiply(generator[j], factor)
    }
  }

  return buffer.slice(data.length)
}

function utf8Bytes(text: string): number[] {
  return Array.from(new TextEncoder().encode(text))
}

function dataCodewords(version: number, level: QrCodeLevel): number {
  return RS_BLOCKS[version - 1][LEVEL_INDEX[level]].reduce(
    (total, [count, , data]) => total + count * data,
    0,
  )
}

function countBits(version: number): number {
  return version < 10 ? 8 : 16
}

function pickVersion(byteLength: number, level: QrCodeLevel): number {
  for (let version = 1; version <= MAX_VERSION; version += 1) {
    const capacity = dataCodewords(version, level) * 8
    if (4 + countBits(version) + byteLength * 8 <= capacity) return version
  }
  throw new RangeError(`二维码内容过长：${byteLength} 字节超出 ${level} 级纠错的上限（版本 1–10）`)
}

function createDataBits(bytes: number[], version: number, level: QrCodeLevel): number[] {
  const capacity = dataCodewords(version, level)
  const bits: number[] = []

  const put = (input: number, length: number): void => {
    for (let i = length - 1; i >= 0; i -= 1) bits.push((input >>> i) & 1)
  }

  put(0b0100, 4)
  put(bytes.length, countBits(version))
  for (const byte of bytes) put(byte, 8)

  const remaining = capacity * 8 - bits.length
  put(0, Math.min(4, remaining))
  while (bits.length % 8 !== 0) bits.push(0)

  const codewords: number[] = []
  for (let i = 0; i < bits.length; i += 8) {
    let byte = 0
    for (let j = 0; j < 8; j += 1) byte = (byte << 1) | bits[i + j]
    codewords.push(byte)
  }

  const padding = [0xec, 0x11]
  let index = 0
  while (codewords.length < capacity) {
    codewords.push(padding[index % 2])
    index += 1
  }

  return codewords
}

function interleave(codewords: number[], version: number, level: QrCodeLevel): number[] {
  const blocks = RS_BLOCKS[version - 1][LEVEL_INDEX[level]]
  const dataBlocks: number[][] = []
  const ecBlocks: number[][] = []
  let offset = 0

  for (const [count, total, data] of blocks) {
    for (let i = 0; i < count; i += 1) {
      const chunk = codewords.slice(offset, offset + data)
      offset += data
      dataBlocks.push(chunk)
      ecBlocks.push(reedSolomon(chunk, total - data))
    }
  }

  const result: number[] = []
  const maxData = Math.max(...dataBlocks.map((block) => block.length))
  for (let i = 0; i < maxData; i += 1) {
    for (const block of dataBlocks) {
      if (i < block.length) result.push(block[i])
    }
  }

  const maxEc = Math.max(...ecBlocks.map((block) => block.length))
  for (let i = 0; i < maxEc; i += 1) {
    for (const block of ecBlocks) {
      if (i < block.length) result.push(block[i])
    }
  }

  return result
}

function maskAt(mask: number, row: number, col: number): boolean {
  switch (mask) {
    case 0:
      return (row + col) % 2 === 0
    case 1:
      return row % 2 === 0
    case 2:
      return col % 3 === 0
    case 3:
      return (row + col) % 3 === 0
    case 4:
      return (Math.floor(row / 2) + Math.floor(col / 3)) % 2 === 0
    case 5:
      return ((row * col) % 2) + ((row * col) % 3) === 0
    case 6:
      return (((row * col) % 2) + ((row * col) % 3)) % 2 === 0
    default:
      return (((row + col) % 2) + ((row * col) % 3)) % 2 === 0
  }
}

function bchDigit(value: number): number {
  let digit = 0
  let current = value
  while (current !== 0) {
    digit += 1
    current >>>= 1
  }
  return digit
}

function formatBits(level: QrCodeLevel, mask: number): number {
  const data = (LEVEL_BITS[level] << 3) | mask
  let remainder = data << 10
  while (bchDigit(remainder) - bchDigit(0x537) >= 0) {
    remainder ^= 0x537 << (bchDigit(remainder) - bchDigit(0x537))
  }
  return ((data << 10) | remainder) ^ 0x5412
}

function versionBits(version: number): number {
  let remainder = version << 12
  while (bchDigit(remainder) - bchDigit(0x1f25) >= 0) {
    remainder ^= 0x1f25 << (bchDigit(remainder) - bchDigit(0x1f25))
  }
  return (version << 12) | remainder
}

interface Canvas {
  size: number
  modules: boolean[][]
  reserved: boolean[][]
}

function createCanvas(version: number): Canvas {
  const size = version * 4 + 17
  return {
    size,
    modules: Array.from({ length: size }, () => new Array<boolean>(size).fill(false)),
    reserved: Array.from({ length: size }, () => new Array<boolean>(size).fill(false)),
  }
}

function setModule(canvas: Canvas, row: number, col: number, dark: boolean, reserve = true): void {
  if (row < 0 || col < 0 || row >= canvas.size || col >= canvas.size) return
  canvas.modules[row][col] = dark
  if (reserve) canvas.reserved[row][col] = true
}

function placeFinder(canvas: Canvas, row: number, col: number): void {
  for (let r = -1; r <= 7; r += 1) {
    for (let c = -1; c <= 7; c += 1) {
      const inside = r >= 0 && r <= 6 && c >= 0 && c <= 6
      const dark =
        inside &&
        (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4))
      setModule(canvas, row + r, col + c, dark)
    }
  }
}

function placeFunctionPatterns(canvas: Canvas, version: number): void {
  const { size } = canvas

  placeFinder(canvas, 0, 0)
  placeFinder(canvas, 0, size - 7)
  placeFinder(canvas, size - 7, 0)

  for (let i = 8; i < size - 8; i += 1) {
    const dark = i % 2 === 0
    setModule(canvas, 6, i, dark)
    setModule(canvas, i, 6, dark)
  }

  const positions = ALIGNMENT_POSITIONS[version - 1]
  for (const row of positions) {
    for (const col of positions) {
      const overlapsFinder =
        (row === 6 && col === 6) ||
        (row === 6 && col === size - 7) ||
        (row === size - 7 && col === 6)
      if (overlapsFinder) continue
      for (let r = -2; r <= 2; r += 1) {
        for (let c = -2; c <= 2; c += 1) {
          setModule(canvas, row + r, col + c, Math.max(Math.abs(r), Math.abs(c)) !== 1)
        }
      }
    }
  }

  // 格式信息区域
  for (let i = 0; i < 15; i += 1) {
    if (i < 6) setModule(canvas, i, 8, false)
    else if (i < 8) setModule(canvas, i + 1, 8, false)
    else setModule(canvas, size - 15 + i, 8, false)

    if (i < 8) setModule(canvas, 8, size - 1 - i, false)
    else if (i === 8) setModule(canvas, 8, 7, false)
    else setModule(canvas, 8, 15 - i - 1, false)
  }

  // 固定深色模块
  setModule(canvas, size - 8, 8, true)

  if (version >= 7) {
    for (let i = 0; i < 18; i += 1) {
      setModule(canvas, Math.floor(i / 3), (i % 3) + size - 11, false)
      setModule(canvas, (i % 3) + size - 11, Math.floor(i / 3), false)
    }
  }
}

function placeData(canvas: Canvas, codewords: number[], version: number): void {
  const { size } = canvas
  const totalBits = codewords.length * 8 + REMAINDER_BITS[version - 1]
  let bitIndex = 0

  const bitAt = (index: number): number => {
    if (index >= codewords.length * 8) return 0
    return (codewords[index >> 3] >>> (7 - (index & 7))) & 1
  }

  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5
    for (let vertical = 0; vertical < size; vertical += 1) {
      for (let offset = 0; offset < 2; offset += 1) {
        const col = right - offset
        const upward = ((right + 1) & 2) === 0
        const row = upward ? size - 1 - vertical : vertical
        if (canvas.reserved[row][col]) continue
        canvas.modules[row][col] = bitIndex < totalBits ? bitAt(bitIndex) === 1 : false
        bitIndex += 1
      }
    }
  }
}

function applyMask(canvas: Canvas, mask: number): void {
  for (let row = 0; row < canvas.size; row += 1) {
    for (let col = 0; col < canvas.size; col += 1) {
      if (canvas.reserved[row][col]) continue
      if (maskAt(mask, row, col)) canvas.modules[row][col] = !canvas.modules[row][col]
    }
  }
}

function writeFormat(canvas: Canvas, level: QrCodeLevel, mask: number): void {
  const { size } = canvas
  const bits = formatBits(level, mask)

  for (let i = 0; i < 15; i += 1) {
    const dark = ((bits >>> i) & 1) === 1
    if (i < 6) setModule(canvas, i, 8, dark, false)
    else if (i < 8) setModule(canvas, i + 1, 8, dark, false)
    else setModule(canvas, size - 15 + i, 8, dark, false)

    if (i < 8) setModule(canvas, 8, size - 1 - i, dark, false)
    else if (i === 8) setModule(canvas, 8, 7, dark, false)
    else setModule(canvas, 8, 15 - i - 1, dark, false)
  }

  setModule(canvas, size - 8, 8, true, false)
}

function writeVersion(canvas: Canvas, version: number): void {
  if (version < 7) return
  const { size } = canvas
  const bits = versionBits(version)

  for (let i = 0; i < 18; i += 1) {
    const dark = ((bits >>> i) & 1) === 1
    setModule(canvas, Math.floor(i / 3), (i % 3) + size - 11, dark, false)
    setModule(canvas, (i % 3) + size - 11, Math.floor(i / 3), dark, false)
  }
}

function penalty(modules: boolean[][], size: number): number {
  let score = 0

  for (let row = 0; row < size; row += 1) {
    let run = 1
    for (let col = 1; col < size; col += 1) {
      if (modules[row][col] === modules[row][col - 1]) {
        run += 1
        if (run === 5) score += 3
        else if (run > 5) score += 1
      } else {
        run = 1
      }
    }
  }

  for (let col = 0; col < size; col += 1) {
    let run = 1
    for (let row = 1; row < size; row += 1) {
      if (modules[row][col] === modules[row - 1][col]) {
        run += 1
        if (run === 5) score += 3
        else if (run > 5) score += 1
      } else {
        run = 1
      }
    }
  }

  for (let row = 0; row < size - 1; row += 1) {
    for (let col = 0; col < size - 1; col += 1) {
      const color = modules[row][col]
      if (
        color === modules[row + 1][col] &&
        color === modules[row][col + 1] &&
        color === modules[row + 1][col + 1]
      ) {
        score += 3
      }
    }
  }

  const finderLike = [
    [true, false, true, true, true, false, true, false, false, false, false],
    [false, false, false, false, true, false, true, true, true, false, true],
  ]

  const matches = (values: boolean[], index: number): boolean =>
    finderLike.some((pattern) => pattern.every((bit, offset) => values[index + offset] === bit))

  for (let row = 0; row < size; row += 1) {
    const values = modules[row]
    for (let col = 0; col <= size - 11; col += 1) {
      if (matches(values, col)) score += 40
    }
  }

  for (let col = 0; col < size; col += 1) {
    const values = modules.map((row) => row[col])
    for (let row = 0; row <= size - 11; row += 1) {
      if (matches(values, row)) score += 40
    }
  }

  let dark = 0
  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      if (modules[row][col]) dark += 1
    }
  }

  const total = size * size
  score += Math.floor(Math.abs((dark * 100) / total - 50) / 5) * 10

  return score
}

/**
 * 生成二维码矩阵。仅支持字节模式与版本 1–10（最多约 270 字节，视纠错等级而定）。
 */
export function encodeQrCode(
  text: string,
  level: QrCodeLevel = 'M',
  fixedMask?: number,
): QrCodeMatrix {
  const bytes = utf8Bytes(text)
  const version = pickVersion(bytes.length, level)
  const codewords = interleave(createDataBits(bytes, version, level), version, level)

  let best: { mask: number; canvas: Canvas; score: number } | undefined

  const masks = fixedMask === undefined ? [0, 1, 2, 3, 4, 5, 6, 7] : [fixedMask]

  for (const mask of masks) {
    const canvas = createCanvas(version)
    placeFunctionPatterns(canvas, version)
    placeData(canvas, codewords, version)
    applyMask(canvas, mask)
    writeFormat(canvas, level, mask)
    writeVersion(canvas, version)

    if (fixedMask !== undefined) {
      best = { mask, canvas, score: 0 }
      break
    }

    const score = penalty(canvas.modules, canvas.size)
    if (!best || score < best.score) best = { mask, canvas, score }
  }

  const canvas = best!.canvas
  return { version, size: canvas.size, mask: best!.mask, modules: canvas.modules }
}
