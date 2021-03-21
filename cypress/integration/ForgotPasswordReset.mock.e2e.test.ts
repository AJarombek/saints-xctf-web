/**
 * E2E tests written with Cypress for the forgot password - reset password page.  These E2E tests used mocked API calls.
 * @author Andrew Jarombek
 * @since 3/21/2021
 */

describe('Forgot Password Reset Mock E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/forgotpassword/reset');
    cy.clearLocalStorage(/user|token/);
    cy.mockAPI();
    cy.mockAuthAPI();
    cy.mockFnAPI();
  });

  it('new password fields have proper validation', () => {
    cy.get('.sxctf-image-input input[name="code"]').clear().type('80un02');
    cy.get('.aj-contained-button').contains('Submit').click();
    cy.wait('@forgotPasswordValidate80un02Route');

    cy.get('.sxctf-image-input input[name="password"]').type('new_password');
    cy.get('.sxctf-image-input input[name="confirm-password"]').type('password');
  });
});
