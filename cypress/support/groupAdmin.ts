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

Cypress.Commands.add('groupDetailsFormValues', (description: string, weekStart: 'sunday' | 'monday') => {
  cy.get('textarea').invoke('val').should('equal', description);
  cy.getDataCy('radioButton')
    .find('input[id="sunday"]:checked')
    .should(weekStart === 'sunday' ? 'exist' : 'not.exist');
  cy.getDataCy('radioButton')
    .find('input[id="monday"]:checked')
    .should(weekStart === 'monday' ? 'exist' : 'not.exist');
});
