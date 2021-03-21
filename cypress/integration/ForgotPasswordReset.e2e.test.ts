/**
 * E2E tests written with Cypress for the forgot password - reset password page.
 * @author Andrew Jarombek
 * @since 3/21/2021
 */

describe('Forgot Password Reset E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/forgotpassword/reset');
  });

  it("'Home' header button navigates to the home page", () => {
    cy.url().should('include', '/forgotpassword/reset');
    cy.get('.homeButton').click();
    cy.url().should('include', '/');
    cy.url().should('not.include', '/forgotpassword/reset');
  });

  it("'Register' header button navigates to the registration page", () => {
    cy.url().should('include', '/forgotpassword/reset');
    cy.get('.registerButton').click();
    cy.url().should('include', '/');
    cy.url().should('not.include', '/forgotpassword/reset');
  });

  it("'Sign In' header button navigates to the sign in page", () => {
    cy.url().should('include', '/forgotpassword/reset');
    cy.get('.signInButton').click();
    cy.url().should('include', '/');
    cy.url().should('not.include', '/forgotpassword/reset');
  });

  it('header title navigates to the home page', () => {
    cy.url().should('include', '/forgotpassword/reset');
    cy.get('h1').contains('SaintsXCTF').click();
    cy.url().should('include', '/');
    cy.url().should('not.include', '/forgotpassword/reset');
  });

  it('header icon navigates to the home page', () => {
    cy.url().should('include', '/forgotpassword/reset');
    cy.get('.sxctf-logo').click();
    cy.url().should('include', '/');
    cy.url().should('not.include', '/forgotpassword/reset');
  });
});
