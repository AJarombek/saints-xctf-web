/**
 * E2E tests written with Cypress for the log creation page.  These E2E tests use mocked API calls.
 * @author Andrew Jarombek
 * @since 4/2/2021
 */

describe('New Log Mock E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/log/new');
    cy.clearLocalStorage(/user|token/);
    cy.mockAPI();
    cy.mockAuthAPI();
    cy.mockFnAPI();
  });

  it.skip('shows an error modal if log creation fails', () => {});
});
