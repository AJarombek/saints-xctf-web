/**
 * E2E tests written with Cypress for the dashboard page once a user is signed in.  These E2E tests used mocked API calls.
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
});