/*it('testa a página da política de privacidade de forma independente', () => {
    cy.visit('./src/privacy.html')
    cy.contains('Talking About Testing').should('be.visible')

//Foi criado esse novo arquivo para a execução da pagína de privacidade de modo
//independente. Assim é executado a página de privacidade diretamente sem precisar
//passar pelas páginas anteriores.
//Um exemplo de uso: paginas institucionais.
});*/

//aqui está validando por 3 vezes a página, ou seja, pode ser determinado uma quantidade de execução
//para esse cenário, assim ele vai ficar se repetindo.
Cypress._.times(3, function(){
    it('testa a página da política de privacidade de forma independente', () => {
        cy.visit('./src/privacy.html')
        cy.contains('Talking About Testing').should('be.visible')
    })
})

