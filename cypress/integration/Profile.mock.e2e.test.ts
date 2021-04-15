/**
 * E2E tests written with Cypress for a user's profile page.  These E2E tests use mocked API calls.
 * @author Andrew Jarombek
 * @since 4/14/2021
 */

describe('Profile Mock E2E Tests', () => {
  beforeEach(() => {
    cy.mockAPI();
    cy.mockAuthAPI();
    cy.mockFnAPI();
    cy.setUserInLocalStorage();
    cy.setMockTokenInLocalStorage();
    cy.visit('/profile/andy');
  });

  it.skip('has a tab with a calendar of monthly exercise logs', () => {

  });
});
