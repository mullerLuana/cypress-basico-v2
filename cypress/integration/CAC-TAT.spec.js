/// <reference types="Cypress" />

const { verify } = require("tweetnacl")

//bloco describe define a suite de testes
describe('Central de Atendimento ao Cliente TAT', function() {
    //Variavel para controle do time
    const THREE_SECONDS_IN_MS=3000
    //O beforeach servirá como bloco geral para executar inicialmente antes de qualquer outra verificação
    beforeEach(function(){
      cy.visit('./src/index.html')
    })
   it('Verifica o título da aplicação', () => {
     //cy.visit('./src/index.html')
     cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
   })

   //Validando fluxo normal
   it('preenche os campos obrigatórios e envia o formulário', function(){
    const longtext = "Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,"
    
    //congelar relogio do navegador
    cy.clock()

    cy.get('#firstName').type('Luana')
    cy.get('#lastName').type('Muller')
    cy.get('#email').type('luanamull@gmail.com')
    cy.get('#open-text-area').type(longtext, {delay: 0})
    cy.contains('button','Enviar').click()

    //verificação de resultado esperado
    cy.get('.success').should('be.visible')

    //limpando o time bloqueado anteriormente e validando se a mensagem não é mais mostrada
    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.success').should('not.be.visible')
})

//Validando e-mail errado/inválido
it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
   
    cy.clock()

    cy.get('#firstName').type('Luana')
    cy.get('#lastName').type('Muller')
    cy.get('#email').type('luanamull@gmail,com')
    cy.get('#open-text-area').type('Test')
    cy.contains('button','Enviar').click()

    cy.get('.error').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.success').should('not.be.visible')
})

//Validando telefone com valor somente númericos
it('Validação númerica do campo telefone', function(){
    cy.get('#phone').type('abcdefgh').should('have.value','')
})

//serve para validar x vezes ou mais o mesmo cenário repetidamente
Cypress._.times(4, function(){
    it('Campo telefone continuar vazio quando preenchido com valor não númerico', function(){
        cy.get('#phone').type('abcdefgh').should('have.value','')
    })
})

//Validando o campo de telefone vazio
it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
   cy.clock()
    cy.get('#firstName').type('Luana')
    cy.get('#lastName').type('Muller')
    cy.get('#email').type('luanamull@gmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Teste')
    cy.contains('button','Enviar').click() 
    cy.get('.error').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.success').should('not.be.visible')
})

it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
    //validação de campos comparando a informação se é a mesma seguida de limpeza do input
    cy.get('#firstName').type('Luana').should('have.value', 'Luana').clear().should('have.value','')
    cy.get('#lastName').type('Luana').should('have.value', 'Luana').clear().should('have.value','')
    cy.get('#email').type('Luana').should('have.value', 'Luana').clear().should('have.value','')
    cy.get('#phone').type('1234567890').should('have.value', '1234567890').clear().should('have.value','')
    cy.get('#open-text-area').type('Teste').should('have.value', 'Teste').clear().should('have.value','')
})

it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
    cy.clock()
    //visitando a página e clicando direto no botão sem os dados, deve apresentar a mensagem de erro
    cy.contains('button','Enviar').click() 
    cy.get('.error').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.success').should('not.be.visible')
})

/*it('envia o formuário com sucesso usando um comando customizado',function(){
    cy.clock()
    //chamada do teste customizavel
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.success').should('not.be.visible')
})*/

it('seleciona um produto (YouTube) por seu texto', function(){
    cy.get('#product').select('youtube').should('have.value', 'youtube')
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

it('marca ambos checkboxes, depois desmarca o último', () => {
    //marcando todos os checkbox e desmarcando o último
    cy.get('input[type="checkbox"]').check().should('be.checked')
        .last().uncheck().should('not.be.checked')
});

it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]').should('not.have.value')
        .selectFile('cypress/fixtures/example.json').should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        //persistido no objeto de files do input se o nome do arquivo é o mesmo
    })
});

it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]').should('not.have.value')
        .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input){expect($input[0].files[0].name).to.equal('example.json')
    })
});

it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    //usando o fixture para pegar um arquivo com um nome/alias de exemplo
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]').selectFile('@sampleFile')
        .should(function($input){expect($input[0].files[0].name).to.equal('example.json')
    })
});

it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    //Neste caso estou verificando o direcionamento do link sem precisar clicar nele
    cy.get('#privacy a').should('have.attr','target','_blank')        
});

it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
   //o comando target serve para abrir em outra aba, aqui estamos revmovendo ele para abrir na mesma aba a outra página
    cy.get('#privacy a').invoke('removeAttr', 'target').click()
    cy.contains('Talking About Testing').should('be.visible')
});

it('testa a página da política de privacidade de forma independente', () => {
    cy.get('#privacy a').should('have.attr','target','_blank')
});

it('exibe mensagem por 3 segundos', function() {
    cy.clock() // congela o relógio do navegador
  
    // (...) // ação que dispara algo que exibe uma mensagem por três segundos
  
    // (...) // verificação de que a mensagem está visível
  
    cy.tick(3000) // avança o relógio três segundos (em milissegundos). Avanço este tempo para não perdê-lo esperando.
  
    // (...) // verificação de que a mensagem não está mais visível
  })

  it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('preenche a area de texto usando o comando invoke', () => {
    const longText = Cypress._.repeat('0123456789', 20)
    cy.get('#open-text-area').invoke('val', longText)
      .should('have.value', longText)
  });

  it('faz uma requisição HTTP', () => {
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
      .should(function(response){
        const { status, statusText, body } = response
        expect(status).to.equal(200)
        expect(statusText).to.equal('OK')
        expect(body).to.include('CAC TAT')
    })
  });

  it('Achando o gato escondido', () => {
    cy.get('#cat').invoke('show').should('be.visible')
    cy.get('#title').invoke('text','CAT TAT')
  });
})