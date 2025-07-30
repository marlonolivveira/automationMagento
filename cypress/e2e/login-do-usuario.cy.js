describe('Pagina de login', () => {

    const url = 'https://magento.softwaretestingboard.com/customer/account/login/';
    const email = 'ida.davidson@example.com';
    const password = 'Teste123';
    const incorrectPass = 'Teste12';


    beforeEach(() => {
        cy.visit(url)
    })


    it('Deve preencher os campos de login corretamente e logar no sistema.', () => {
        // Logando no sistema 
        cy.login(email, password);

        // Verificando se realmente estou na Home Page
        cy.title().should('include', 'My Account');
    }),


    it('Deve realizar a tentativa de login com senha incorreta.', () => {
        // Logando no sistema 
        cy.login(email, incorrectPass);

        // Verificando se realmente estou na Home Page
        cy.title().should('include', 'Customer Login');

        // Verificando a apresentação da mensagem de erro e a cor da frase
        cy.verifyMessageError(null, 'The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.')
    }),


    it('Deve realizar a tentativa de login sem preencher os campos obrigatórios.', () => {
        
        // Intercepta o post
        cy.intercept('POST', '**/j/collect?**').as('load');
        // Passo 3: Espera ate que o post seja carregado por completo
        cy.wait(['@load'], { timeout: 15000 });

        // Clicando no botão de login 
        cy.clickBt('#send2', 'Sign In');
        
        // Pega o campo de email e verifica se a mensagem de erro aparece abaixo do input
        cy.get('input#email')
          .next('div.mage-error')
          .should('be.visible')
          .and('have.id', 'email-error')
          .and('contain.text', 'This is a required field.')
          .and('have.css', 'color', 'rgb(224, 43, 39)');;

        // Pega o capo de password e verifica se a mensagem de erro aparece abaixo do input
        cy.get('input#pass')
          .next('div.mage-error')
          .should('be.visible')
          .and('have.id', 'pass-error')
          .and('contain.text', 'This is a required field.')
          .and('have.css', 'color', 'rgb(224, 43, 39)'); 
    })
})