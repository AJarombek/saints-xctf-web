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

  it('edit profile details has proper validation on required fields', () => {
    cy.visit('/profile/andy');
    cy.profileRouteAliases();
    cy.profileAPICalls();

    cy.get('.tabs p').contains('Edit Profile').click();
    cy.profileDetailsFormValidation('none', false, 'none', false, 'none', false, false);

    cy.getImageInput('first').clear();
    cy.profileDetailsFormValidation('warning', true, 'none', false, 'none', false, false);

    cy.getImageInput('last').clear();
    cy.profileDetailsFormValidation('warning', true, 'warning', true, 'none', false, false);

    cy.getImageInput('email').clear();
    cy.profileDetailsFormValidation('warning', true, 'warning', true, 'warning', true, false);

    cy.getImageInput('first').type('Andy');
    cy.profileDetailsFormValidation('none', false, 'warning', true, 'warning', true, false);

    cy.getImageInput('last').type('Jarombek');
    cy.profileDetailsFormValidation('none', false, 'none', false, 'warning', true, false);

    cy.getImageInput('email').type('andrew');
    cy.profileDetailsFormValidation('none', false, 'none', false, 'warning', true, false);

    cy.getImageInput('email').type('@');
    cy.profileDetailsFormValidation('none', false, 'none', false, 'warning', true, false);

    cy.getImageInput('email').type('jarombek');
    cy.profileDetailsFormValidation('none', false, 'none', false, 'warning', true, false);

    cy.getImageInput('email').type('.c');
    cy.profileDetailsFormValidation('none', false, 'none', false, 'warning', true, false);

    cy.getImageInput('email').type('om');
    cy.profileDetailsFormValidation('none', false, 'none', false, 'none', false, true);
  });

  it.only('able to search for teams', () => {
    cy.visit('/profile/andy');
    cy.profileRouteAliases();
    cy.profileAPICalls();

    cy.get('.tabs p').contains('Edit Profile').click();

    // You never have to be perfect, you being yourself is so much better.

    cy.route('GET', '/api/v2/teams/search/S/6').as('teamsSearchOne');
    cy.route('GET', '/api/v2/teams/search/St/6').as('teamsSearchTwo');
    cy.route('GET', '/api/v2/teams/search/St./6').as('teamsSearchThree');
    cy.route('GET', '/api/v2/teams/search/St. /6').as('teamsSearchFour');
    cy.route('GET', '/api/v2/teams/search/St. L/6').as('teamsSearchFive');
    cy.route('GET', '/api/v2/teams/search/St. La/6').as('teamsSearchSix');
    cy.route('GET', '/api/v2/teams/search/St. Law/6').as('teamsSearchSeven');

    cy.getImageInput('team').type('St. Law');
    cy.wait('@teamsSearchOne');
    cy.wait('@teamsSearchTwo');
    cy.wait('@teamsSearchThree');
    cy.wait('@teamsSearchFour');
    cy.wait('@teamsSearchFive');
    cy.wait('@teamsSearchSix');
    cy.wait('@teamsSearchSeven');
  });

  it.skip('prompts users if they have unsaved profile detail changes', () => {
    cy.visit('/profile/andy');
  });

  it.skip('prompts users if they have unsaved profile picture changes', () => {
    cy.visit('/profile/andy');
  });

  it.skip('prompts users if they have unsaved team/group membership changes', () => {
    cy.visit('/profile/andy');
  });

  it.skip('able to view other user profiles', () => {});
});
