/**
 * E2E tests written with Cypress for group pages when viewed on a mobile device.
 * @author Andrew Jarombek
 * @since 5/29/2021
 */

describe('Group Mobile E2E Tests', () => {
  beforeEach(() => {
    cy.server();
    cy.viewport(400, 800);
    cy.setUserInLocalStorage();
    cy.setTokenInLocalStorage();

    cy.visit('/group/1');
    cy.groupRouteAliases();
    cy.groupAPICalls();
  });

  it("'Dashboard' navbar dropdown link navigates to the dashboard page", () => {
    cy.url().should('equal', `${Cypress.config('baseUrl')}/group/1`);
    cy.get('.sxctf-nav-hamburger').click();
    cy.get('.aj-nav-list-item').contains('Dashboard').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/dashboard`);
  });

  it("'Profile' navbar dropdown link navigates to the signed in users profile page", () => {
    cy.url().should('equal', `${Cypress.config('baseUrl')}/group/1`);
    cy.get('.sxctf-nav-hamburger').click();
    cy.get('.aj-nav-list-item').contains('Profile').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/profile/andy`);
  });

  it("'Teams' navbar dropdown link navigates to the team list page", () => {
    cy.url().should('equal', `${Cypress.config('baseUrl')}/group/1`);
    cy.get('.sxctf-nav-hamburger').click();
    cy.get('.aj-nav-list-item').contains('Teams').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/teams`);
  });

  it("'Create New Log' navbar dropdown link navigates to the new log page", () => {
    cy.url().should('equal', `${Cypress.config('baseUrl')}/group/1`);
    cy.get('.sxctf-nav-hamburger').click();
    cy.get('.aj-nav-list-item').contains('Create New Log').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/log/new`);
  });

  it("'Admin' navbar dropdown link navigates to the admin list page", () => {
    cy.url().should('equal', `${Cypress.config('baseUrl')}/group/1`);
    cy.get('.sxctf-nav-hamburger').click();
    cy.get('.aj-nav-list-item').contains('Admin').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/admin`);
  });

  it("'Sign Out' navbar dropdown link signs the user out and navigates to the home page", () => {
    cy.url().should('equal', `${Cypress.config('baseUrl')}/group/1`);
    cy.get('.sxctf-nav-hamburger').click();
    cy.get('.aj-nav-list-item').contains('Sign Out').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/`);
  });
});
