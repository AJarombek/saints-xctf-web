/**
 * E2E tests written with Cypress for the sign in page.  These E2E tests used mocked API calls.
 * @author Andrew Jarombek
 * @since 3/18/2021
 */

describe('Sign In Mock E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/signin');
    cy.clearLocalStorage(/user|token/);
    cy.mockAPI();
    cy.mockAuthAPI();
    cy.mockFnAPI();
  });

  it('shows errors for invalid sign in requests, navigates to the dashboard for a valid sign in', () => {
    cy.get('.sxctf-image-input input[name="username"]').type('invalid_username');
    cy.get('.sxctf-image-input input[name="password"]').type('invalid_password');

    cy.fixture('auth/token/invalid_user.json').as('invalidUserAuthToken');

    const invalidUserAuthTokenRoute = cy.route({
      method: 'POST',
      url: '**/auth/token',
      response: '@invalidUserAuthToken'
    });

    invalidUserAuthTokenRoute.as('invalidUserAuthTokenRoute');

    cy.get('.aj-contained-button').contains('Sign In').click();
    cy.wait('@invalidUserAuthTokenRoute');
  });
});
