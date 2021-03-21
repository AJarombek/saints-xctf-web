/**
 * E2E tests written with Cypress for the forgot password pages.  These E2E tests used mocked API calls.
 * @author Andrew Jarombek
 * @since 3/20/2021
 */

describe('Forgot Password Mock E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/forgotpassword');
    cy.clearLocalStorage(/user|token/);
    cy.mockAPI();
    cy.mockAuthAPI();
    cy.mockFnAPI();
  });

  it('sends a forgot password code if a valid username is entered', () => {
    cy.get('.sxctf-image-input input[name="email"]').type('andrew@jarombek.com');
    cy.get('.aj-contained-button').contains('Send').click();
    cy.wait('@forgotPasswordPostAndyRoute');

    cy.getDataCy('forgotPasswordEmailSent').should(
      'contain.text',
      'An email was sent to your email address with a forgot password code.'
    );
  });
});
