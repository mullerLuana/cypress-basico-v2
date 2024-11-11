# Testes automatizados com Cypress - Básico

👋 Seja bem-vindo(a)!

Durante o curso de testes automatizados com Cypress (básico), foi aprendido:

- Como configurar um projeto Cypress do zero
- Como visitar páginas locais e remotas
- Como lidar com os elementos mais comuns encontrados em aplicações web
- Como testar _upload_ de arquivos
- Como realizar as mais diversas verificações de resultados esperados
- Como criar comandos customizados
- Como lidar com links que abrem em outra aba do navegador
- Como rodar testes simulando as dimensões de um dispositivo móvel
- Como resolver os mesmos problemas de diferentes formas, conhecendo a [API do Cypress](https://docs.cypress.io/api/table-of-contents)
- Como executar os testes em um _pipeline_ de integração contínua sempre que mudanças ocorrerem no código da aplicação (ou dos testes)
- Como criar uma documentação mínima para seu projeto de testes automatizados

## Vamos começar?

Vá para a seção [estrutura do curso](./lessons/_course-structure_.md).

__________________________________________________
Para executar testes simulando um dispositivo móvel via linha de comando, utilize o seguinte comando na configuração do package json no script
logo abaixo do cy.open.

    "cy:open:mobile": "cypress run --configviewportWidth=375,viewportHeight=667"

Este comando é para execução em modulo headlees (sem executar o visual, so viewport)
    "test:mobile":"cypress run --config viewportWidth=410,viewportHeight=860"

Run npm test (or npm t for the short version) to run the test in headless mode.

Or, run npm run cy:open to open Cypress in interactive mode.
___________________________________________________
# cy-basico-v2

Sample project for the basic course of the Talking About Testing Online School.

## Pre-requirements

It is required to have Node.js and npm installed to run this project.

> I used versions `v18.15.0` and `9.5.0` of Node.js and npm, respectively. I suggest you use the same or later versions.

## Installation

Run `npm install` (or `npm i` for the short version) to install the dev dependencies.

## Tests
Você pode rodar a aplicação de duas formas em desktop w mobile viewport.

## Desktop

Run `npm test` (or `npm t` for the short version) to run the test in headless mode on a Desktop viewport.

Or, run `npm run cy:open` to open Cypress in interactive mode on a Desktop viewport.

## mobile

Run `npm run test:mobile` to run the test in headless mode on a mobile viewport.

Or, run `npm run cy:open` to open Cypress in interactive mode on a mobile viewport.


executar projeto npm run cy:open