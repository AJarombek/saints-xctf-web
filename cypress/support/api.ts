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
  cy.mockGroupAPI();
  cy.mockGroupLeaderboardAPI();
  cy.mockGroupMembersAPI();
  cy.mockGroupStatisticsAPI();
  cy.mockGroupTeamAPI();
  cy.mockLogAPI();
  cy.mockLogFeedAPI();
  cy.mockTeamGroupsAPI();
  cy.mockTeamSearchAPI();
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

Cypress.Commands.add('mockGroupAPI', () => {
  cy.fixture('api/groups/get/alumni.json').as('groupAlumni');

  const groupAlumniRoute = cy.route({
    method: 'GET',
    url: '**/api/v2/groups/1',
    response: '@groupAlumni'
  });

  groupAlumniRoute.as('groupAlumniRoute');
});

Cypress.Commands.add('mockGroupLeaderboardAPI', () => {
  cy.fixture('api/groups/leaderboard/get/alumni.json').as('groupAlumniLeaderboard');

  const groupAlumniLeaderboardRoute = cy.route({
    method: 'GET',
    url: '**/api/v2/groups/leaderboard/1',
    response: '@groupAlumniLeaderboard'
  });

  groupAlumniLeaderboardRoute.as('groupAlumniLeaderboardRoute');

  cy.fixture('api/groups/leaderboard/get/alumniPastYear.json').as('groupAlumniPastYearLeaderboard');

  const groupAlumniPastYearLeaderboardRoute = cy.route({
    method: 'GET',
    url: '**/api/v2/groups/leaderboard/1/year',
    response: '@groupAlumniPastYearLeaderboard'
  });

  groupAlumniPastYearLeaderboardRoute.as('groupAlumniPastYearLeaderboardRoute');

  cy.fixture('api/groups/leaderboard/get/alumniPastMonth.json').as('groupAlumniPastMonthLeaderboard');

  const groupAlumniPastMonthLeaderboardRoute = cy.route({
    method: 'GET',
    url: '**/api/v2/groups/leaderboard/1/month',
    response: '@groupAlumniPastMonthLeaderboard'
  });

  groupAlumniPastMonthLeaderboardRoute.as('groupAlumniPastMonthLeaderboardRoute');

  cy.fixture('api/groups/leaderboard/get/alumniPastWeek.json').as('groupAlumniPastWeekLeaderboard');

  const groupAlumniPastWeekLeaderboardRoute = cy.route({
    method: 'GET',
    url: '**/api/v2/groups/leaderboard/1/week',
    response: '@groupAlumniPastWeekLeaderboard'
  });

  groupAlumniPastWeekLeaderboardRoute.as('groupAlumniPastWeekLeaderboardRoute');
});

Cypress.Commands.add('mockGroupMembersAPI', () => {
  cy.fixture('api/groups/members/get/alumniAdminPending.json').as('groupAlumniAdminPendingMembers');
  cy.fixture('api/groups/members/get/alumni.json').as('groupAlumniMembers');

  const groupAlumniMembersRoute = cy.route({
    method: 'GET',
    url: '**/api/v2/groups/members/1',
    response: '@groupAlumniMembers'
  });

  groupAlumniMembersRoute.as('groupAlumniMembersRoute');

  cy.fixture('api/groups/members/put/andy.json').as('groupAlumniUpdateAndy');

  const groupAlumniUpdateAndyRoute = cy.route({
    method: 'PUT',
    url: '**/api/v2/groups/members/1/andy',
    response: '@groupAlumniUpdateAndy'
  });

  groupAlumniUpdateAndyRoute.as('groupAlumniUpdateAndyRoute');

  cy.fixture('api/groups/members/put/Tom.json').as('groupAlumniUpdateTom');

  const groupAlumniUpdateTomRoute = cy.route({
    method: 'PUT',
    url: '**/api/v2/groups/members/1/Tom',
    response: '@groupAlumniUpdateTom'
  });

  groupAlumniUpdateTomRoute.as('groupAlumniUpdateTomRoute');

  cy.fixture('api/groups/members/delete/andy.json').as('groupAlumniDeleteAndy');

  const groupAlumniDeleteAndyRoute = cy.route({
    method: 'DELETE',
    url: '**/api/v2/groups/members/1/andy',
    response: '@groupAlumniDeleteAndy'
  });

  groupAlumniDeleteAndyRoute.as('groupAlumniDeleteAndyRoute');
});

