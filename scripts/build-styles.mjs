import { copyFileSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const componentsDir = join(root, 'src/styles/components')
const componentsOutDir = join(dist, 'styles/components')
const docsThemeDir = join(root, 'docs/.vitepress/theme')

const themeSource = JSON.parse(readFileSync(join(root, 'src/tokens/theme.json'), 'utf8'))
const light = themeSource.light
const dark = { ...light, ...themeSource.dark }

const kebabCase = (value) =>
  value.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`).replace(/([a-z])(\d)/g, '$1-$2')
const toVars = (tokens) =>
  Object.entries(tokens)
    .map(([key, value]) => `  --vk-${kebabCase(key)}: ${value};`)
    .join('\n')

const themeCss = `/* 由 src/tokens/theme.json 生成，请勿手工修改 */
:root,
[data-vk-theme='light'] {
  color-scheme: light;
${toVars(light)}
}

[data-vk-theme='dark'] {
  color-scheme: dark;
${toVars(dark)}
}
`

mkdirSync(dist, { recursive: true })
mkdirSync(componentsOutDir, { recursive: true })
mkdirSync(docsThemeDir, { recursive: true })
writeFileSync(join(dist, 'theme.css'), themeCss, 'utf8')

// 文档站跟随 VitePress 的 .dark 类切换，额外复制一份暗色变量；dist 不包含该选择器，避免全局副作用
const docsThemeCss = `${themeCss}
.dark {
  color-scheme: dark;
${toVars(dark)}
}
`
writeFileSync(join(docsThemeDir, 'theme.generated.css'), docsThemeCss, 'utf8')

const files = readdirSync(componentsDir)
  .filter((file) => file.endsWith('.css'))
  .sort()

for (const file of files) {
  copyFileSync(join(componentsDir, file), join(componentsOutDir, file))
}

const bundle = [themeCss, ...files.map((file) => readFileSync(join(componentsDir, file), 'utf8'))]
  .join('\n')
  .trimEnd()
  .concat('\n')

writeFileSync(join(dist, 'styles.css'), bundle, 'utf8')

const docsImports = files
  .map((file) => `@import '../../../src/styles/components/${file}';`)
  .join('\n')
writeFileSync(join(docsThemeDir, 'components.generated.css'), `${docsImports}\n`, 'utf8')

console.log(
  `[build-styles] theme.css + ${files.length} component styles -> dist/, docs/.vitepress/theme/`,
)
