const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    video: true,
    videosFolder: 'cypress/videos',
    videoCompression: 32,
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});