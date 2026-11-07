import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'coverage/**',
      'pnpm-lock.yaml',
      'CHANGELOG.md',
      'docs/.vitepress/cache/**',
      'docs/.vitepress/dist/**',
      'docs/.vitepress/data/**',
      '.vitepress/**',
      'src/components/manifest.ts',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.{ts,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/attributes-order': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-self-closing': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
    },
  },
  {
    files: ['scripts/**/*.mjs', '*.config.{js,ts}'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    // 模板换行交给 Prettier，ESLint 不重复约束
    rules: {
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
    },
  },
)
