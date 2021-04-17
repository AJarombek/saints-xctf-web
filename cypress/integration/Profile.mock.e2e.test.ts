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

  it('shows the proper profile information', () => {
    cy.visit('/profile/andy');
    cy.profileMockAPICalls();

    cy.get('aside').findDataCy('pictureTitle').should('contain.text', 'Andy Jarombek');
    cy.get('aside').findDataCy('pictureSubTitle').should('contain.text', '@andy');

    cy.get('aside').findDataCy('flair').should('have.length', 2);
    cy.get('aside').findDataCy('flair').eq(0).should('contain.text', 'Site Creator');
    cy.get('aside').findDataCy('flair').eq(1).should('contain.text', 'Alumnus and Programming Extraordinaire');

    cy.get('aside').findDataCy('teamMembership').should('have.length', 1);
    cy.get('aside')
      .findDataCy('teamMembership')
      .eq(0)
      .should('contain.text', 'St. Lawrence Cross Country and Track & Field');
  });

  it('has paginated exercise logs', () => {
    cy.visit('/profile/andy');
    cy.profileMockAPICalls();

    cy.get('#logFeed .exerciseLog').should('have.length', 10);
    cy.getDataCyContains('exerciseLogUser', 'Andy Jarombek').should('have.length', 10);

    cy.paginationBarPageOne();

    cy.get('#paginationBar').contains(3).click();
    cy.paginationBarPageThree();

    cy.get('#paginationBar').contains(5).click();
    cy.paginationBarPageFive();
  });

  it.only('has a tab with a calendar of monthly exercise logs', () => {
    cy.visit('/profile/andy');
    cy.profileMockAPICalls();

    const rangeItems = [
      {feel: 5, miles: 4}
    ];

    cy.createRangeViewRoute('rangeViewCurrentMonthRoute', rangeItems, 0, 'month', true);
    cy.get('.tabs p').contains('Monthly Calendar').click();
    cy.wait('@rangeViewCurrentMonthRoute');
  });
});
