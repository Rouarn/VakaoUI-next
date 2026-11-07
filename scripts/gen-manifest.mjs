import { readdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const componentsDir = join(root, 'src/components')

const pascal = (value) => value.replace(/(^|-)([a-z])/g, (_, __, char) => char.toUpperCase())

const names = readdirSync(componentsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort()
  .flatMap((dir) => {
    const extra = {
      form: ['Form', 'FormItem'],
      radio: ['Radio', 'RadioGroup'],
      grid: ['Row', 'Col', 'Space'],
    }[dir]
    return (extra ?? [pascal(dir)]).map((name) => ({ name, dir }))
  })

const lines = names.map(({ name, dir }) => `  { name: 'Vk${name}', dir: '${dir}' },`)
const content = `/* 由 scripts/gen-manifest.mjs 生成，请勿手工修改 */
export interface ComponentManifestItem {
  name: string
  dir: string
}

export const componentManifest: ComponentManifestItem[] = [
${lines.join('\n')}
]
`
writeFileSync(join(componentsDir, 'manifest.ts'), content, 'utf8')
console.log(`[gen-manifest] ${names.length} components -> src/components/manifest.ts`)
