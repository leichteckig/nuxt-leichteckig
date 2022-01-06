module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'plugin:nuxt/recommended',
    'plugin:vue/recommended',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'vue/max-len': ['error', {
      code: 140,
      template: 140,
      tabWidth: 2,
      comments: 100,
      ignorePattern: '',
      ignoreComments: false,
      ignoreTrailingComments: false,
      ignoreUrls: false,
      ignoreStrings: false,
      ignoreTemplateLiterals: false,
      ignoreRegExpLiterals: false,
      ignoreHTMLAttributeValues: false,
      ignoreHTMLTextContents: false
    }],
    'vue/multi-word-component-names': 0,
  },

  overrides: [{
    extends: [
      'plugin:cypress/recommended',
      'plugin:chai-friendly/recommended'
    ],
    files: ['**/*.spec.js', 'cypress/**/*.js', 'test/**/*.js'],
    rules: {
      'no-console': 0,
      'comma-dangle': 0,
      'max-len': 0,
      'inclusive-language/use-inclusive-words': 0,
    },
  }]
}
