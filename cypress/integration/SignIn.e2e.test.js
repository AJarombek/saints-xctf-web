/**
 * E2E tests written with Cypress for the user sign in page.
 * @author Andrew Jarombek
 * @since 7/22/2020
 */

describe('Sign In E2E Tests', () => {

  beforeEach(() => {
    cy.visit('/signin');
  });

  it.skip('should sign in a user that supplies proper credentials', () => {
    cy.get('.sxctf-image-input input[name="username"]').type('andy');
    cy.get('.sxctf-image-input input[name="password"]').type('password');
    cy.get('.aj-contained-button').contains('Sign In').click();

    cy.url().should('include', '/dashboard');
  });

  it('forgot password link navigates to the forgot password page', () => {
    cy.get('a').contains('Forgot Password?').click();
    cy.url().should('include', '/forgotpassword');
  });
});
