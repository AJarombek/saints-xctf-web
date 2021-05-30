/**
 * E2E tests written with Cypress for the view exercise log page.
 * @author Andrew Jarombek
 * @since 5/29/2021
 */

describe('View Log E2E Tests', () => {
  beforeEach(() => {
    cy.server();
    cy.setUserInLocalStorage();
    cy.setTokenInLocalStorage();
  });

  it("'Profile' header button navigates to the signed in user's profile page", () => {
    cy.route('GET', '/api/v2/users/groups/andy').as('andyGroups');

    cy.visit('/log/view/1');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/log/view/1`);
    cy.wait('@andyGroups');
    cy.get('.profileButton').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/profile/andy`);
  });

  it("'Teams' header button navigates to the teams list page", () => {
    cy.route('GET', '/api/v2/users/groups/andy').as('andyGroups');

    cy.visit('/log/view/1');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/log/view/1`);
    cy.wait('@andyGroups');
    cy.get('.teamsButton').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/teams`);
  });

  it("'Sign Out' header button signs out the user and navigates to the home page", () => {
    cy.route('GET', '/api/v2/users/groups/andy').as('andyGroups');

    cy.visit('/log/view/1');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/log/view/1`);
    cy.wait('@andyGroups');
    cy.get('.signOutButton').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/`);
  });

  it('header title navigates to the dashboard page', () => {
    cy.route('GET', '/api/v2/users/groups/andy').as('andyGroups');

    cy.visit('/log/view/1');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/log/view/1`);
    cy.wait('@andyGroups');
    cy.get('h1').contains('SaintsXCTF').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/dashboard`);
  });

  it('header icon navigates to the dashboard page', () => {
    cy.route('GET', '/api/v2/users/groups/andy').as('andyGroups');

    cy.visit('/log/view/1');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/log/view/1`);
    cy.wait('@andyGroups');
    cy.get('.sxctf-nav-bar .sxctf-logo').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/dashboard`);
  });
});
