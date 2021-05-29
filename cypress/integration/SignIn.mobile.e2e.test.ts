/**
 * E2E tests written with Cypress for the sign in page when viewed on a mobile device.
 * @author Andrew Jarombek
 * @since 5/29/2021
 */

describe('Sign In Mobile E2E Tests', () => {
  beforeEach(() => {
    cy.viewport(400, 800);
    cy.visit('/signin');
  });

  it("'Home' navbar dropdown link navigates to the home page", () => {
    cy.url().should('equal', `${Cypress.config('baseUrl')}/signin`);
    cy.get('.sxctf-nav-hamburger').click();
    cy.get('.aj-nav-list-item').contains('Home').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/`);
  });

  it("'Register' navbar dropdown link navigates to the register page", () => {
    cy.url().should('equal', `${Cypress.config('baseUrl')}/signin`);
    cy.get('.sxctf-nav-hamburger').click();
    cy.get('.aj-nav-list-item').contains('Register').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/register`);
  });
});
