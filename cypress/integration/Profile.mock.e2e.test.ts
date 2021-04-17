// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/shared.d.ts" />

/**
 * E2E tests written with Cypress for a user's profile page.  These E2E tests use mocked API calls.
 * @author Andrew Jarombek
 * @since 4/14/2021
 */

import * as moment from 'moment';

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

  it('has a tab with a calendar of monthly exercise logs', () => {
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
      { feel: 7, miles: 6.58 },
      { feel: 8, miles: 12 }
    ];

    cy.createRangeViewRoute('rangeViewCurrentMonthRoute', rangeItems, 0, 'month', true);
    cy.get('.tabs p').contains('Monthly Calendar').click();
    cy.wait('@rangeViewCurrentMonthRoute');

    const calendarMonth = moment().format('MMMM YYYY');

    cy.getDataCy('currentMonth').should('contain.text', calendarMonth);
    cy.calendarWeekCheck(0, [null, 5.39, 5.83, 8.64, 5.96, 8.75, 9.12], 43.69);
    cy.calendarWeekCheck(1, [2.89, 5.89, 5.94, 11.96, 5.97, '8.80', 14.01], 55.46);
    cy.calendarWeekCheck(2, [2.94, 4.55, 6.28, 6.52, 6.58, '12.00', null], 38.87);
    cy.calendarWeekCheck(3, [null, null, null, null, null, null, null], '0.00');
    cy.calendarWeekCheck(4, [null, null, null, null, null, null, null], '0.00');
    cy.calendarWeekCheck(5, [null, null, null, null, null, null, null], '0.00');

    const prevMonthRangeItems = [
      {},
      { feel: 6, miles: 5.42 },
      { feel: 6, miles: 5.36 },
      { feel: 7, miles: 5.4 },
      { feel: 8, miles: 6.51 },
      { feel: 6, miles: 6.01 },
      { feel: 5, miles: 12.23 },
      { feel: 6, miles: 2.82 },
      { feel: 6, miles: 5.42 },
      { feel: 6, miles: 5.38 },
      { feel: 6, miles: 5.4 },
      { feel: 8, miles: 7.11 },
      { feel: 6, miles: 6 },
      { feel: 9, miles: 13.27 },
      { feel: 6, miles: 2.86 },
      { feel: 7, miles: 5.44 },
      { feel: 7, miles: 5.43 },
      { feel: 7, miles: 5.4 },
      { feel: 7, miles: 5.43 },
      { feel: 8, miles: 11.27 },
      { feel: 8, miles: 13.21 },
      { feel: 7, miles: 5.38 },
      { feel: 6, miles: 2.83 },
      { feel: 6, miles: 5.36 },
      { feel: 6, miles: 5.4 },
      { feel: 7, miles: 6.49 },
      { feel: 7, miles: 6.02 },
      { feel: 7, miles: 7.02 },
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
      { feel: 8, miles: 14.01 }
    ];

    // Go to the previous month.
    cy.createRangeViewRoute('rangeViewPreviousMonthRoute', prevMonthRangeItems, 1, 'month', true);
    cy.getDataCy('prevMonth').click();
    cy.wait('@rangeViewPreviousMonthRoute');

    const prevCalendarMonth = moment().subtract(1, 'month').format('MMMM YYYY');

    cy.getDataCy('currentMonth').should('contain.text', prevCalendarMonth);
    cy.calendarWeekCheck(0, [null, 5.42, 5.36, '5.40', 6.51, 6.01, 12.23], 40.93);
    cy.calendarWeekCheck(1, [2.82, 5.42, 5.38, '5.40', 7.11, '6.00', 13.27], '45.40');
    cy.calendarWeekCheck(2, [2.86, 5.44, 5.43, '5.40', 5.43, 11.27, 13.21], 49.04);
    cy.calendarWeekCheck(3, [5.38, 2.83, 5.36, '5.40', 6.49, 6.02, 7.02], '38.50');
    cy.calendarWeekCheck(4, [null, 5.39, 5.83, 8.64, 5.96, 8.75, 9.12], 43.69);
    cy.calendarWeekCheck(5, [2.89, 5.89, 5.94, 11.96, 5.97, '8.80', 14.01], 55.46);

    // Return to the current month.
    cy.getDataCy('nextMonth').click();

    cy.getDataCy('currentMonth').should('contain.text', calendarMonth);
    cy.calendarWeekCheck(0, [null, 5.39, 5.83, 8.64, 5.96, 8.75, 9.12], 43.69);
    cy.calendarWeekCheck(1, [2.89, 5.89, 5.94, 11.96, 5.97, '8.80', 14.01], 55.46);
    cy.calendarWeekCheck(2, [2.94, 4.55, 6.28, 6.52, 6.58, '12.00', null], 38.87);
    cy.calendarWeekCheck(3, [null, null, null, null, null, null, null], '0.00');
    cy.calendarWeekCheck(4, [null, null, null, null, null, null, null], '0.00');
    cy.calendarWeekCheck(5, [null, null, null, null, null, null, null], '0.00');
  });

  it.only('displays an error message if the monthly exercise logs fail to load', () => {
    cy.visit('/profile/andy');
    cy.profileMockAPICalls();
  });
});
