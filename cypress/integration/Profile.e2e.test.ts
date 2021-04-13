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

    // The default tab is the exercise logs tab.
    cy.get('section #logFeed').should('exist');
    cy.get('section #monthlyCalendar').should('not.exist');

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

    cy.get('.tabs p').contains('Weekly Chart').click();
    cy.get('section #logFeed').should('not.exist');
    cy.get('section #monthlyCalendar').should('not.exist');

    cy.get('.tabs p').contains('Details').click();
    cy.get('section #logFeed').should('not.exist');
    cy.get('section #monthlyCalendar').should('not.exist');

    cy.get('.tabs p').contains('Edit Profile').click();
    cy.get('section #logFeed').should('not.exist');
    cy.get('section #monthlyCalendar').should('not.exist');

    cy.get('.tabs p').contains('Exercise Logs').click();
    cy.get('section #logFeed').should('exist');
    cy.get('section #monthlyCalendar').should('not.exist');
  });
});
