/**
 * E2E tests written with Cypress for the edit exercise log page.
 * @author Andrew Jarombek
 * @since 5/30/2021
 */

describe('Edit Log E2E Tests', () => {
  beforeEach(() => {
    cy.server();
    cy.setUserInLocalStorage();
    cy.setTokenInLocalStorage();

    cy.route('GET', '/api/v2/users/groups/andy').as('andyGroups');
    cy.route('GET', '/api/v2/logs/1').as('logOne');

    cy.visit('/log/edit/1');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/log/edit/1`);

    cy.wait('@andyGroups');
    cy.wait('@logOne');
  });

  it("'Dashboard' header button navigates to the dashboard page", () => {
    cy.get('.dashboardButton').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/dashboard`);
  });

  it("'Profile' header button navigates to the signed in user's profile page", () => {
    cy.get('.profileButton').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/profile/andy`);
  });

  it("'Teams' header button navigates to the teams list page", () => {
    cy.get('.teamsButton').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/teams`);
  });

  it("'Sign Out' header button signs out the user and navigates to the home page", () => {
    cy.get('.signOutButton').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/`);
  });

  it('header title navigates to the dashboard page', () => {
    cy.get('h1').contains('SaintsXCTF').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/dashboard`);
  });

  it('header icon navigates to the dashboard page', () => {
    cy.get('.sxctf-nav-bar .sxctf-logo').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/dashboard`);
  });
});
