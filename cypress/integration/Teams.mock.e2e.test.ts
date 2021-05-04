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

  it('shows lists of all the groups in teams that a user is an accepted member of', () => {
    cy.visit('/teams');

    cy.wait('@userMembershipsAndyRoute');
    cy.wait('@userGroupsAndyRoute');
    cy.wait('@teamGroupsSaintsXCTFRoute');

    cy.getDataCy('teamItem').should('have.length', 1);
    cy.getDataCy('teamItem').find('h4').should('contain.text', 'St. Lawrence Cross Country and Track & Field');

    cy.getDataCy('teamItem').eq(0).findDataCy('groupItem').should('have.length', 5);
    cy.getDataCy('teamItem').eq(0).findDataCy('groupItem').eq(0).should('contain.text', 'Alumni');
    cy.getDataCy('teamItem').eq(0).findDataCy('groupItem').eq(1).should('contain.text', "Men's Track & Field");
    cy.getDataCy('teamItem').eq(0).findDataCy('groupItem').eq(2).should('contain.text', "Men's Cross Country");
    cy.getDataCy('teamItem').eq(0).findDataCy('groupItem').eq(3).should('contain.text', "Women's Track & Field");
    cy.getDataCy('teamItem').eq(0).findDataCy('groupItem').eq(4).should('contain.text', "Women's Cross Country");
  });

  it.only('shows an error if an API call to get memberships fails', () => {
    const userMembershipsErrorRoute = cy.route({
      method: 'GET',
      url: '**/api/v2/users/memberships/andy',
      response: {
        memberships: null,
        self: '/v2/users/memberships/andy',
        error: 'An unexpected error occurred.'
      },
      status: 500
    });

    userMembershipsErrorRoute.as('userMembershipsErrorRoute');

    cy.visit('/teams');

    cy.wait('@userMembershipsErrorRoute');
    cy.wait('@userGroupsAndyRoute');

    cy.getDataCy('teamItem').should('not.exist');
    cy.getDataCy('alert').should('exist');
    cy.getDataCy('alert').should(
      'contain.text',
      'An error occurred retrieving team and group memberships.  Refresh the page to try again.'
    );
  });
});
