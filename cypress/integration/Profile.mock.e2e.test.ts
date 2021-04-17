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
      {},
      { feel: 6, miles: 5.39 },
      { feel: 6, miles: 5.83 },
      { feel: 8, miles: 8.64 },
      { feel: 7, miles: 5.96 },
      { feel: 6, miles: 8.75 },
      { feel: 5, miles: 9.12 },
      { feel: 6, miles: 2.89 },
      { feel: 6, miles: 5.89 },
      { feel: 6, miles: 5.94 },
      { feel: 8, miles: 11.96 },
      { feel: 8, miles: 5.97 },
      { feel: 8, miles: 8.8 },
      { feel: 8, miles: 14.01 },
      { feel: 6, miles: 2.94 },
      { feel: 5, miles: 4.55 },
      { feel: 7, miles: 6.28 },
      { feel: 7, miles: 6.52 },
      { feel: 7, miles: 6.58 }
    ];

    cy.createRangeViewRoute('rangeViewCurrentMonthRoute', rangeItems, 0, 'month', true);
    cy.get('.tabs p').contains('Monthly Calendar').click();
    cy.wait('@rangeViewCurrentMonthRoute');

    cy.getDataCy('week').eq(0).findDataCy('day').eq(0).should('not.contain.text', 'Miles');
    cy.getDataCy('week').eq(0).findDataCy('day').eq(1).should('contain.text', '5.39Miles');
    cy.getDataCy('week').eq(0).findDataCy('day').eq(2).should('contain.text', '5.83Miles');
    cy.getDataCy('week').eq(0).findDataCy('day').eq(3).should('contain.text', '8.64Miles');
    cy.getDataCy('week').eq(0).findDataCy('day').eq(4).should('contain.text', '5.96Miles');
    cy.getDataCy('week').eq(0).findDataCy('day').eq(5).should('contain.text', '8.75Miles');
    cy.getDataCy('week').eq(0).findDataCy('day').eq(6).should('contain.text', '9.12Miles');
    cy.getDataCy('week').eq(0).findDataCy('weekTotal').should('contain.text', '43.69Miles');

    cy.getDataCy('week').eq(1).findDataCy('day').eq(0).should('contain.text', '2.89Miles');
    cy.getDataCy('week').eq(1).findDataCy('day').eq(1).should('contain.text', '5.89Miles');
    cy.getDataCy('week').eq(1).findDataCy('day').eq(2).should('contain.text', '5.94Miles');
    cy.getDataCy('week').eq(1).findDataCy('day').eq(3).should('contain.text', '11.96Miles');
    cy.getDataCy('week').eq(1).findDataCy('day').eq(4).should('contain.text', '5.97Miles');
    cy.getDataCy('week').eq(1).findDataCy('day').eq(5).should('contain.text', '8.80Miles');
    cy.getDataCy('week').eq(1).findDataCy('day').eq(6).should('contain.text', '14.01Miles');
    cy.getDataCy('week').eq(1).findDataCy('weekTotal').should('contain.text', '55.46Miles');

    cy.getDataCy('week').eq(2).findDataCy('day').eq(0).should('contain.text', '2.94Miles');
    cy.getDataCy('week').eq(2).findDataCy('day').eq(1).should('contain.text', '4.55Miles');
    cy.getDataCy('week').eq(2).findDataCy('day').eq(2).should('contain.text', '6.28Miles');
    cy.getDataCy('week').eq(2).findDataCy('day').eq(3).should('contain.text', '6.52Miles');
    cy.getDataCy('week').eq(2).findDataCy('day').eq(4).should('contain.text', '6.58Miles');
    cy.getDataCy('week').eq(2).findDataCy('day').eq(5).should('not.contain.text', 'Miles');
    cy.getDataCy('week').eq(2).findDataCy('day').eq(6).should('not.contain.text', 'Miles');
    cy.getDataCy('week').eq(2).findDataCy('weekTotal').should('contain.text', '26.87Miles');

    cy.getDataCy('week').eq(3).findDataCy('day').eq(0).should('not.contain.text', 'Miles');
    cy.getDataCy('week').eq(3).findDataCy('day').eq(1).should('not.contain.text', 'Miles');
    cy.getDataCy('week').eq(3).findDataCy('day').eq(2).should('not.contain.text', 'Miles');
    cy.getDataCy('week').eq(3).findDataCy('day').eq(3).should('not.contain.text', 'Miles');
    cy.getDataCy('week').eq(3).findDataCy('day').eq(4).should('not.contain.text', 'Miles');
    cy.getDataCy('week').eq(3).findDataCy('day').eq(5).should('not.contain.text', 'Miles');
    cy.getDataCy('week').eq(3).findDataCy('day').eq(6).should('not.contain.text', 'Miles');
    cy.getDataCy('week').eq(3).findDataCy('weekTotal').should('contain.text', '0.00Miles');

    cy.getDataCy('week').eq(4).findDataCy('day').eq(0).should('not.contain.text', 'Miles');
    cy.getDataCy('week').eq(4).findDataCy('day').eq(1).should('not.contain.text', 'Miles');
    cy.getDataCy('week').eq(4).findDataCy('day').eq(2).should('not.contain.text', 'Miles');
    cy.getDataCy('week').eq(4).findDataCy('day').eq(3).should('not.contain.text', 'Miles');
    cy.getDataCy('week').eq(4).findDataCy('day').eq(4).should('not.contain.text', 'Miles');
    cy.getDataCy('week').eq(4).findDataCy('day').eq(5).should('not.contain.text', 'Miles');
    cy.getDataCy('week').eq(4).findDataCy('day').eq(6).should('not.contain.text', 'Miles');
    cy.getDataCy('week').eq(4).findDataCy('weekTotal').should('contain.text', '0.00Miles');

    cy.getDataCy('week').eq(5).findDataCy('day').eq(0).should('not.contain.text', 'Miles');
    cy.getDataCy('week').eq(5).findDataCy('day').eq(1).should('not.contain.text', 'Miles');
    cy.getDataCy('week').eq(5).findDataCy('day').eq(2).should('not.contain.text', 'Miles');
    cy.getDataCy('week').eq(5).findDataCy('day').eq(3).should('not.contain.text', 'Miles');
    cy.getDataCy('week').eq(5).findDataCy('day').eq(4).should('not.contain.text', 'Miles');
    cy.getDataCy('week').eq(5).findDataCy('day').eq(5).should('not.contain.text', 'Miles');
    cy.getDataCy('week').eq(5).findDataCy('day').eq(6).should('not.contain.text', 'Miles');
    cy.getDataCy('week').eq(5).findDataCy('weekTotal').should('contain.text', '0.00Miles');
  });
});
