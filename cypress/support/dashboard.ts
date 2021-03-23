/**
 * Custom Cypress commands used on the dashboard page.
 * @author Andrew Jarombek
 * @since 3/22/2021
 */

Cypress.Commands.add('dashboardRouteAliases', () => {
  cy.route('GET', '/api/v2/log_feed/all/all/10/0').as('logFeedPageOne');
  cy.route('GET', '/api/v2/users/notifications/andy').as('userNotifications');
  cy.route('GET', '/api/v2/users/memberships/andy').as('userMemberships');
  cy.route('GET', '/api/v2/users/groups/andy').as('userGroups');
  cy.route('GET', '/api/v2/teams/groups/friends').as('teamGroupsFriends');
  cy.route('GET', '/api/v2/teams/groups/saintsxctf').as('teamGroupsSaintsXCTF');
  cy.route('GET', '/api/v2/teams/groups/saintsxctf_alumni').as('teamGroupsAlumni');
});

Cypress.Commands.add('andyDashboardAPICalls', () => {
  cy.wait('@logFeedPageOne');
  cy.wait('@userNotifications');
  cy.wait('@userMemberships');
  cy.wait('@userGroups');
  cy.wait('@teamGroupsFriends');
  cy.wait('@teamGroupsSaintsXCTF');
  cy.wait('@teamGroupsAlumni');
});
