/**
 * E2E tests written with Cypress for the user sign in page.
 * @author Andrew Jarombek
 * @since 7/22/2020
 */

describe('Sign In E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/signin');
  });

  it("'Home' header button navigates to the home page", () => {
    cy.url().should('include', '/signin');
    cy.get('.homeButton').click();
    cy.url().should('include', '/');
    cy.url().should('not.include', '/signin');
  });

  it("'Register' header button navigates to the registration page", () => {
    cy.url().should('include', '/signin');
    cy.get('.registerButton').click();
    cy.url().should('include', '/register');
  });

  it('header title navigates to the home page', () => {
    cy.url().should('include', '/signin');
    cy.get('h1').contains('SaintsXCTF').click();
    cy.url().should('include', '/');
    cy.url().should('not.include', '/signin');
  });

  it('header icon navigates to the home page', () => {
    cy.url().should('include', '/signin');
    cy.get('.sxctf-logo').click();
    cy.url().should('include', '/');
    cy.url().should('not.include', '/signin');
  });

  it("clicking 'Create Account' navigates to the register page", () => {
    cy.url().should('include', '/signin');
    cy.get('button').contains('Create Account').click();
    cy.url().should('include', '/register');
  });

  it.only('should sign in a user that supplies proper credentials', () => {
    cy.get('.sxctf-image-input input[name="username"]').type('andy');
    cy.get('.sxctf-image-input input[name="password"]').type(Cypress.env('SXCTF_PASSWORD'));
    cy.get('.aj-contained-button').contains('Sign In').click();

    cy.url().should('include', '/dashboard');
  });

  it.only('displays an error message if a user supplies invalid credentials', () => {
    cy.get('.sxctf-image-input input[name="username"]').type('invalid_username');
    cy.get('.sxctf-image-input input[name="password"]').type('invalid_password');
    cy.get('.aj-contained-button').contains('Sign In').click();

    cy.get('.sxctf-image-input input[name="username"]').clear().type('andy');
    cy.get('.aj-contained-button').contains('Sign In').click();
  });

  it('forgot password link navigates to the forgot password page', () => {
    cy.get('a').contains('Forgot Password?').click();
    cy.url().should('include', '/forgotpassword');
  });
});
