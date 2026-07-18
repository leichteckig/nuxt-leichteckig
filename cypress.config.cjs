const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video: false,
  projectId: '',
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
})
