/**
 * E2E tests written with Cypress for the registration page.
 * @author Andrew Jarombek
 * @since 7/22/2020
 */

describe('Register E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it("'Home' header button navigates to the home page", () => {
    cy.url().should('include', '/register');
    cy.get('.homeButton').click();
    cy.url().should('include', '/');
    cy.url().should('not.include', '/register');
  });

  it("'Sign In' header button navigates to the sign in page", () => {
    cy.url().should('include', '/register');
    cy.get('.signInButton').click();
    cy.url().should('include', '/signin');
  });

  it('header title navigates to the home page', () => {
    cy.url().should('include', '/register');
    cy.get('h1').contains('SaintsXCTF').click();
    cy.url().should('include', '/');
    cy.url().should('not.include', '/register');
  });

  it('header icon navigates to the home page', () => {
    cy.url().should('include', '/register');
    cy.get('.sxctf-logo').click();
    cy.url().should('include', '/');
    cy.url().should('not.include', '/register');
  });
});
