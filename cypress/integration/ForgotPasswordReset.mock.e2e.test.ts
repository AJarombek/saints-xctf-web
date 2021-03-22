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

    // By default, there is no validation warnings and the 'Change Password' button is disabled.
    cy.imageInputValidationCheck('password', 'none');
    cy.imageInputValidationCheck('confirm-password', 'none');
    cy.get('.aj-contained-button > button').contains('Change Password').should('have.attr', 'disabled');

    // Password too short and no confirm password.
    cy.get('.sxctf-image-input input[name="password"]').type('new');
    cy.imageInputValidationCheck('password', 'warning');
    cy.imageInputValidationCheck('confirm-password', 'warning');
    cy.get('.aj-contained-button > button').contains('Change Password').should('have.attr', 'disabled');

    // Valid password and no confirm password.
    cy.get('.sxctf-image-input input[name="password"]').type('_password');
    cy.imageInputValidationCheck('password', 'none');
    cy.imageInputValidationCheck('confirm-password', 'warning');
    cy.get('.aj-contained-button > button').contains('Change Password').should('have.attr', 'disabled');

    // Valid password, mismatching confirm password.
    cy.get('.sxctf-image-input input[name="confirm-password"]').type('password');
    cy.imageInputValidationCheck('password', 'none');
    cy.imageInputValidationCheck('confirm-password', 'warning');
    cy.get('.aj-contained-button > button').contains('Change Password').should('have.attr', 'disabled');

    // Valid password and confirm password.
    cy.get('.sxctf-image-input input[name="confirm-password"]').clear().type('new_password');
    cy.imageInputValidationCheck('password', 'none');
    cy.imageInputValidationCheck('confirm-password', 'none');
    cy.get('.aj-contained-button > button').contains('Change Password').should('not.have.attr', 'disabled');

    // No password, populated confirm password.
    cy.get('.sxctf-image-input input[name="password"]').clear();
    cy.imageInputValidationCheck('password', 'warning');
    cy.imageInputValidationCheck('confirm-password', 'warning');
    cy.get('.aj-contained-button > button').contains('Change Password').should('have.attr', 'disabled');

    // Valid password and confirm password.
    cy.get('.sxctf-image-input input[name="password"]').type('new_password');
    cy.imageInputValidationCheck('password', 'none');
    cy.imageInputValidationCheck('confirm-password', 'none');
    cy.get('.aj-contained-button > button').contains('Change Password').should('not.have.attr', 'disabled');
  });
});
