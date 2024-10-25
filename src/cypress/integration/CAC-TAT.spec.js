/// <reference types="Cypress" />

const { verify } = require("tweetnacl")

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
        cy.contains('button','Enviar').click()

        //verificação de resultado esperado
        cy.get('.sucess').should('be.visible')
    })

    //Validando e-mail errado/inválido
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Luana')
        cy.get('#lastName').type('Muller')
        cy.get('#email').type('luanamull@gmail,com')
        cy.get('open-text-area').type('Test')
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
    })

    //Validando telefone com valor somente númericos
    it('Validação númerica do campo telefone', function(){
        cy.get('#phone').type('abcdefgh').should('have.value','')
    })

    //Validando o campo de telefone vazio
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Luana')
        cy.get('#lastName').type('Muller')
        cy.get('#email').type('luanamull@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('open-text-area').type('Teste')
        cy.contains('button','Enviar').click() 
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        //validação de campos comparando a informação se é a mesma seguida de limpeza do input
        cy.get('#firstName').type('Luana').should('have.value', 'Luana').clear().should('have.value','')
        cy.get('#lasttName').type('Luana').should('have.value', 'Luana').clear().should('have.value','')
        cy.get('#email').type('Luana').should('have.value', 'Luana').clear().should('have.value','')
        cy.get('#phone-checkbox').type('1234567890').should('have.value', '1234567890').clear().should('have.value','')
        cy.get('#open-text-area').type('Teste').should('have.value', 'Teste').clear().should('have.value','')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
       //visitando a página e clicando direto no botão sem os dados, deve apresentar a mensagem de erro
        cy.contains('button','Enviar').click() 
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado',function(){
        //chamada do teste customizavel
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.sucess').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product').select('Youtube').should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    });

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product').select(1).should('have.value', 'blog') 
    });

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check().should('have.value', 'feedback')
    });

    //seleção de campos radio e verificação
    it('marca cada tipo de atendimento', () => {
       cy.get('input[type="radio"]')
        .should('have.length',3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    });
  })

 
  