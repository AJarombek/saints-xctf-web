// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/api.d.ts" />

/**
 * Custom commands for the API to use in Cypress tests.
 * @author Andrew Jarombek
 * @since 10/18/2020
 */

/**
 * Mock the api.saintsxctf.com calls made from the UI.
 */
Cypress.Commands.add('mockAPI', () => {
  cy.server();
  cy.mockLogAPI();
  cy.mockLogFeedAPI();
  cy.mockUserLookupAPI();
});

Cypress.Commands.add('mockLogAPI', () => {
  const logDeleteRoute = cy.route({
    method: 'DELETE',
    url: '**/api/v2/logs/*'
  });

  logDeleteRoute.as('logDeleteRoute');
});

Cypress.Commands.add('mockLogFeedAPI', () => {
  cy.fixture('logFeed/get/allPageOne.json').as('logFeedAllPageOne');

  const logFeedAllPageOneRoute = cy.route({
    method: 'GET',
    url: '**/api/v2/log_feed/all/all/10/0',
    response: '@logFeedAllPageOne'
  });

  logFeedAllPageOneRoute.as('logFeedAllPageOneRoute');
});

Cypress.Commands.add('mockUserLookupAPI', () => {
  cy.fixture('users/lookup/get/andyEmail.json').as('userLookupAndyEmail');

  const userLookupAndyEmailRoute = cy.route({
    method: 'GET',
    url: '**/api/v2/users/lookup/andrew@jarombek.com',
    response: '@userLookupAndyEmail'
  });

  userLookupAndyEmailRoute.as('userLookupAndyEmailRoute');
});

/**
 * Mock the auth.saintsxctf.com calls made from the UI.
 */
Cypress.Commands.add('mockAuth', () => {
  cy.server();
});
