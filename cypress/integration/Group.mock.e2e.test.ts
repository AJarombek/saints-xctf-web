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

  it('lists all the members of a group', () => {
    cy.visit('/group/1');
    cy.alumniGroupMockAPICalls();

    cy.getDataCy('pictureTitle').should('contain.text', 'Alumni');
    cy.getDataCy('pictureSubTitle').should('contain.text', 'Members: 4');

    cy.get('.tabs p').contains('Members').click();

    cy.getDataCy('groupMember').should('have.length', 4);
    cy.getDataCy('groupMember')
      .eq(0)
      .should('contain.text', 'Andy Jarombek')
      .should('contain.text', 'Member Since: Dec 23rd, 2016');
    cy.getDataCy('groupMember')
      .eq(1)
      .should('contain.text', 'Benjamin Fishbein')
      .should('contain.text', 'Member Since: Dec 26th, 2016');
    cy.getDataCy('groupMember')
      .eq(2)
      .should('contain.text', 'Joseph Smith')
      .should('contain.text', 'Member Since: Dec 23rd, 2016');
    cy.getDataCy('groupMember')
      .eq(3)
      .should('contain.text', 'Lisa Grohn')
      .should('contain.text', 'Member Since: Dec 24th, 2016');
  });

  it('navigates to user profiles from the member list', () => {
    cy.visit('/group/1');
    cy.alumniGroupMockAPICalls();

    cy.get('.tabs p').contains('Members').click();

    cy.getDataCy('groupMember').should('have.length', 4);
    cy.getDataCy('groupMember')
      .eq(0)
      .should('contain.text', 'Andy Jarombek')
      .should('contain.text', 'Member Since: Dec 23rd, 2016');

    cy.getDataCy('groupMember').eq(0).click();

    cy.wait('@userMembershipsAndyRoute');
    cy.wait('@userFlairAndyRoute');
    cy.wait('@logFeedUserAndyPageOneRoute');

    cy.url().should('equal', `${Cypress.config('baseUrl')}/profile/andy`);
  });

  it('leaderboard displays properly with all filters', () => {
    cy.visit('/group/1');
    cy.alumniGroupMockAPICalls();

    // I hope you are doing okay.  Still feeling sick, so sadly will have to reschedule my 2nd vaccine appointment.

    cy.get('.tabs p').contains('Leaderboard').click();
    cy.groupLeaderboardFiltersSelected(true, false, false, false);
    cy.get('.leaderboardInterval').should('contain.text', 'All Time');

    cy.getDataCy('leaderboardItem').should('have.length', 4);
    cy.getDataCy('leaderboardItem').eq(0).should('contain.text', 'Andy Jarombek');
    cy.getDataCy('leaderboardItem').eq(0).findDataCy('leaderboardItemValue').should('contain.text', '2737.88');
    cy.getDataCy('leaderboardItem').eq(1).should('contain.text', 'Benjamin Fishbein');
    cy.getDataCy('leaderboardItem').eq(1).findDataCy('leaderboardItemValue').should('contain.text', '621.50');
    cy.getDataCy('leaderboardItem').eq(2).should('contain.text', 'Joseph Smith');
    cy.getDataCy('leaderboardItem').eq(2).findDataCy('leaderboardItemValue').should('contain.text', '175.25');
    cy.getDataCy('leaderboardItem').eq(3).should('contain.text', 'Lisa Grohn');
    cy.getDataCy('leaderboardItem').eq(3).findDataCy('leaderboardItemValue').should('contain.text', '5.00');

    cy.get('.leaderboardFilterButtons button').contains('Bike').click();
    cy.groupLeaderboardFiltersSelected(true, true, false, false);

    cy.getDataCy('leaderboardItem').should('have.length', 4);
    cy.getDataCy('leaderboardItem').eq(0).should('contain.text', 'Andy Jarombek');
    cy.getDataCy('leaderboardItem').eq(0).findDataCy('leaderboardItemValue').should('contain.text', '2812.88');
    cy.getDataCy('leaderboardItem').eq(1).should('contain.text', 'Benjamin Fishbein');
    cy.getDataCy('leaderboardItem').eq(1).findDataCy('leaderboardItemValue').should('contain.text', '746.50');
    cy.getDataCy('leaderboardItem').eq(2).should('contain.text', 'Joseph Smith');
    cy.getDataCy('leaderboardItem').eq(2).findDataCy('leaderboardItemValue').should('contain.text', '175.25');
    cy.getDataCy('leaderboardItem').eq(3).should('contain.text', 'Lisa Grohn');
    cy.getDataCy('leaderboardItem').eq(3).findDataCy('leaderboardItemValue').should('contain.text', '5.00');

    cy.get('.leaderboardFilterButtons button').contains('Swim').click();
    cy.groupLeaderboardFiltersSelected(true, true, true, false);

    cy.getDataCy('leaderboardItem').should('have.length', 4);
    cy.getDataCy('leaderboardItem').eq(0).should('contain.text', 'Andy Jarombek');
    cy.getDataCy('leaderboardItem').eq(0).findDataCy('leaderboardItemValue').should('contain.text', '2813.13');
    cy.getDataCy('leaderboardItem').eq(1).should('contain.text', 'Benjamin Fishbein');
    cy.getDataCy('leaderboardItem').eq(1).findDataCy('leaderboardItemValue').should('contain.text', '751.00');
    cy.getDataCy('leaderboardItem').eq(2).should('contain.text', 'Joseph Smith');
    cy.getDataCy('leaderboardItem').eq(2).findDataCy('leaderboardItemValue').should('contain.text', '175.25');
    cy.getDataCy('leaderboardItem').eq(3).should('contain.text', 'Lisa Grohn');
    cy.getDataCy('leaderboardItem').eq(3).findDataCy('leaderboardItemValue').should('contain.text', '5.00');

    cy.get('.leaderboardFilterButtons button').contains('Other').click();
    cy.groupLeaderboardFiltersSelected(true, true, true, true);

    cy.getDataCy('leaderboardItem').should('have.length', 4);
    cy.getDataCy('leaderboardItem').eq(0).should('contain.text', 'Andy Jarombek');
    cy.getDataCy('leaderboardItem').eq(0).findDataCy('leaderboardItemValue').should('contain.text', '2813.13');
    cy.getDataCy('leaderboardItem').eq(1).should('contain.text', 'Benjamin Fishbein');
    cy.getDataCy('leaderboardItem').eq(1).findDataCy('leaderboardItemValue').should('contain.text', '771.00');
    cy.getDataCy('leaderboardItem').eq(2).should('contain.text', 'Joseph Smith');
    cy.getDataCy('leaderboardItem').eq(2).findDataCy('leaderboardItemValue').should('contain.text', '175.25');
    cy.getDataCy('leaderboardItem').eq(3).should('contain.text', 'Lisa Grohn');
    cy.getDataCy('leaderboardItem').eq(3).findDataCy('leaderboardItemValue').should('contain.text', '5.00');

    cy.get('.leaderboardFilterButtons button').contains('Run').click();
    cy.groupLeaderboardFiltersSelected(false, true, true, true);

    cy.getDataCy('leaderboardItem').should('have.length', 3);
    cy.getDataCy('leaderboardItem').eq(0).should('contain.text', 'Benjamin Fishbein');
    cy.getDataCy('leaderboardItem').eq(0).findDataCy('leaderboardItemValue').should('contain.text', '149.50');
    cy.getDataCy('leaderboardItem').eq(1).should('contain.text', 'Andy Jarombek');
    cy.getDataCy('leaderboardItem').eq(1).findDataCy('leaderboardItemValue').should('contain.text', '75.25');
    cy.getDataCy('leaderboardItem').eq(2).should('contain.text', 'Joseph Smith');
    cy.getDataCy('leaderboardItem').eq(2).findDataCy('leaderboardItemValue').should('contain.text', '0.00');

    cy.get('.leaderboardFilterButtons button').contains('Bike').click();
    cy.groupLeaderboardFiltersSelected(false, false, true, true);

    cy.getDataCy('leaderboardItem').should('have.length', 3);
    cy.getDataCy('leaderboardItem').eq(0).should('contain.text', 'Benjamin Fishbein');
    cy.getDataCy('leaderboardItem').eq(0).findDataCy('leaderboardItemValue').should('contain.text', '24.50');
    cy.getDataCy('leaderboardItem').eq(1).should('contain.text', 'Andy Jarombek');
    cy.getDataCy('leaderboardItem').eq(1).findDataCy('leaderboardItemValue').should('contain.text', '0.25');
    cy.getDataCy('leaderboardItem').eq(2).should('contain.text', 'Joseph Smith');
    cy.getDataCy('leaderboardItem').eq(2).findDataCy('leaderboardItemValue').should('contain.text', '0.00');

    cy.get('.leaderboardFilterButtons button').contains('Swim').click();
    cy.groupLeaderboardFiltersSelected(false, false, false, true);
    cy.getDataCy('leaderboardAlert').should('not.exist');

    cy.getDataCy('leaderboardItem').should('have.length', 2);
    cy.getDataCy('leaderboardItem').eq(0).should('contain.text', 'Benjamin Fishbein');
    cy.getDataCy('leaderboardItem').eq(0).findDataCy('leaderboardItemValue').should('contain.text', '20.00');
    cy.getDataCy('leaderboardItem').eq(1).should('contain.text', 'Joseph Smith');
    cy.getDataCy('leaderboardItem').eq(1).findDataCy('leaderboardItemValue').should('contain.text', '0.00');

    cy.get('.leaderboardFilterButtons button').contains('Other').click();
    cy.groupLeaderboardFiltersSelected(false, false, false, false);
    cy.getDataCy('leaderboardItem').should('not.exist');
    cy.getDataCy('leaderboardAlert').should(
      'contain.text',
      'There is no leaderboard data in this time interval with the current filters.'
    );
  });

  it.skip('leaderboard displays different values for different time periods', () => {
    cy.visit('/group/1');
    cy.alumniGroupMockAPICalls();

    cy.get('.tabs p').contains('Leaderboard').click();
    cy.groupLeaderboardFiltersSelected(true, false, false, false);
    cy.get('.leaderboardInterval').should('contain.text', 'All Time');

    cy.getDataCy('leaderboardItem').should('have.length', 4);
    cy.getDataCy('leaderboardItem').eq(0).should('contain.text', 'Andy Jarombek');
    cy.getDataCy('leaderboardItem').eq(0).findDataCy('leaderboardItemValue').should('contain.text', '2737.88');
    cy.getDataCy('leaderboardItem').eq(1).should('contain.text', 'Benjamin Fishbein');
    cy.getDataCy('leaderboardItem').eq(1).findDataCy('leaderboardItemValue').should('contain.text', '621.50');
    cy.getDataCy('leaderboardItem').eq(2).should('contain.text', 'Joseph Smith');
    cy.getDataCy('leaderboardItem').eq(2).findDataCy('leaderboardItemValue').should('contain.text', '175.25');
    cy.getDataCy('leaderboardItem').eq(3).should('contain.text', 'Lisa Grohn');
    cy.getDataCy('leaderboardItem').eq(3).findDataCy('leaderboardItemValue').should('contain.text', '5.00');

    cy.get('.leaderboardInterval').click();
    cy.get('.leaderboardInterval').contains('Past Year').click();
    cy.wait('@groupAlumniPastYearLeaderboardRoute');

    cy.getDataCy('leaderboardItem').should('have.length', 3);
    cy.getDataCy('leaderboardItem').eq(0).should('contain.text', 'Andy Jarombek');
    cy.getDataCy('leaderboardItem').eq(0).findDataCy('leaderboardItemValue').should('contain.text', '592.35');
    cy.getDataCy('leaderboardItem').eq(1).should('contain.text', 'Benjamin Fishbein');
    cy.getDataCy('leaderboardItem').eq(1).findDataCy('leaderboardItemValue').should('contain.text', '200.50');
    cy.getDataCy('leaderboardItem').eq(2).should('contain.text', 'Joseph Smith');
    cy.getDataCy('leaderboardItem').eq(2).findDataCy('leaderboardItemValue').should('contain.text', '105.25');

    cy.get('.leaderboardInterval').click();
    cy.get('.leaderboardInterval').contains('Past Month').click();
    cy.wait('@groupAlumniPastMonthLeaderboardRoute');

    cy.getDataCy('leaderboardItem').should('have.length', 3);
    cy.getDataCy('leaderboardItem').eq(0).should('contain.text', 'Joseph Smith');
    cy.getDataCy('leaderboardItem').eq(0).findDataCy('leaderboardItemValue').should('contain.text', '64.25');
    cy.getDataCy('leaderboardItem').eq(1).should('contain.text', 'Benjamin Fishbein');
    cy.getDataCy('leaderboardItem').eq(1).findDataCy('leaderboardItemValue').should('contain.text', '56.0');
    cy.getDataCy('leaderboardItem').eq(2).should('contain.text', 'Andy Jarombek');
    cy.getDataCy('leaderboardItem').eq(2).findDataCy('leaderboardItemValue').should('contain.text', '14.35');

    cy.get('.leaderboardInterval').click();
    cy.get('.leaderboardInterval').contains('Past Week').click();
    cy.wait('@groupAlumniPastWeekLeaderboardRoute');

    cy.getDataCy('leaderboardItem').should('have.length', 2);
    cy.getDataCy('leaderboardItem').eq(0).should('contain.text', 'Benjamin Fishbein');
    cy.getDataCy('leaderboardItem').eq(0).findDataCy('leaderboardItemValue').should('contain.text', '24.5');
    cy.getDataCy('leaderboardItem').eq(1).should('contain.text', 'Joseph Smith');
    cy.getDataCy('leaderboardItem').eq(1).findDataCy('leaderboardItemValue').should('contain.text', '14.25');
  });

  it.only('an error is displayed if leaderboard data fails to load', () => {
    cy.visit('/group/1');
    cy.alumniGroupMockAPICalls();

    const groupLeaderboardErrorRoute = cy.route({
      method: 'GET',
      url: '**/api/v2/groups/leaderboard/1',
      response: {
        self: '/v2/groups/leaderboard/1/month',
        leaderboard: null,
        error: 'An unexpected error occurred retrieving leaderboard data.'
      },
      status: 500
    });

    groupLeaderboardErrorRoute.as('groupLeaderboardErrorRoute');

    cy.get('.tabs p').contains('Leaderboard').click();

    cy.getDataCy('leaderboardItem').should('not.exist');
    cy.getDataCy('leaderboardAlert').should(
      'contain.text',
      'An unexpected error occurred retrieving leaderboard data.'
    );
  });

  it.skip('statistics display as expected', () => {
    cy.visit('/group/1');
    cy.alumniGroupMockAPICalls();

    cy.get('.tabs p').contains('Statistics').click();
  });

  it.skip('displays as member if the user is a standard member of the group', () => {});

  it.skip('displays as administrator if the user is an admin of the group', () => {});

  it.skip("displays as pending if the user's membership is not approved yet", () => {});

  it.skip('displays as non member if the user has no membership to the group', () => {});
});
