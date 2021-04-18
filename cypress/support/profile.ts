/**
 * Custom Cypress commands used on a profile page.
 * @author Andrew Jarombek
 * @since 4/12/2021
 */

Cypress.Commands.add('profileRouteAliases', () => {
  cy.route('GET', '/api/v2/users/memberships/andy').as('userMembershipsAndy');
  cy.route('GET', '/api/v2/users/flair/andy').as('userFlairAndy');
  cy.route('GET', '/api/v2/users/groups/andy').as('userGroupsAndy');
  cy.route('GET', '/api/v2/log_feed/user/andy/10/0').as('logFeedPageOneAndy');
});

Cypress.Commands.add('profileAPICalls', () => {
  cy.wait('@userMembershipsAndy');
  cy.wait('@userFlairAndy');
  cy.wait('@userGroupsAndy');
  cy.wait('@logFeedPageOneAndy');
});

Cypress.Commands.add('profileMockAPICalls', () => {
  cy.wait('@userMembershipsAndyRoute');
  cy.wait('@userFlairAndyRoute');
  cy.wait('@userGroupsAndyRoute');
  cy.wait('@logFeedUserAndyPageOneRoute');
});