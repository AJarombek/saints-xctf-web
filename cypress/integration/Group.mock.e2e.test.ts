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

  it.only('leaderboard displays properly with all filters', () => {
    cy.visit('/group/1');
    cy.alumniGroupMockAPICalls();

    cy.get('.tabs p').contains('Leaderboard').click();
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
