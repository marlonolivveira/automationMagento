describe('Carrinho de compras', () => {
    const url = 'https://magento.softwaretestingboard.com';
    const produto = 'Radiant Tee';

    beforeEach(() => {
        cy.visit(url)

        // Verifica se está na Home Page 
        cy.title().should('include', 'Home Page');
    })

    it('Deve adicionar um produto com opções ao carrinho.', () => {
        
        // Escrevo o texto desejado e simulo o aperto da tecla enter
        cy.digita('input#search', produto)
        .type('{enter}')

        // Verifica se o produto Radiant Tee aparece na lista dos resultados e clica nele
        cy.get('ol.list')
        .find('[data-container="product-grid"]')
        .contains(produto)
        .should('be.visible')
        .click();

        // Clica na opção M
        cy.clickBt('#option-label-size-143-item-168', 'M')
        // Clica na cor Azul
        cy.clickBt('[option-label="Blue"]', '')
        // Clica no botão de adicionar ao carrinho
        cy.get('#product-addtocart-button').click()

        // Verificando se a mensagem de sucesso está aparecendo
        cy.verifyMessageSucess(null, 'You added Radiant Tee to your shopping cart.')

        // Verifica se o contador do carrinho atualizou para 1
        cy.get('.counter-number')
        .contains('1')
        .and('be.visible')
    }),

    it('Deve tentar adicionar produto ao carrinho sem selecionar opções obrigatórias', () => {
        
        // Escrevo o texto desejado e simulo o aperto da tecla enter
        cy.digita('input#search', produto)
        .type('{enter}')

        // Verifica se o produto Radiant Tee aparece na lista dos resultados e clica nele
        cy.get('ol.list')
        .find('[data-container="product-grid"]')
        .contains(produto)
        .should('be.visible')
        .click();

        // Clica no botão de adicionar ao carrinho
        cy.get('#product-addtocart-button').click()

        // Verifica se ainda está na pagina do produto
        cy.title().should('include', 'Radiant Tee');

        // Pega o campo Size e verifica se a mensagem de erro aparece em vermelho abaixo dele
        cy.get('[aria-labelledby="option-label-size-143"]')
          .nextAll('div.mage-error')
          .should('be.visible')
          .and('have.id', 'super_attribute[143]-error')
          .and('contain.text', 'This is a required field.')
          .and('have.css', 'color', 'rgb(224, 43, 39)');

        // Pega o campo Color e verifica se a mensagem de erro aparece em vermelho abaixo dele 
        cy.get('[aria-labelledby="option-label-color-93"]')
          .nextAll('div.mage-error')
          .should('be.visible')
          .and('have.id', 'super_attribute[93]-error')
          .and('contain.text', 'This is a required field.')
          .and('have.css', 'color', 'rgb(224, 43, 39)');
    })
})