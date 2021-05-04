// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/commands.d.ts" />

/**
 * E2E tests written with Cypress for the teams list page.
 * @author Andrew Jarombek
 * @since 5/3/2021
 */

describe('Teams E2E Tests', () => {
  beforeEach(() => {
    cy.server();
    cy.setUserInLocalStorage();
    cy.setTokenInLocalStorage();
  });

  it.only("'Dashboard' header button navigates to the dashboard page", () => {
    cy.visit('/teams');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/teams`);
    cy.get('.dashboardButton').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/dashboard`);
  });

  it.only("'Profile' header button navigates to the signed in user's profile page", () => {
    cy.visit('/teams');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/teams`);
    cy.get('.profileButton').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/profile/andy`);
  });

  it.only("'Sign Out' header button signs out the user and navigates to the home page", () => {
    cy.visit('/teams');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/teams`);
    cy.get('.signOutButton').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/`);
  });

  it.only('header title navigates to the dashboard page', () => {
    cy.visit('/teams');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/teams`);
    cy.get('h1').contains('SaintsXCTF').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/dashboard`);
  });

  it.only('header icon navigates to the dashboard page', () => {
    cy.visit('/teams');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/teams`);
    cy.get('.sxctf-nav-bar .sxctf-logo').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/dashboard`);
  });
});
