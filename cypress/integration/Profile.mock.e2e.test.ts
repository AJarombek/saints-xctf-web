// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/shared.d.ts" />

/**
 * E2E tests written with Cypress for a user's profile page.  These E2E tests use mocked API calls.
 * @author Andrew Jarombek
 * @since 4/14/2021
 */

import * as moment from 'moment';

const currentMonthRangeItems = [
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

const twoMonthsAgoRangeItems = [
  { feel: 6, miles: 6.59 },
  { feel: 6, miles: 3.74 },
  { feel: 6, miles: 4.2 },
  { feel: 6, miles: 3.76 },
  { feel: 6, miles: 1.06 },
  { feel: 6, miles: 5.56 },
  { feel: 6, miles: 10.6 },
  { feel: 6, miles: 2.87 },
  { feel: 6, miles: 6.86 },
  { feel: 6, miles: 6.53 },
  { feel: 6, miles: 4.42 },
  { feel: 6, miles: 6.71 },
  { feel: 6, miles: 9.68 },
  { feel: 6, miles: 11.73 },
  { feel: 6, miles: 2.98 },
  { feel: 6, miles: 5.04 },
  { feel: 6, miles: 3.3 },
  { feel: 6, miles: 6.65 },
  { feel: 6, miles: 3.55 },
  {},
  { feel: 6, miles: 8.45 },
  { feel: 6, miles: 6.68 },
  { feel: 6, miles: 3.85 },
  { feel: 6, miles: 4.43 },
  {},
  {},
  {},
  { feel: 6, miles: 5.05 },
  {},
  { feel: 6, miles: 5.42 },
  { feel: 6, miles: 5.36 },
  { feel: 7, miles: 5.4 },
  { feel: 8, miles: 6.51 },
  { feel: 6, miles: 6.01 },
  { feel: 5, miles: 12.23 }
];

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

    cy.createRangeViewRoute('rangeViewCurrentMonthRoute', currentMonthRangeItems, 0, 'month', true);
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

  it('displays an error message if the monthly exercise logs fail to load', () => {
    cy.visit('/profile/andy');
    cy.profileMockAPICalls();

    cy.getDataCy('alert').should('not.exist');

    cy.createRangeViewErrorRoute('rangeViewErrorRoute', 0, 'month', true);
    cy.get('.tabs p').contains('Monthly Calendar').click();
    cy.wait('@rangeViewErrorRoute');

    cy.getDataCy('alert').should('exist');
    cy.getDataCy('alert').should(
      'contain.text',
      'Failed to retrieve calendar data. Try reloading the page. If this error persists, contact andrew@jarombek.com.'
    );

    // Go to the previous month without error.
    cy.createRangeViewRoute('rangeViewPreviousMonthRoute', prevMonthRangeItems, 1, 'month', true);
    cy.getDataCy('prevMonth').click();
    cy.wait('@rangeViewPreviousMonthRoute');

    cy.calendarWeekCheck(0, [null, 5.42, 5.36, '5.40', 6.51, 6.01, 12.23], 40.93);

    // The error message should disappear.
    cy.getDataCy('alert').should('not.exist');
  });

  it('displays and populates a weekly chart of exercise data', () => {
    cy.visit('/profile/andy');
    cy.profileMockAPICalls();

    const end = moment().endOf('week').add(1, 'day');
    const start = end.clone().subtract(8, 'weeks').add(1, 'day');
    const url = `/api/v2/range_view/users/andy/r/${start.format('YYYY-MM-DD')}/${end.format('YYYY-MM-DD')}`;

    const rangeItems = [
      ...twoMonthsAgoRangeItems.slice(21, 28),
      ...prevMonthRangeItems,
      ...currentMonthRangeItems.slice(14, 21)
    ];

    const rangeView = rangeItems
      .map((item, index) => ({
        ...item,
        date: start.clone().add(index, 'day').format('ddd, DD MMM YYYY') + ' 00:00:00 GMT'
      }))
      .filter((item) => item.miles);

    cy.route({
      method: 'GET',
      url,
      response: {
        range_view: rangeView,
        self: url
      }
    }).as('weeklyChartRangeViewRoute');

    cy.get('.tabs p').contains('Weekly Chart').click();
    cy.wait('@weeklyChartRangeViewRoute');

    cy.get('.recharts-bar-rectangle').should('have.length', 8);
    cy.get('.recharts-bar-rectangle').eq(0).trigger('mouseover');
    cy.get('.recharts-bar-rectangle path').eq(0).should('have.css', 'fill', 'rgb(227, 227, 227)');
    cy.get('.recharts-default-tooltip').eq(0).should('contain.text', 'Week of Feb. 22nd');
    cy.get('.recharts-default-tooltip').eq(0).should('contain.text', 'Miles: 20.01');

    cy.get('.recharts-bar-rectangle').eq(1).trigger('mouseover');
    cy.get('.recharts-bar-rectangle path').eq(1).should('have.css', 'fill', 'rgb(227, 227, 227)');
    cy.get('.recharts-default-tooltip').eq(0).should('contain.text', 'Week of Mar. 1st');
    cy.get('.recharts-default-tooltip').eq(0).should('contain.text', 'Miles: 40.93');

    cy.get('.recharts-bar-rectangle').eq(2).trigger('mouseover');
    cy.get('.recharts-bar-rectangle path').eq(2).should('have.css', 'fill', 'rgb(199, 245, 153)');
    cy.get('.recharts-default-tooltip').eq(0).should('contain.text', 'Week of Mar. 8th');
    cy.get('.recharts-default-tooltip').eq(0).should('contain.text', 'Miles: 45.40');

    cy.get('.recharts-bar-rectangle').eq(3).trigger('mouseover');
    cy.get('.recharts-bar-rectangle path').eq(3).should('have.css', 'fill', 'rgb(199, 245, 153)');
    cy.get('.recharts-default-tooltip').eq(0).should('contain.text', 'Week of Mar. 15th');
    cy.get('.recharts-default-tooltip').eq(0).should('contain.text', 'Miles: 49.04');

    cy.get('.recharts-bar-rectangle').eq(4).trigger('mouseover');
    cy.get('.recharts-bar-rectangle path').eq(4).should('have.css', 'fill', 'rgb(199, 245, 153)');
    cy.get('.recharts-default-tooltip').eq(0).should('contain.text', 'Week of Mar. 22nd');
    cy.get('.recharts-default-tooltip').eq(0).should('contain.text', 'Miles: 38.50');

    cy.get('.recharts-bar-rectangle').eq(5).trigger('mouseover');
    cy.get('.recharts-bar-rectangle path').eq(5).should('have.css', 'fill', 'rgb(227, 227, 227)');
    cy.get('.recharts-default-tooltip').eq(0).should('contain.text', 'Week of Mar. 29th');
    cy.get('.recharts-default-tooltip').eq(0).should('contain.text', 'Miles: 43.69');

    cy.get('.recharts-bar-rectangle').eq(6).trigger('mouseover');
    cy.get('.recharts-bar-rectangle path').eq(6).should('have.css', 'fill', 'rgb(199, 245, 153)');
    cy.get('.recharts-default-tooltip').eq(0).should('contain.text', 'Week of Apr. 5th');
    cy.get('.recharts-default-tooltip').eq(0).should('contain.text', 'Miles: 55.46');

    cy.get('.recharts-bar-rectangle').eq(7).trigger('mouseover');
    cy.get('.recharts-bar-rectangle path').eq(7).should('have.css', 'fill', 'rgb(199, 245, 153)');
    cy.get('.recharts-default-tooltip').eq(0).should('contain.text', 'Week of Apr. 12th');
    cy.get('.recharts-default-tooltip').eq(0).should('contain.text', 'Miles: 38.87');
  });

  it.only('displays an error if weekly chart data retrieval fails', () => {
    cy.visit('/profile/andy');
    cy.profileMockAPICalls();

    const end = moment().endOf('week').add(1, 'day');
    const start = end.clone().subtract(8, 'weeks').add(1, 'day');
    const url = `/api/v2/range_view/users/andy/r/${start.format('YYYY-MM-DD')}/${end.format('YYYY-MM-DD')}`;

    cy.route({
      method: 'GET',
      url,
      response: {
        range_view: [],
        self: url
      },
      status: 400
    }).as('weeklyChartRangeViewErrorRoute');

    cy.get('.tabs p').contains('Weekly Chart').click();
    cy.wait('@weeklyChartRangeViewErrorRoute');
  });
});