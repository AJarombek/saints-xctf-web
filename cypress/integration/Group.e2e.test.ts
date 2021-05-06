// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/commands.d.ts" />

/**
 * E2E tests written with Cypress for group pages.
 * @author Andrew Jarombek
 * @since 5/5/2021
 */

describe('Group E2E Tests', () => {
  beforeEach(() => {
    cy.server();
    cy.setUserInLocalStorage();
    cy.setTokenInLocalStorage();
  });

  it("'Dashboard' header button navigates to the dashboard page", () => {
    cy.visit('/group/1');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/group/1`);
    cy.get('.dashboardButton').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/dashboard`);
  });

  it("'Profile' header button navigates to the signed in user's profile page", () => {
    cy.visit('/group/1');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/group/1`);
    cy.get('.profileButton').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/profile/andy`);
  });

  it("'Teams' header button navigates to the teams list page", () => {
    cy.visit('/group/1');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/group/1`);
    cy.get('.teamsButton').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/teams`);
  });

  it("'Sign Out' header button signs out the user and navigates to the home page", () => {
    cy.visit('/group/1');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/group/1`);
    cy.get('.signOutButton').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/`);
  });

  it('header title navigates to the dashboard page', () => {
    cy.visit('/group/1');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/group/1`);
    cy.get('h1').contains('SaintsXCTF').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/dashboard`);
  });

  it('header icon navigates to the dashboard page', () => {
    cy.visit('/group/1');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/group/1`);
    cy.get('.sxctf-nav-bar .sxctf-logo').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/dashboard`);
  });

  it.skip('has multiple tabs that can be navigated between', () => {});

  it.skip('has a default tab of paginated exercise logs', () => {});
});
