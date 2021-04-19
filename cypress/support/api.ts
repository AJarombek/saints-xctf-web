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
  cy.mockForgotPasswordAPI();
  cy.mockForgotPasswordValidateAPI();
  cy.mockLogAPI();
  cy.mockLogFeedAPI();
  cy.mockTeamGroupsAPI();
  cy.mockUserChangePasswordAPI();
  cy.mockUserFlairAPI();
  cy.mockUserGroupsAPI();
  cy.mockUserLookupAPI();
  cy.mockUserMembershipsAPI();
  cy.mockUserNotificationsAPI();
  cy.mockUserStatisticsAPI();
  cy.mockUserAPI();
});

Cypress.Commands.add('mockForgotPasswordAPI', () => {
  cy.fixture('api/forgotPassword/post/andy.json').as('forgotPasswordPostAndy');

  const forgotPasswordPostAndyRoute = cy.route({
    method: 'POST',
    url: '**/api/v2/forgot_password/andrew@jarombek.com',
    response: '@forgotPasswordPostAndy'
  });

  forgotPasswordPostAndyRoute.as('forgotPasswordPostAndyRoute');
});

Cypress.Commands.add('mockForgotPasswordValidateAPI', () => {
  cy.fixture('api/forgotPassword/validate/get/80un02.json').as('forgotPasswordValidate80un02');

  const forgotPasswordValidate80un02Route = cy.route({
    method: 'GET',
    url: '**/api/v2/forgot_password/validate/80un02',
    response: '@forgotPasswordValidate80un02'
  });

  forgotPasswordValidate80un02Route.as('forgotPasswordValidate80un02Route');

  cy.fixture('api/forgotPassword/validate/get/invalid.json').as('forgotPasswordValidateInvalid');

  const forgotPasswordValidateInvalidRoute = cy.route({
    method: 'GET',
    url: '**/api/v2/forgot_password/validate/invalid',
    response: '@forgotPasswordValidateInvalid',
    status: 400
  });

  forgotPasswordValidateInvalidRoute.as('forgotPasswordValidateInvalidRoute');
});

Cypress.Commands.add('mockLogAPI', () => {
  cy.fixture('api/logs/get/log3.json').as('logGet3');

  const logGet3Route = cy.route({
    method: 'GET',
    url: '**/api/v2/logs/3',
    response: '@logGet3'
  });

  logGet3Route.as('logGet3Route');

  cy.fixture('api/logs/delete/success.json').as('logDeleteSuccess');

  const logDeleteSuccessRoute = cy.route({
    method: 'DELETE',
    url: '**/api/v2/logs/*',
    response: '@logDeleteSuccess'
  });

  logDeleteSuccessRoute.as('logDeleteSuccessRoute');
});

Cypress.Commands.add('mockLogFeedAPI', () => {
  cy.fixture('api/logFeed/get/allPageOne.json').as('logFeedAllPageOne');

  const logFeedAllPageOneRoute = cy.route({
    method: 'GET',
    url: '**/api/v2/log_feed/all/all/10/0',
    response: '@logFeedAllPageOne'
  });

  logFeedAllPageOneRoute.as('logFeedAllPageOneRoute');

  cy.fixture('api/logFeed/get/userAndyPageOne.json').as('logFeedUserAndyPageOne');

  const logFeedUserAndyPageOneRoute = cy.route({
    method: 'GET',
    url: '**/api/v2/log_feed/user/andy/10/0',
    response: '@logFeedUserAndyPageOne'
  });

  logFeedUserAndyPageOneRoute.as('logFeedUserAndyPageOneRoute');

  cy.fixture('api/logFeed/get/userAndyPageThree.json').as('logFeedUserAndyPageThree');

  const logFeedUserAndyPageThreeRoute = cy.route({
    method: 'GET',
    url: '**/api/v2/log_feed/user/andy/10/20',
    response: '@logFeedUserAndyPageThree'
  });

  logFeedUserAndyPageThreeRoute.as('logFeedUserAndyPageThreeRoute');

  cy.fixture('api/logFeed/get/userAndyPageFive.json').as('logFeedUserAndyPageFive');

  const logFeedUserAndyPageFiveRoute = cy.route({
    method: 'GET',
    url: '**/api/v2/log_feed/user/andy/10/40',
    response: '@logFeedUserAndyPageFive'
  });

  logFeedUserAndyPageFiveRoute.as('logFeedUserAndyPageFiveRoute');
});

