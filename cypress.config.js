// cypress.config.js

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // Estas duas opções ajudam a contornar restrições de segurança do navegador.
    chromeWebSecurity: false,
    experimentalSessionAndOrigin: true,
    
    setupNodeEvents(on, config) {
      // Deixe esta secção vazia por agora. Não estamos a usar plugins.
    },
  },
});