Cypress.Commands.add('clickBt', (element, text) => {
    const button = cy.get(element);

    if(text){
        button.should('contain', text);
    }
    button.click()
})

Cypress.Commands.add('login', (email, password) => {
    cy.get('[data-ui-id="page-title-wrapper"]').contains('Customer Login')
    cy.get('#email').type(email);
    cy.get('#pass').type(password);
    cy.clickBt('#send2', 'Sign In');
})

Cypress.Commands.add('verifyMessageError', (element, message) => {
    if(element){
        cy.get(element)
        .contains(message)
        .should('be.visible')
        .and('have.css', 'color', 'rgb(224, 43, 39)');
    }else{
        cy.contains(message)
        .should('be.visible')
        .and('have.css', 'color', 'rgb(224, 43, 39)');
    }

})

Cypress.Commands.add('verifyMessageSucess', (element, message) => {
    if(element && message){
        cy.get(element)
        .contains(message)
        .should('be.visible')
        .and('have.css', 'color', 'rgb(0, 100, 0)');
    }else{
        cy.contains(element)
        .should('be.visible')
        .and('have.css', 'color', 'rgb(0, 100, 0)');
    }

})


Cypress.Commands.add('digita', (element, text) => {
    cy.get(element).type(text)
})