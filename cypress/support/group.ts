/**
 * Custom Cypress commands used on group pages.
 * @author Andrew Jarombek
 * @since 3/29/2021
 */

Cypress.Commands.add('groupRouteAliases', () => {
  cy.route('GET', '/api/v2/groups/1').as('alumniGroup');
  cy.route('GET', '/api/v2/groups/members/1').as('alumniGroupMembers');
  cy.route('GET', '/api/v2/users/groups/andy').as('userGroups');
  cy.route('GET', '/api/v2/log_feed/group/1/10/0').as('alumniLogFeedPageOne');
});