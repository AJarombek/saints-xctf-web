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

  it.only('allows users to enter their forgot password code after its been created', () => {
    cy.sendForgotPasswordCode();
    cy.getDataCy('forgotPasswordEnterCode').click();
    cy.get('.sxctf-image-input input[name="code"]').clear().type('80un02');
    cy.get('.aj-contained-button').contains('Submit').click();
    cy.wait('@forgotPasswordValidate80un02Route');
  });
});
