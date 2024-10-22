/// <reference types="Cypress" />

//bloco describe define a suite de testes
describe('Central de Atendimento ao Cliente TAT', function() {
    //O beforeach servirá como bloco geral para executar inicialmente antes de qualquer outra verificação
    beforeEach(function(){
        cy.visit('./index.html')
    })
    
    //bloco it define os casos de testes
    //function é uma função de callback para executar o corpo do teste
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    //Validando fluxo normal
    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longtext = "Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,"
        cy.get('#firstName').type('Luana')
        cy.get('#lastName').type('Muller')
        cy.get('#email').type('luanamull@gmail.com')
        cy.get('open-text-area').type(longtext, {delay: 0})
        cy.get('button[type="submit"]').click()

        //verificação de resultado esperado
        cy.get('.sucess').should('be.visible')
    })

    //Validando e-mail errado/inválido
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Luana')
        cy.get('#lastName').type('Muller')
        cy.get('#email').type('luanamull@gmail,com')
        cy.get('open-text-area').type('Test')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    //Validando telefone com valor somente númericos
    it.only('Validação númerica do campo telefone', function(){
        cy.get('#phone').type('abcdefgh').should('have.value','')
    })
  })

 
  