describe('Finalização de Compra (Checkout)', () => {
    
    const url = 'https://magento.softwaretestingboard.com/customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS8%2C/';
    const email = 'ida.davidson@example.com';
    const password = 'Teste123';
    const produto = 'Radiant Tee';
    const subtotal = '$22.00';
    const shipping = '$5.00';
    const orderTotal = '$27.00';

    beforeEach(() => {
        cy.visit(url)
    })

    it('Deve validar o cliente logado finalizando a compra com sucesso.', () => {
        // Logando no sistema 
        cy.login(email, password);

        // Verificando se realmente estou na Home Page
        cy.title().should('include', 'Home Page');
        
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

        // Aguarda 1sec antes de clicar no carrinho
        cy.wait(1000)

        // Clica no carrinho
        cy.clickBt('[data-block="minicart"]')
        cy.clickBt('#top-cart-btn-checkout','Proceed to Checkout')

        cy.wait(1000)

        // Veririca se o endereço está selecionado
        cy.get('.shipping-address-item.selected-item')
        .should('exist')
        
        // Seleciona o Shipping Methods de 5 dolares
        cy.get('#checkout-shipping-method-load')
        .contains(shipping)
        .click();

        // Clica no botão de Next
        cy.clickBt('[data-role="opc-continue"]')

        // Verifica os valores do pedido
        cy.get('[data-th="Cart Subtotal"').contains(subtotal)
        cy.get('[data-th="Shipping"').contains(shipping)
        cy.get('[data-th="Order Total"]').contains(orderTotal)

        // Verifica se o item está no carrinho ainda 
        cy.contains('1 Item in Cart').click()
        
        // Verifica se o produto está no carrinho
        cy.get('.product-item-details').contains('Radiant Tee')

        // Clicar para finalizar o pedido
        cy.contains('Place Order').click()

        // Verificando se foi redirecionado para a página de sucesso da compra
        cy.url().should('eq', 'https://magento.softwaretestingboard.com/checkout/onepage/success/');

        // Verificando a mensagem "Thank you for your purchase!" 
        cy.get('.page-title')
        .should('be.visible')
        .and('contain.text', 'Thank you for your purchase!');

        // Verifica o numero do pedido não está vazio
        cy.get('a.order-number > strong')
        .invoke('text')
        .should('not.be.empty');

    })
})