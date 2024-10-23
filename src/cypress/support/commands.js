//Comando customizavel para preencher os dados
cy.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Luana')
    cy.get('#lastName').type('Muller')
    cy.get('#email').type('luanamull@gmail.com')
    cy.get('open-text-area').type('Teste')
    cy.contains('button','Enviar').click()

})