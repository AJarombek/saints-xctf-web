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
