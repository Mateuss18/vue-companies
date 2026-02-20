import withNuxt from './.nuxt/eslint.config.mjs'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import prettierPlugin from 'eslint-plugin-prettier'
import prettier from 'eslint-config-prettier'

export default withNuxt([
  {
    ignores: ['.nuxt/**', '.output/**', '.data/**', 'dist/**'],
  },
  {
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'prettier/prettier': 'warn',
    },
  },
  prettier,
])
