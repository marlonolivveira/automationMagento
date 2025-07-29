import { faker } from '@faker-js/faker';

describe('Cadastro de usuarios', () => {

    const url = 'https://magento.softwaretestingboard.com/customer/account/create/';
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const password = 'Teste123';
    const incorrectPass = 'teste';
    const emailExists = 'ida.davidson@example.com';


    beforeEach(() => {

        cy.visit(url)
        
        // Verificando se realmente estou na pagina de cadastro
        cy.title().should('include', 'Create New Customer Account');
    })


    it('Deve preencher os dados e realizar o cadastro.', () => {

        // Preenche os dados do cadastro com dados ficticios
        cy.get('#firstname').type(firstName)
        cy.get('#lastname').type(lastName)
        cy.get('#email_address').type(email)
        cy.get('#password').type(password)
        cy.get('#password-confirmation').type(password)
    
        // Clica no botão de criar conta 
        cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()

        // Dupla verificação para ver se está na pagina My Account
        cy.title().should('include', 'My Account');
        cy.get('.current > strong').contains('My Account')

        // Verifica a mensagem se a mensagem de sucesso é apresentada
        cy.verifyMessageSucess('Thank you for registering with Main Website Store.')

    }),

    
    it('Deve apresentar as mensagem de campo obrigatório em baixo dos campos nao preenchidos', () => {

        // Clica no botão de criar conta 
        cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()

        // Lista com os IDs de todos os campos que queremos testar
        const fields = [
            'firstname',
            'lastname',
            'email_address',
            'password',
            'password-confirmation'
        ];
        
        // Transforma a lista em um "sujeito" do Cypress e itera sobre cada item
        cy.wrap(fields).each((field) => {

        // Usa o nome do campo para criar o seletor do input dinamicamente
        cy.get(`input#${field}`) 
          .next('div.mage-error')
          .should('be.visible')
          .and('have.id', `${field}-error`) // Cria o seletor do erro dinamicamente
          .and('contain.text', 'This is a required field.')
          .and('have.css', 'color', 'rgb(224, 43, 39)');
        });
    }), 

    
    it('Deve tentar realozar o cadastro com senhas que não coincidem.', () => {

        // Preenche os dados do cadastro com dados ficticios
        cy.get('#firstname').type(firstName)
        cy.get('#lastname').type(lastName)
        cy.get('#email_address').type(email)
        cy.get('#password').type(password)
        cy.get('#password-confirmation').type(incorrectPass)
    
        // Clica no botão de criar conta 
        cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()

        // Verificando se aparece a mensagem Please enter the same value again." abaixo do campo "Confirm Password"
        cy.get(`input#password-confirmation`) 
          .next('div.mage-error')
          .should('be.visible')
          .and('have.id', `password-confirmation-error`) // Cria o seletor do erro dinamicamente
          .and('contain.text', 'Please enter the same value again.')
          .and('have.css', 'color', 'rgb(224, 43, 39)');

        // Verificando se ainda estou na pagina de cadastro
        cy.url().should('eq', 'https://magento.softwaretestingboard.com/customer/account/create/');
    }),

    
    it.only('Deve preencher os dados e realizar o cadastro.', () => {

        // Preenche os dados do cadastro com dados ficticios
        cy.get('#firstname').type(firstName)
        cy.get('#lastname').type(lastName)
        cy.get('#email_address').type(emailExists)
        cy.get('#password').type(password)
        cy.get('#password-confirmation').type(password)
    
        // Clica no botão de criar conta 
        cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()

        cy.wait(1000)

        // Verifica a mensagem se a mensagem é de erro é apresentada
        cy.verifyMessageError(null ,'There is already an account with this email address. If you are sure that it is your email address, click here to get your password and access your account.')

    })
})