Cypress.Commands.add('mockTeamGroupsAPI', () => {
  cy.fixture('api/teams/groups/get/saintsxctf.json').as('teamGroupsSaintsXCTF');

  const teamGroupsSaintsXCTFRoute = cy.route({
    method: 'GET',
    url: '**/api/v2/teams/groups/saintsxctf',
    response: '@teamGroupsSaintsXCTF'
  });

  teamGroupsSaintsXCTFRoute.as('teamGroupsSaintsXCTFRoute');

  cy.fixture('api/teams/groups/get/saintsxctf_alumni.json').as('teamGroupsSaintsXCTFAlumni');

  const teamGroupsSaintsXCTFAlumniRoute = cy.route({
    method: 'GET',
    url: '**/api/v2/teams/groups/saintsxctf_alumni',
    response: '@teamGroupsSaintsXCTFAlumni'
  });

  teamGroupsSaintsXCTFAlumniRoute.as('teamGroupsSaintsXCTFAlumniRoute');
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

  cy.fixture('api/users/put/andy.json').as('updateUserAndy');

  const updateUserAndyRoute = cy.route({
    method: 'PUT',
    url: '**/api/v2/users/andy',
    response: '@updateUserAndy'
  });

  updateUserAndyRoute.as('updateUserAndyRoute');
});

Cypress.Commands.add('mockUserChangePasswordAPI', () => {
  cy.fixture('api/users/changePassword/get/andy.json').as('userChangePasswordAndy');

  const userChangePasswordAndyRoute = cy.route({
    method: 'PUT',
    url: '**/api/v2/users/andy/change_password',
    response: '@userChangePasswordAndy'
  });

  userChangePasswordAndyRoute.as('userChangePasswordAndyRoute');
});

Cypress.Commands.add('mockUserFlairAPI', () => {
  cy.fixture('api/users/flair/get/andy.json').as('userFlairAndy');

  const userFlairAndyRoute = cy.route({
    method: 'GET',
    url: '**/api/v2/users/flair/andy',
    response: '@userFlairAndy'
  });

  userFlairAndyRoute.as('userFlairAndyRoute');
});

Cypress.Commands.add('mockUserGroupsAPI', () => {
  cy.fixture('api/users/groups/get/andy.json').as('userGroupsAndy');

  const userGroupsAndyRoute = cy.route({
    method: 'GET',
    url: '**/api/v2/users/groups/andy',
    response: '@userGroupsAndy'
  });

  userGroupsAndyRoute.as('userGroupsAndyRoute');
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

Cypress.Commands.add('mockUserMembershipsAPI', () => {
  cy.fixture('api/users/memberships/get/andy.json').as('userMembershipsAndy');

  const userMembershipsAndyRoute = cy.route({
    method: 'GET',
    url: '**/api/v2/users/memberships/andy',
    response: '@userMembershipsAndy'
  });

  userMembershipsAndyRoute.as('userMembershipsAndyRoute');
});

Cypress.Commands.add('mockUserNotificationsAPI', () => {
  cy.fixture('api/users/notifications/get/andy.json').as('userNotificationsAndy');

  const userNotificationsAndyRoute = cy.route({
    method: 'GET',
    url: '**/api/v2/users/notifications/andy',
    response: '@userNotificationsAndy'
  });

  userNotificationsAndyRoute.as('userNotificationsAndyRoute');
});

Cypress.Commands.add('mockUserStatisticsAPI', () => {
  cy.fixture('api/users/statistics/get/andy.json').as('userStatisticsAndy');

  const userStatisticsAndyRoute = cy.route({
    method: 'GET',
    url: '**/api/v2/users/statistics/andy',
    response: '@userStatisticsAndy'
  });

  userStatisticsAndyRoute.as('userStatisticsAndyRoute');
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
