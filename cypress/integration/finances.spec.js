/// estrutura de testes ///
/// pode ser "describe" também //

/// <reference types="cypress"/>  
import { format, prepareLocalStorage } from '../support/utils'
    // referencia das docs do cypress 

    // Cadastrar saídas
    // Remover entradas e saídas


    // hooks => executa antes e depois do teste
// before => antes de todos os testes
// beforeEach => antes de cada teste
// after => depois de todos os testes
// afterEach => depois de cada teste

beforeEach(() => {
    cy.visit('https://devfinance-agilizei.netlify.app', {
        onBeforeLoad:(win) => {
            prepareLocalStorage(win)
        }
    });   
     
});
    
context('Dev Finances Agilizei', () => {
    it('Cadastrar entradas', () => {
    
    // - entender o fluxo manualmente
    // - mapear os elementos que vamos interagir
    // - descrever as interações com o cypress
    // - adicionar as asserções que a gente precisa   
     cy.get('#transaction .button').click()     // id + classe
     cy.get('.input-group #description ').type('Mesada')
     cy.get('[name=amount]').type(1000)         // pegando elemento via atributo [atributo=valor]
     cy.get('.input-group #date').type('2022-03-30')
     cy.get('button').contains('Salvar').click()        // tipo e valor. foi usado o "contains" do cypress para capturar o texto do elemento button 

     cy.get('#data-table tbody tr').should('have.length', 3); // validação
        
    }),

    it('Cadastrar saidas', () => {
 
    // - entender o fluxo manualmente
    // - mapear os elementos que vamos interagir
    // - descrever as interações com o cypress
    // - adicionar as asserções que a gente precisa   
        cy.get('#transaction .button').click();     // id + classe
        cy.get('.input-group #description ').type('Academia');
        cy.get('[name=amount]').type(-80);         // pegando elemento via atributo [atributo=valor]
        cy.get('.input-group #date').type('2022-04-30');
        cy.get('button').contains('Salvar').click();        // tipo e valor. foi usado o "contains" do cypress para capturar o texto do elemento button 
        
        cy.get('#data-table tbody tr').should('have.length', 3); // validação
        
    });
    
    it('Remover entradas e saídas', () => {
         
    // - entender o fluxo manualmente
    // - mapear os elementos que vamos interagir
    // - descrever as interações com o cypress
    // - adicionar as asserções que a gente precisa   
   

     cy.get('td.description');
     cy.contains("Mesada")
     .parent()
     .find('img[onclick="Transaction.remove(0)"]')
     .click()

     cy.contains('Suco Kapo')
     .parent()
     .find('img[onclick="Transaction.remove(0)"]')
     .click()
     
     cy.get('#data-table tbody tr').should('have.length', 0) // validação
     
    });
    
    it('Validar saldo com diversas transações', () => {
       
       // capturar as linhas com as transações
       // capturar o texto dessas colunas
       // formatar esses valores das linhas
       
       // capturar o texto do total
       // comparar o somatório de entradas e despesas com o total

 
     let incomes = 0 
     let expenses = 0

     cy.get('#data-table tbody tr')
        .each(($el, index, $list) => {

            cy.get($el).find('td.income,  td.expense').invoke('text').then(text => {
                 if(text.includes('-')) {
                     expenses = expenses + format(text)
                 } else {
                     incomes = incomes + format(text)
                 } 
                 cy.log(`entradas`, incomes)
                 cy.log(`saidas`, expenses)
                
                })

        })
        // validação
        cy.get('#totalDisplay').invoke('text').then(text => {
            cy.log(text)

            let formattedTotalDisplay = format(text)
            let expectedTotal = incomes + expenses 

            expect(formattedTotalDisplay).to.eq(expectedTotal)
        })


        
    });
   
});  