Cypress.Commands.add('mockGroupStatisticsAPI', () => {
  cy.fixture('api/groups/statistics/get/alumni.json').as('groupAlumniStatistics');

  const groupAlumniStatisticsRoute = cy.route({
    method: 'GET',
    url: '**/api/v2/groups/statistics/1',
    response: '@groupAlumniStatistics'
  });

  groupAlumniStatisticsRoute.as('groupAlumniStatisticsRoute');
});

Cypress.Commands.add('mockGroupTeamAPI', () => {
  cy.fixture('api/groups/team/get/alumni.json').as('groupAlumniTeam');

  const groupAlumniTeamRoute = cy.route({
    method: 'GET',
    url: '**/api/v2/groups/team/1',
    response: '@groupAlumniTeam'
  });

  groupAlumniTeamRoute.as('groupAlumniTeamRoute');
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

  cy.fixture('api/logFeed/get/groupAlumniPageOne.json').as('logFeedGroupAlumniPageOne');

  const logFeedGroupAlumniPageOneRoute = cy.route({
    method: 'GET',
    url: '**/api/v2/log_feed/group/1/10/0',
    response: '@logFeedGroupAlumniPageOne'
  });

  logFeedGroupAlumniPageOneRoute.as('logFeedGroupAlumniPageOneRoute');

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

Cypress.Commands.add('mockTeamSearchAPI', () => {
  cy.fixture('api/teams/search/get/a.json').as('teamSearchA');

  const teamSearchARoute = cy.route({
    method: 'GET',
    url: '**/api/v2/teams/search/A/6',
    response: '@teamSearchA'
  });

  teamSearchARoute.as('teamSearchARoute');

  cy.fixture('api/teams/search/get/an.json').as('teamSearchAn');

  const teamSearchAnRoute = cy.route({
    method: 'GET',
    url: '**/api/v2/teams/search/An/6',
    response: '@teamSearchAn'
  });

  teamSearchAnRoute.as('teamSearchAnRoute');

  cy.fixture('api/teams/search/get/and.json').as('teamSearchAnd');

  const teamSearchAndRoute = cy.route({
    method: 'GET',
    url: '**/api/v2/teams/search/And/6',
    response: '@teamSearchAnd'
  });

  teamSearchAndRoute.as('teamSearchAndRoute');

  cy.fixture('api/teams/search/get/andy.json').as('teamSearchAndy');

  const teamSearchAndyRoute = cy.route({
    method: 'GET',
    url: '**/api/v2/teams/search/Andy/6',
    response: '@teamSearchAndy'
  });

  teamSearchAndyRoute.as('teamSearchAndyRoute');
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
  cy.fixture('api/users/groups/get/andyAdmin.json').as('userGroupsAndyAdmin');
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
  cy.fixture('api/users/memberships/get/andyAdmin.json').as('userMembershipsAndyAdmin');
  cy.fixture('api/users/memberships/get/andy.json').as('userMembershipsAndy');

  const userMembershipsAndyRoute = cy.route({
    method: 'GET',
    url: '**/api/v2/users/memberships/andy',
    response: '@userMembershipsAndy'
  });

  userMembershipsAndyRoute.as('userMembershipsAndyRoute');

  cy.fixture('api/users/memberships/put/joinXCAlumniGroup.json').as('userMembershipsJoinXCAlumniGroup');

  const userMembershipsJoinXCAlumniGroupRoute = cy.route({
    method: 'PUT',
    url: '**/api/v2/users/memberships/andy',
    response: '@userMembershipsJoinXCAlumniGroup'
  });

  userMembershipsJoinXCAlumniGroupRoute.as('userMembershipsJoinXCAlumniGroupRoute');
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
  cy.mockUassetUserFnAPI();
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

Cypress.Commands.add('mockUassetUserFnAPI', () => {
  cy.fixture('fn/uasset/user/success.json').as('uassetUserSuccessFn');

  const uassetUserSuccessFnRoute = cy.route({
    method: 'POST',
    url: '**/fn/uasset/user',
    response: '@uassetUserSuccessFn',
    status: 200
  });

  uassetUserSuccessFnRoute.as('uassetUserSuccessFnRoute');
});
