/**
 * E2E tests written with Cypress for the group admin page.
 * @author Andrew Jarombek
 * @since 5/10/2021
 */

describe('Group Admin E2E Tests', () => {
  beforeEach(() => {
    cy.server();
    cy.setUserInLocalStorage();
    cy.setTokenInLocalStorage();
  });
});
