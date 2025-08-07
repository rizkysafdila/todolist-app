import antfu from '@antfu/eslint-config'
// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({
    rules: {
      'vue/valid-v-slot': 'off',
      'vue/v-on-event-hyphenation': 'off',
      'import/first': 'off',
      'vue/max-attributes-per-line': ['error', {
        singleline: {
          max: 4,
        },
        multiline: {
          max: 1,
        },
      }],
      'vue/first-attribute-linebreak': ['error', {
        singleline: 'ignore',
        multiline: 'below',
      }],
    },
    ignores: [
      '*.css',
      'public',
    ],
  }),
)
