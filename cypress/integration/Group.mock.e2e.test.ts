// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/shared.d.ts" />

/**
 * E2E tests written with Cypress for the group pages.  These E2E tests use mocked API calls.
 * @author Andrew Jarombek
 * @since 5/5/2021
 */

describe('Group Mock E2E Tests', () => {
  beforeEach(() => {
    cy.mockAPI();
    cy.mockAuthAPI();
    cy.mockFnAPI();
    cy.setUserInLocalStorage();
    cy.setMockTokenInLocalStorage();
  });

  it.only('lists all the members of a group', () => {
    cy.visit('/group/1');

    cy.wait('@groupAlumniRoute');
    cy.wait('@groupAlumniMembersRoute');
    cy.wait('@logFeedGroupAlumniPageOneRoute');
    cy.wait('@userGroupsAndyRoute');
  });

  it.skip('navigates to user profiles from the member list', () => {});

  it.skip('leaderboard displays properly with all filters', () => {});

  it.skip('statistics display as expected', () => {});

  it.skip('displays as member if the user is a standard member of the group', () => {});

  it.skip('displays as administrator if the user is an admin of the group', () => {});

  it.skip("displays as pending if the user's membership is not approved yet", () => {});

  it.skip('displays as non member if the user has no membership to the group', () => {});
});
