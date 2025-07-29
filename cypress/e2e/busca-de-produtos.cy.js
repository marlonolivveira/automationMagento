describe('Busca por produtos', () => {

    const url = 'https://magento.softwaretestingboard.com';
    const produto = 'Radiant Tee';
    const produtoInexistente = 'produto_inexistente_123';

    beforeEach(() => {
        cy.visit(url)

        // Verifica se está na Home Page 
        cy.title().should('include', 'Home Page');
    })

    it('Deve realizar a busca por um produto que existe', () => {

        // Escrevo o texto desejado e simulo o aperto da tecla enter
        cy.digita('input#search', produto)
        .type('{enter}')

        // Verifica se está nos resultados da busca
        cy.title()
        .should('include', `Search results for: '${produto}'`);

        // Verifica se o produto Radiant Tee aparece na lista dos resultados
        cy.get('ol.list')
        .find('[data-container="product-grid"]')
        .contains(produto)
        .should('be.visible');

    }),

    
    it('Deve buscar por um produto inexistente na loja', () => {
        
        // Escrevo o texto desejado e simulo o aperto da tecla enter
        cy.digita('input#search', produtoInexistente)
        .type('{enter}')

        // Verifica se está nos resultados da busca
        cy.title()
        .should('include', `Search results for: '${produtoInexistente}'`);

        // Verifica se a mensagem está visível ao usuario
        cy.get('[class="message notice"]')
        .contains('Your search returned no results.')
        .should('be.visible')
    })
})