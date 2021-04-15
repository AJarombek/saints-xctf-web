// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/shared.d.ts" />

/**
 * E2E tests written with Cypress for a user's profile page.  These E2E tests use mocked API calls.
 * @author Andrew Jarombek
 * @since 4/14/2021
 */

describe('Profile Mock E2E Tests', () => {
  beforeEach(() => {
    cy.mockAPI();
    cy.mockAuthAPI();
    cy.mockFnAPI();
    cy.setUserInLocalStorage();
    cy.setMockTokenInLocalStorage();
  });

  it.only('has a tab with a calendar of monthly exercise logs', () => {
    cy.visit('/profile/andy');

    cy.wait('@userMembershipsAndyRoute');
    cy.wait('@userFlairAndyRoute');
    cy.wait('@userGroupsAndyRoute');
    cy.wait('@logFeedUserAndyPageOneRoute');

    cy.get('#logFeed .exerciseLog').should('have.length', 10);
    cy.getDataCyContains('exerciseLogUser', 'Andy Jarombek').should('have.length', 10);

    cy.paginationBarPageOne();
  });
});
