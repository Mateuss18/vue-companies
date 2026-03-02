import withNuxt from './.nuxt/eslint.config.mjs'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'
import vuePlugin from 'eslint-plugin-vue'
import prettierPlugin from 'eslint-plugin-prettier'
import prettier from 'eslint-config-prettier'

export default withNuxt([
  {
    ignores: ['.nuxt/**', '.output/**', '.data/**', 'dist/**'],
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.vue'],
        sourceType: 'module',
      },
    },
  },
  {
    plugins: {
      '@typescript-eslint': tsPlugin,
      vue: vuePlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'prettier/prettier': 'warn',
    },
  },
  prettier,
])
