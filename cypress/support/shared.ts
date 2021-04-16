/**
 * Custom Cypress commands that are shared amongst many pages of the website.
 * @author Andrew Jarombek
 * @since 4/15/2021
 */

Cypress.Commands.add('paginationBarPageOne', () => {
  cy.get('#paginationBar').contains(1).should('exist');
  cy.get('#paginationBar').contains(2).should('exist');
  cy.get('#paginationBar').contains(3).should('exist');
  cy.get('#paginationBar').contains(4).should('not.exist');
  cy.get('#paginationBar').contains('...').should('not.exist');
});

Cypress.Commands.add('paginationBarPageThree', () => {
  cy.get('#paginationBar').contains(1).should('exist');
  cy.get('#paginationBar').contains(2).should('exist');
  cy.get('#paginationBar').contains(3).should('exist');
  cy.get('#paginationBar').contains(4).should('exist');
  cy.get('#paginationBar').contains(5).should('exist');
  cy.get('#paginationBar').contains(6).should('not.exist');
  cy.get('#paginationBar').contains('...').should('not.exist');
});

Cypress.Commands.add('paginationBarPageFive', () => {
  cy.get('#paginationBar').contains(1).should('exist');
  cy.get('#paginationBar').contains(2).should('not.exist');
  cy.get('#paginationBar').contains(3).should('exist');
  cy.get('#paginationBar').contains(4).should('exist');
  cy.get('#paginationBar').contains(5).should('exist');
  cy.get('#paginationBar').contains(6).should('exist');
  cy.get('#paginationBar').contains(7).should('exist');
  cy.get('#paginationBar').contains(8).should('not.exist');
  cy.get('#paginationBar').contains('...').should('exist');
});
