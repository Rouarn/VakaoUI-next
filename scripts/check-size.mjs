import { readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { gzipSync } from 'node:zlib'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

const BUDGET = {
  entry: 60 * 1024,
  total: 180 * 1024,
  css: 60 * 1024,
}

function walk(dir) {
  const result = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) result.push(...walk(full))
    else result.push(full)
  }
  return result
}

const files = walk(dist)
const jsFiles = files.filter((file) => file.endsWith('.js'))
const cssFiles = files.filter((file) => file.endsWith('.css'))

const rows = []
let total = 0
for (const file of jsFiles) {
  const gzip = gzipSync(readFileSync(file)).length
  total += gzip
  rows.push({ file: relative(dist, file), raw: statSync(file).size, gzip })
}

rows.sort((a, b) => b.gzip - a.gzip)
console.log('文件'.padEnd(42), '原始'.padStart(9), 'gzip'.padStart(9))
for (const row of rows) {
  console.log(row.file.padEnd(42), String(row.raw).padStart(9), String(row.gzip).padStart(9))
}

const cssTotal = cssFiles.reduce((sum, file) => sum + gzipSync(readFileSync(file)).length, 0)
console.log(`\nJS 合计 gzip ${(total / 1024).toFixed(1)} KB / 预算 ${BUDGET.total / 1024} KB`)
console.log(`CSS 合计 gzip ${(cssTotal / 1024).toFixed(1)} KB / 预算 ${BUDGET.css / 1024} KB`)

const failures = []
for (const row of rows) {
  if (row.gzip > BUDGET.entry) failures.push(`${row.file} gzip ${row.gzip} > ${BUDGET.entry}`)
}
if (total > BUDGET.total) failures.push(`JS 合计 ${total} > ${BUDGET.total}`)
if (cssTotal > BUDGET.css) failures.push(`CSS 合计 ${cssTotal} > ${BUDGET.css}`)

if (failures.length) {
  console.error('\n[check-size] 超出预算：')
  for (const failure of failures) console.error(` - ${failure}`)
  process.exit(1)
}
console.log('[check-size] 通过')
