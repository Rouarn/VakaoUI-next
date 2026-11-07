import { fileURLToPath, URL } from 'node:url'
import { existsSync, readdirSync } from 'node:fs'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'
import dts from 'vite-plugin-dts'

const componentsDir = fileURLToPath(new URL('./src/components', import.meta.url))

const componentEntries = Object.fromEntries(
  readdirSync(componentsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) => existsSync(`${componentsDir}/${entry.name}/index.ts`))
    .map((entry) => [`components/${entry.name}/index`, `src/components/${entry.name}/index.ts`]),
)

const entry = {
  index: 'src/index.ts',
  resolver: 'src/resolver.ts',
  'tokens/index': 'src/tokens/index.ts',
  ...componentEntries,
}

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: './tsconfig.build.json',
      entryRoot: 'src',
      outDirs: ['dist'],
      insertTypesEntry: false,
      cleanVueFileName: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2020',
    minify: false,
    sourcemap: true,
    lib: {
      entry,
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json-summary'],
      include: ['src/**/*.{ts,vue}'],
      exclude: [
        'src/**/*.d.ts',
        'src/**/index.ts',
        'src/**/types.ts',
        'src/components/manifest.ts',
      ],
      thresholds: {
        statements: 74,
        branches: 63,
        functions: 79,
        lines: 77,
      },
    },
  },
})
