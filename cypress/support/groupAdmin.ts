/**
 * Custom Cypress commands used on a group admin page.
 * @author Andrew Jarombek
 * @since 5/10/2021
 */

Cypress.Commands.add('alumniGroupAdminMockAPICalls', () => {
  cy.wait('@userGroupsAndyRoute');
  cy.wait('@groupAlumniMembersRoute');
  cy.wait('@groupAlumniRoute');
  cy.wait('@groupAlumniTeamRoute');
});
