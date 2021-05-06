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

  it.only('has multiple tabs that can be navigated between', () => {
    cy.visit('/group/1');
    cy.groupRouteAliases();
    cy.groupAPICalls();

    // The default tab is the exercise logs tab.
    cy.get('section #logFeed').should('exist');
    cy.get('section #groupMembers').should('not.exist');
    cy.get('section #leaderboard').should('not.exist');
    cy.get('section #groupDetails').should('not.exist');

    cy.get('.tabs p').contains('Members').click();
    cy.get('section #logFeed').should('not.exist');
    cy.get('section #groupMembers').should('exist');
    cy.get('section #leaderboard').should('not.exist');
    cy.get('section #groupDetails').should('not.exist');

    cy.route('GET', '/api/v2/groups/leaderboard/1').as('alumniLeaderboard');

    cy.get('.tabs p').contains('Leaderboard').click();
    cy.wait('@alumniLeaderboard');
    cy.get('section #logFeed').should('not.exist');
    cy.get('section #groupMembers').should('not.exist');
    cy.get('section #leaderboard').should('exist');
    cy.get('section #groupDetails').should('not.exist');

    cy.route('GET', '/api/v2/groups/statistics/1').as('alumniStatistics');

    cy.get('.tabs p').contains('Details').click();
    cy.wait('@alumniStatistics');
    cy.get('section #logFeed').should('not.exist');
    cy.get('section #groupMembers').should('not.exist');
    cy.get('section #leaderboard').should('not.exist');
    cy.get('section #groupDetails').should('exist');
  });

  it('has a default tab of paginated exercise logs', () => {
    cy.visit('/group/1');
    cy.groupRouteAliases();
    cy.groupAPICalls();

    cy.get('#logFeed .exerciseLog').should('have.length', 10);

    cy.route('GET', '/api/v2/log_feed/group/1/10/10').as('alumniLogFeedPageTwo');
    cy.get('#paginationBar').contains(2).click();
    cy.wait('@alumniLogFeedPageTwo');

    cy.get('#logFeed .exerciseLog').should('have.length', 10);

    cy.route('GET', '/api/v2/log_feed/group/1/10/20').as('alumniLogFeedPageThree');
    cy.get('#paginationBar').contains(3).click();
    cy.wait('@alumniLogFeedPageThree');

    cy.get('#logFeed .exerciseLog').should('have.length', 10);
  });
});
