/**
 * E2E tests written with Cypress for the admin page.
 * @author Andrew Jarombek
 * @since 5/9/2021
 */

describe('Admin E2E Tests', () => {
  beforeEach(() => {
    cy.server();
    cy.setUserInLocalStorage();
    cy.setTokenInLocalStorage();
  });
});
