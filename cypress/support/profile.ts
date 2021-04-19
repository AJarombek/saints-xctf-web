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

Cypress.Commands.add(
  'profileDetailsFormValues',
  (
    first: string,
    last: string,
    email: string,
    classYear: string,
    location: string,
    favoriteEvent: string,
    description: string,
    weekStart: 'sunday' | 'monday'
  ) => {
    cy.getImageInput('first').invoke('val').should('equal', first);
    cy.getImageInput('last').invoke('val').should('equal', last);
    cy.getImageInput('email').invoke('val').should('equal', email);
    cy.getImageInput('classYear').invoke('val').should('equal', classYear);
    cy.getImageInput('location').invoke('val').should('equal', location);
    cy.getImageInput('favoriteEvent').invoke('val').should('equal', favoriteEvent);
    cy.get('textarea').invoke('val').should('equal', description);

    cy.getDataCy('radioButton')
      .find('input[id="sunday"]:checked')
      .should(weekStart === 'sunday' ? 'exist' : 'not.exist');
    cy.getDataCy('radioButton')
      .find('input[id="monday"]:checked')
      .should(weekStart === 'monday' ? 'exist' : 'not.exist');
  }
);
