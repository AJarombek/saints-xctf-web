/**
 * E2E tests written with Cypress for the dashboard page once a user is signed in.  These E2E tests used mocked API
 * calls.
 * @author Andrew Jarombek
 * @since 10/18/2020
 */

describe('Dashboard Mock E2E Tests', () => {
  beforeEach(() => {
    cy.mockAPI();
    cy.mockAuth();
    cy.setUserInLocalStorage();
    cy.setTokenInLocalStorage();
  });

  it('can delete a log', () => {
    cy.visit('/dashboard');
    cy.wait('@logFeedAllPageOneRoute');
    cy.get('#logFeed .exerciseLog').eq(0).trigger('mouseover')
    cy.get('#logFeed .exerciseLog').eq(0).find('.options').click();
    cy.get('#logFeed .exerciseLog').eq(0).find('.delete').click();
  });
});
