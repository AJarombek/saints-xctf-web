// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/commands.d.ts" />
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/profile.d.ts" />

/**
 * E2E tests written with Cypress for a users profile page.
 * @author Andrew Jarombek
 * @since 11/7/2020
 */

import * as moment from 'moment';

describe('Profile E2E Tests', () => {
  beforeEach(() => {
    cy.server();
    cy.setUserInLocalStorage();
    cy.setTokenInLocalStorage();
  });

  it('has multiple tabs that can be navigated between', () => {
    cy.visit('/profile/andy');
    cy.profileRouteAliases();
    cy.profileAPICalls();

    // The default tab is the exercise logs tab.
    cy.get('section #logFeed').should('exist');
    cy.get('section #monthlyCalendar').should('not.exist');
    cy.get('section #weeklyChart').should('not.exist');
    cy.get('section #profileDetails').should('not.exist');
    cy.get('section #editProfile').should('not.exist');

    const start = moment().startOf('month').startOf('week');

    if (start.date() !== 1) {
      start.add(1, 'day');
    } else {
      start.subtract(6, 'day');
    }

    const end = start.clone().add(6, 'weeks').subtract(1, 'day');

    cy.route('GET', `/api/v2/range_view/users/andy/r/${start.format('YYYY-MM-DD')}/${end.format('YYYY-MM-DD')}`).as(
      'rangeViewAndy'
    );

    cy.get('.tabs p').contains('Monthly Calendar').click();
    cy.get('section #logFeed').should('not.exist');
    cy.get('section #monthlyCalendar').should('exist');
    cy.get('section #weeklyChart').should('not.exist');
    cy.get('section #profileDetails').should('not.exist');
    cy.get('section #editProfile').should('not.exist');

    cy.get('.tabs p').contains('Weekly Chart').click();
    cy.get('section #logFeed').should('not.exist');
    cy.get('section #monthlyCalendar').should('not.exist');
    cy.get('section #weeklyChart').should('exist');
    cy.get('section #profileDetails').should('not.exist');
    cy.get('section #editProfile').should('not.exist');

    cy.get('.tabs p').contains('Details').click();
    cy.get('section #logFeed').should('not.exist');
    cy.get('section #monthlyCalendar').should('not.exist');
    cy.get('section #weeklyChart').should('not.exist');
    cy.get('section #profileDetails').should('exist');
    cy.get('section #editProfile').should('not.exist');

    cy.get('.tabs p').contains('Edit Profile').click();
    cy.get('section #logFeed').should('not.exist');
    cy.get('section #monthlyCalendar').should('not.exist');
    cy.get('section #weeklyChart').should('not.exist');
    cy.get('section #profileDetails').should('not.exist');
    cy.get('section #editProfile').should('exist');

    cy.get('.tabs p').contains('Exercise Logs').click();
    cy.get('section #logFeed').should('exist');
    cy.get('section #monthlyCalendar').should('not.exist');
    cy.get('section #weeklyChart').should('not.exist');
    cy.get('section #profileDetails').should('not.exist');
    cy.get('section #editProfile').should('not.exist');
  });

  it('has a default tab of paginated exercise logs', () => {
    cy.visit('/profile/andy');
    cy.profileRouteAliases();
    cy.profileAPICalls();

    cy.get('#logFeed .exerciseLog').should('have.length', 10);
    cy.getDataCyContains('exerciseLogUser', 'Andy Jarombek').should('have.length', 10);

    cy.route('GET', '/api/v2/log_feed/user/andy/10/10').as('logFeedPageTwoAndy');
    cy.get('#paginationBar').contains(2).click();
    cy.wait('@logFeedPageTwoAndy');

    cy.get('#logFeed .exerciseLog').should('have.length', 10);
    cy.getDataCyContains('exerciseLogUser', 'Andy Jarombek').should('have.length', 10);

    cy.route('GET', '/api/v2/log_feed/user/andy/10/20').as('logFeedPageTwoAndy');
    cy.get('#paginationBar').contains(3).click();
    cy.wait('@logFeedPageTwoAndy');

    cy.get('#logFeed .exerciseLog').should('have.length', 10);
    cy.getDataCyContains('exerciseLogUser', 'Andy Jarombek').should('have.length', 10);
  });

  /*
   * https://www.youtube.com/watch?v=vUHDR6Rg3Y4 ✨
   */

  it.only('edit profile details has proper validation on required fields', () => {
    cy.visit('/profile/andy');
    cy.profileRouteAliases();
    cy.profileAPICalls();

    cy.get('.tabs p').contains('Edit Profile').click();
  });
});
