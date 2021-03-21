// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/forgotPassword.d.ts" />

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
    cy.sendForgotPasswordCode();
  });

  it('allows users to enter their forgot password code after its been created', () => {
    cy.sendForgotPasswordCode();
    cy.getDataCy('forgotPasswordEnterCode').click();
    cy.get('.sxctf-image-input input[name="code"]').clear().type('80un02');
    cy.get('.aj-contained-button').contains('Submit').click();
    cy.wait('@forgotPasswordValidate80un02Route');
  });

  it('shows a warning if an invalid forgot password code is entered', () => {
    cy.sendForgotPasswordCode();
    cy.getDataCy('forgotPasswordEnterCode').click();
    cy.get('.sxctf-image-input input[name="code"]').clear().type('invalid');
    cy.get('.aj-contained-button').contains('Submit').click();
    cy.wait('@forgotPasswordValidateInvalidRoute');
    cy.imageInputValidationCheck('code', 'failure');
  });

  it('able to request another code', () => {
    cy.sendForgotPasswordCode();
    cy.getDataCy('forgotPasswordEnterCode').click();
    cy.url().should('include', '/forgotpassword/reset');
    cy.getDataCy('requestCode').click();
    cy.url().should('include', '/forgotpassword');
    cy.sendForgotPasswordCode();
    cy.getDataCy('forgotPasswordEnterCode').click();
    cy.url().should('include', '/forgotpassword/reset');
  });

  it('able to cancel forgot password code validation', () => {
    cy.sendForgotPasswordCode();
    cy.getDataCy('forgotPasswordEnterCode').click();
    cy.url().should('include', '/forgotpassword/reset');
    cy.get('.aj-text-button').contains('Cancel').click();
    cy.url().should('not.include', '/forgotpassword/reset');
    cy.url().should('include', '/');
  });

  it('able to cancel password reset', () => {
    cy.sendForgotPasswordCode();
    cy.getDataCy('forgotPasswordEnterCode').click();
    cy.url().should('include', '/forgotpassword/reset');
    cy.get('.sxctf-image-input input[name="code"]').clear().type('80un02');
    cy.get('.aj-contained-button').contains('Submit').click();
    cy.wait('@forgotPasswordValidate80un02Route');
    cy.get('.aj-text-button').contains('Cancel').click();
    cy.url().should('not.include', '/forgotpassword/reset');
    cy.url().should('include', '/');
  });

  it('able to change a users password with the forgot password code', () => {
    cy.sendForgotPasswordCode();
    cy.getDataCy('forgotPasswordEnterCode').click();
    cy.url().should('include', '/forgotpassword/reset');
    cy.get('.sxctf-image-input input[name="code"]').clear().type('80un02');
    cy.get('.aj-contained-button').contains('Submit').click();
    cy.wait('@forgotPasswordValidate80un02Route');

    cy.get('.sxctf-image-input input[name="password"]').type('new_password');
    cy.get('.sxctf-image-input input[name="confirm-password"]').type('new_password');
    cy.get('.aj-contained-button').contains('Change Password').click();
    cy.wait('@userChangePasswordAndyRoute');

    cy.getDataCy('passwordResetSuccessMessage').should('contain.text', 'Your password was successfully changed.');
    cy.getDataCy('passwordRestSignIn').click();
    cy.url().should('include', '/signin');
  });
});
