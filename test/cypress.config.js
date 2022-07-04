const {defineConfig} = require('cypress')

const dt = Date.now()

module.exports = defineConfig({
  projectId: "u71jsu",
  // reporter: 'mochawesome',
  // reporterOptions: {
  //   reportDir: 'cypress/results',
  //   overwrite: false,
  //   html: true,
  //   json: true,
  //   reportFilename: "results-[datetime]/[status]-[name]",
  //   timestamp: "UTC:yyyy-mm-dd_HH-MM-ss Z"
  // },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    // excludeSpecPattern: 'cypress/e2e/example_tests/',∏
    baseUrl: 'http://localhost:8888/sgcng'
    // baseUrl: 'https://deckply.com/companynames'
  },
})
