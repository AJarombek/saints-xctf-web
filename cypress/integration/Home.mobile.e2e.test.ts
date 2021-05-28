/**
 * E2E tests written with Cypress for the application home page.
 * @author Andrew Jarombek
 * @since 5/27/2021
 */

describe('Home Mobile E2E Tests', () => {
  beforeEach(() => {
    cy.viewport(400, 800);
    cy.visit('/');
  });

  it("'About' navbar dropdown link navigates down to the 'About' section", () => {
    cy.url().should('equal', `${Cypress.config('baseUrl')}/`);
    cy.get('.sxctf-nav-hamburger').click();
    cy.get('.aj-nav-list-item').contains('About').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/#about`);
  });

  it("'Testimonials' navbar dropdown link navigates down to the 'Testimonials' section", () => {
    cy.url().should('equal', `${Cypress.config('baseUrl')}/`);
    cy.get('.sxctf-nav-hamburger').click();
    cy.get('.aj-nav-list-item').contains('Testimonials').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/#testimonials`);
  });

  it("'Register' navbar dropdown link navigates to the register page", () => {
    cy.url().should('equal', `${Cypress.config('baseUrl')}/`);
    cy.get('.sxctf-nav-hamburger').click();
    cy.get('.aj-nav-list-item').contains('Register').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/register`);
  });

  it("'Sign In' navbar dropdown link navigates to the sign in page", () => {
    cy.url().should('equal', `${Cypress.config('baseUrl')}/`);
    cy.get('.sxctf-nav-hamburger').click();
    cy.get('.aj-nav-list-item').contains('Sign In').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/signin`);
  });
});
