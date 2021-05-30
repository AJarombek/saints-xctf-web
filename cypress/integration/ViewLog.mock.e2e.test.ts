/**
 * E2E tests written with Cypress for the log view page.  These E2E tests use mocked API calls.
 * @author Andrew Jarombek
 * @since 5/30/2021
 */

describe('New Log Mock E2E Tests', () => {
  beforeEach(() => {
    cy.mockAPI();
    cy.mockAuthAPI();
    cy.mockFnAPI();
    cy.setUserInLocalStorage();
    cy.setMockTokenInLocalStorage();
  });

  it('shows an error modal if log creation fails', () => {
    cy.visit('/log/view/1');
    cy.wait('@logGet1Route');

    cy.get('.exerciseLog').should('exist').should('have.length', 1);
    cy.get('.commentList').should('exist');
    cy.get('.comment').should('exist').should('have.length', 1);
  });
});
