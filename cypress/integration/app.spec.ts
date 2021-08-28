/// <reference types="cypress" />
// read about CY:INTERCEPT AND FIXTURES
context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  it('.type() - type into a DOM element', () => {
    // https://on.cypress.io/type
    // cy.get('[data-cy=btn-hello]')
    //   // Delay each keypress by 0.1 sec
    //   .click()
      cy.get("[data-cy=input-movie-title]").type("About alex");
      cy.get("[data-cy=btn-search-title]").click();
      cy.contains("The Truth About Alex").should("be.visible");
      cy.get("[data-cy=input-movie-title]").clear().type("jumbo");
      cy.get("[data-cy=btn-search-title]").click();
      
      // Click on the arrow button to go on the next page
      cy.get("[data-cy=btn-next-page]").click();
      cy.contains("Jumbo John").should("be.visible");
      cy.get("[data-cy=btn-previous-page]").click();
      cy.get("[data-cy=btn-first-page],[data-cy=btn-previous-page]").should('be.disabled')
      cy.get("[data-cy=btn-last-page]").click();
      cy.get("[data-cy=btn-last-page],[data-cy=btn-next-page]").should('be.disabled')
      cy.get('[data-cy=pagination-children]').children().should('have.length', 5)
      cy.get(".active_page").should('have.css', 'color', 'rgb(37, 136, 78)');
    })
})
