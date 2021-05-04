// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/shared.d.ts" />

/**
 * E2E tests written with Cypress for the team list page.  These E2E tests use mocked API calls.
 * @author Andrew Jarombek
 * @since 5/3/2021
 */

describe('Team Mock E2E Tests', () => {
  beforeEach(() => {
    cy.mockAPI();
    cy.mockAuthAPI();
    cy.mockFnAPI();
    cy.setUserInLocalStorage();
    cy.setMockTokenInLocalStorage();
  });

  it('shows the proper list of teams', () => {
    cy.visit('/teams');

    cy.wait('@userMembershipsAndyRoute');
    cy.wait('@userGroupsAndyRoute');
    cy.wait('@teamGroupsSaintsXCTFRoute');
  });
});
