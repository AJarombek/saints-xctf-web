// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./api.d.ts" />

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
  cy.mockUserAPI();
});

Cypress.Commands.add('mockLogAPI', () => {
  const logDeleteRoute = cy.route({
    method: 'DELETE',
    url: '**/api/v2/logs/*'
  });

  logDeleteRoute.as('logDeleteRoute');
});

Cypress.Commands.add('mockLogFeedAPI', () => {
  cy.fixture('api/logFeed/get/allPageOne.json').as('logFeedAllPageOne');

  const logFeedAllPageOneRoute = cy.route({
    method: 'GET',
    url: '**/api/v2/log_feed/all/all/10/0',
    response: '@logFeedAllPageOne'
  });

  logFeedAllPageOneRoute.as('logFeedAllPageOneRoute');
});

Cypress.Commands.add('mockUserAPI', () => {
  cy.fixture('api/users/get/andy.json').as('userAndy');

  const userAndyRoute = cy.route({
    method: 'GET',
    url: '**/api/v2/users/andy',
    response: '@userAndy'
  });

  userAndyRoute.as('userAndyRoute');

  cy.fixture('api/users/post/invalidActivationCode.json').as('userPostInvalidActivationCode');

  const userPostInvalidActivationCodeRoute = cy.route({
    method: 'POST',
    url: '**/api/v2/users/',
    response: '@userPostInvalidActivationCode',
    status: 400
  });

  userPostInvalidActivationCodeRoute.as('userPostInvalidActivationCodeRoute');
});

Cypress.Commands.add('mockUserLookupAPI', () => {
  cy.fixture('api/users/lookup/get/andyEmail.json').as('userLookupAndyEmail');

  const userLookupAndyEmailRoute = cy.route({
    method: 'GET',
    url: '**/api/v2/users/lookup/andrew@jarombek.com',
    response: '@userLookupAndyEmail'
  });

  userLookupAndyEmailRoute.as('userLookupAndyEmailRoute');

  cy.fixture('api/users/lookup/get/andyUser.json').as('userLookupAndyUser');

  const userLookupAndyUserRoute = cy.route({
    method: 'GET',
    url: '**/api/v2/users/lookup/andy',
    response: '@userLookupAndyUser'
  });

  userLookupAndyUserRoute.as('userLookupAndyUserRoute');

  cy.fixture('api/users/lookup/get/unusedEmail.json').as('userLookupUnusedEmail');

  const userLookupUnusedEmailRoute = cy.route({
    method: 'GET',
    url: '**/api/v2/users/lookup/saintsxctf@jarombek.com',
    response: '@userLookupUnusedEmail',
    status: 400
  });

  userLookupUnusedEmailRoute.as('userLookupUnusedEmailRoute');

  cy.fixture('api/users/lookup/get/unusedUser.json').as('userLookupUnusedUser');

  const userLookupUnusedUserRoute = cy.route({
    method: 'GET',
    url: '**/api/v2/users/lookup/unusedUsername',
    response: '@userLookupUnusedUser',
    status: 400
  });

  userLookupUnusedUserRoute.as('userLookupUnusedUserRoute');
});

/**
 * Mock the auth.saintsxctf.com calls made from the UI.
 */
Cypress.Commands.add('mockAuthAPI', () => {
  cy.server();
  cy.mockAuthTokenAPI();
});

Cypress.Commands.add('mockAuthTokenAPI', () => {
  cy.fixture('auth/token/andy.json').as('andyAuthToken');

  const andyAuthTokenRoute = cy.route({
    method: 'POST',
    url: '**/auth/token',
    response: '@andyAuthToken'
  });

  andyAuthTokenRoute.as('andyAuthTokenRoute');
});

/**
 * Mock the fn.saintsxctf.com calls made from the UI.
 */
Cypress.Commands.add('mockFnAPI', () => {
  cy.server();
  cy.mockWelcomeEmailFnAPI();
});

Cypress.Commands.add('mockWelcomeEmailFnAPI', () => {
  cy.fixture('fn/email/welcome/success.json').as('welcomeEmailSuccessFn');

  const welcomeEmailSuccessFnRoute = cy.route({
    method: 'POST',
    url: '**/fn/email/welcome',
    response: '@welcomeEmailSuccessFn',
    status: 200
  });

  welcomeEmailSuccessFnRoute.as('welcomeEmailSuccessFnRoute');
});
