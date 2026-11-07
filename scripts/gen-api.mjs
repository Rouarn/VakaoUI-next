import { mkdirSync, readdirSync, writeFileSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createChecker } from 'vue-component-meta'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const componentsDir = join(root, 'src/components')
const outFile = join(root, 'docs/.vitepress/data/api.json')

const checker = createChecker(join(root, 'tsconfig.json'))

const files = []
for (const dir of readdirSync(componentsDir, { withFileTypes: true })) {
  if (!dir.isDirectory()) continue
  const srcDir = join(componentsDir, dir.name, 'src')
  const entries = (() => {
    try {
      return readdirSync(srcDir).filter((file) => file.endsWith('.vue'))
    } catch {
      return []
    }
  })()
  for (const file of entries) files.push(join(srcDir, file))
}

const api = {}

const INTERNAL_PROPS = new Set(['key', 'ref', 'ref_for', 'ref_key', 'class', 'style'])
const isInternal = (name) => INTERNAL_PROPS.has(name) || name.startsWith('onVue:')
const cleanType = (type) =>
  String(type ?? '')
    .replace(/\s*\|\s*undefined\b/g, '')
    .trim() || 'unknown'

for (const file of files.sort()) {
  const name = basename(file, '.vue')
  const meta = checker.getComponentMeta(file)
  api[name] = {
    props: meta.props
      .filter((prop) => !isInternal(prop.name))
      .map((prop) => ({
        name: prop.name,
        type: cleanType(prop.type),
        required: prop.required,
        default: prop.default,
        description: prop.description,
      })),
    events: meta.events
      .filter((event) => !isInternal(event.name))
      .map((event) => ({
        name: event.name,
        type: cleanType(event.type),
        description: event.description,
      })),
    slots: meta.slots
      .filter((slot) => !isInternal(slot.name))
      .map((slot) => ({
        name: slot.name,
        type: cleanType(slot.type),
        description: slot.description,
      })),
    exposed: meta.exposed
      .filter((item) => !isInternal(item.name))
      .map((item) => ({
        name: item.name,
        type: cleanType(item.type),
        description: item.description,
      })),
  }
}

mkdirSync(dirname(outFile), { recursive: true })
writeFileSync(outFile, `${JSON.stringify(api, null, 2)}\n`, 'utf8')
console.log(`[gen-api] ${Object.keys(api).length} components -> docs/.vitepress/data/api.json`)
