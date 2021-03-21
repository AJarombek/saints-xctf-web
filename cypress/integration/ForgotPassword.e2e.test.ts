/**
 * E2E tests written with Cypress for the forgot password page.
 * @author Andrew Jarombek
 * @since 3/20/2021
 */

describe('Forgot Password E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/forgotpassword');
  });

  it("'Home' header button navigates to the home page", () => {
    cy.url().should('include', '/forgotpassword');
    cy.get('.homeButton').click();
    cy.url().should('include', '/');
    cy.url().should('not.include', '/forgotpassword');
  });

  it("'Register' header button navigates to the registration page", () => {
    cy.url().should('include', '/forgotpassword');
    cy.get('.registerButton').click();
    cy.url().should('include', '/');
    cy.url().should('not.include', '/forgotpassword');
  });

  it("'Sign In' header button navigates to the sign in page", () => {
    cy.url().should('include', '/forgotpassword');
    cy.get('.signInButton').click();
    cy.url().should('include', '/');
    cy.url().should('not.include', '/forgotpassword');
  });

  it('header title navigates to the home page', () => {
    cy.url().should('include', '/forgotpassword');
    cy.get('h1').contains('SaintsXCTF').click();
    cy.url().should('include', '/');
    cy.url().should('not.include', '/forgotpassword');
  });

  it('header icon navigates to the home page', () => {
    cy.url().should('include', '/forgotpassword');
    cy.get('.sxctf-logo').click();
    cy.url().should('include', '/');
    cy.url().should('not.include', '/forgotpassword');
  });
});
