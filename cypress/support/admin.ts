/**
 * Custom Cypress commands used on the admin pages.
 * @author Andrew Jarombek
 * @since 5/9/2021
 */

Cypress.Commands.add('andyAdminMemberships', () => {
  const userGroupsAndyRoute = cy.route({
    method: 'GET',
    url: '**/api/v2/users/groups/andy',
    response: '@userGroupsAndyAdmin'
  });

  userGroupsAndyRoute.as('userGroupsAndyRoute');

  const userMembershipsAndyRoute = cy.route({
    method: 'GET',
    url: '**/api/v2/users/memberships/andy',
    response: '@userMembershipsAndyAdmin'
  });

  userMembershipsAndyRoute.as('userMembershipsAndyAdminRoute');
});
