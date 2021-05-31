/**
 * E2E tests written with Cypress for the edit log page when viewed on a mobile device.
 * @author Andrew Jarombek
 * @since 5/30/2021
 */

describe('Edit Log Mobile E2E Tests', () => {
  beforeEach(() => {
    cy.server();
    cy.viewport(400, 800);
    cy.setUserInLocalStorage();
    cy.setTokenInLocalStorage();

    cy.route('GET', '/api/v2/users/groups/andy').as('andyGroups');
    cy.route('GET', '/api/v2/logs/1').as('logOne');

    cy.visit('/log/edit/1');

    cy.wait('@andyGroups');
    cy.wait('@logOne');
  });

  it("'Dashboard' navbar dropdown link navigates to the dashboard page", () => {
    cy.url().should('equal', `${Cypress.config('baseUrl')}/log/edit/1`);
    cy.get('.sxctf-nav-hamburger').click();
    cy.get('.aj-nav-list-item').contains('Dashboard').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/dashboard`);
  });

  it("'Profile' navbar dropdown link navigates to the signed in users profile page", () => {
    cy.url().should('equal', `${Cypress.config('baseUrl')}/log/edit/1`);
    cy.get('.sxctf-nav-hamburger').click();
    cy.get('.aj-nav-list-item').contains('Profile').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/profile/andy`);
  });

  it("'Teams' navbar dropdown link navigates to the team list page", () => {
    cy.url().should('equal', `${Cypress.config('baseUrl')}/log/edit/1`);
    cy.get('.sxctf-nav-hamburger').click();
    cy.get('.aj-nav-list-item').contains('Teams').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/teams`);
  });

  it("'Create New Log' navbar dropdown link navigates to the new log page", () => {
    cy.url().should('equal', `${Cypress.config('baseUrl')}/log/edit/1`);
    cy.get('.sxctf-nav-hamburger').click();
    cy.get('.aj-nav-list-item').contains('Create New Log').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/log/new`);
  });

  it("'Admin' navbar dropdown link navigates to the admin list page", () => {
    cy.url().should('equal', `${Cypress.config('baseUrl')}/log/edit/1`);
    cy.get('.sxctf-nav-hamburger').click();
    cy.get('.aj-nav-list-item').contains('Admin').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/admin`);
  });

  it("'Sign Out' navbar dropdown link signs the user out and navigates to the home page", () => {
    cy.url().should('equal', `${Cypress.config('baseUrl')}/log/edit/1`);
    cy.get('.sxctf-nav-hamburger').click();
    cy.get('.aj-nav-list-item').contains('Sign Out').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/`);
  });
});
