/**
 * E2E tests written with Cypress for the register page when viewed on a mobile device.
 * @author Andrew Jarombek
 * @since 5/29/2021
 */

describe('Register Mobile E2E Tests', () => {
  beforeEach(() => {
    cy.viewport(400, 800);
    cy.visit('/register');
  });

  it("'Home' navbar dropdown link navigates to the home page", () => {
    cy.url().should('equal', `${Cypress.config('baseUrl')}/register`);
    cy.get('.sxctf-nav-hamburger').click();
    cy.get('.aj-nav-list-item').contains('Home').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/`);
  });

  it("'Sign In' navbar dropdown link navigates to the sign in page", () => {
    cy.url().should('equal', `${Cypress.config('baseUrl')}/register`);
    cy.get('.sxctf-nav-hamburger').click();
    cy.get('.aj-nav-list-item').contains('Sign In').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/signin`);
  });
});
