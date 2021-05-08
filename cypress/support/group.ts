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

Cypress.Commands.add('groupAPICalls', () => {
  cy.wait('@alumniGroup');
  cy.wait('@alumniGroupMembers');
  cy.wait('@userGroups');
  cy.wait('@alumniLogFeedPageOne');
});

Cypress.Commands.add('alumniGroupMockAPICalls', () => {
  cy.wait('@groupAlumniRoute');
  cy.wait('@groupAlumniMembersRoute');
  cy.wait('@logFeedGroupAlumniPageOneRoute');
  cy.wait('@userGroupsAndyRoute');
});

Cypress.Commands.add(
  'groupLeaderboardFiltersSelected',
  (run: boolean, bike: boolean, swim: boolean, other: boolean) => {
    cy.get('.leaderboardFilterButtons')
      .contains('Run')
      .parent()
      .should(run ? 'not.have.class' : 'have.class', 'aj-outlined-button')
      .should(run ? 'have.class' : 'not.have.class', 'aj-contained-button');
    cy.get('.leaderboardFilterButtons')
      .contains('Bike')
      .parent()
      .should(bike ? 'not.have.class' : 'have.class', 'aj-outlined-button')
      .should(bike ? 'have.class' : 'not.have.class', 'aj-contained-button');
    cy.get('.leaderboardFilterButtons')
      .contains('Swim')
      .parent()
      .should(swim ? 'not.have.class' : 'have.class', 'aj-outlined-button')
      .should(swim ? 'have.class' : 'not.have.class', 'aj-contained-button');
    cy.get('.leaderboardFilterButtons')
      .contains('Other')
      .parent()
      .should(other ? 'not.have.class' : 'have.class', 'aj-outlined-button')
      .should(other ? 'have.class' : 'not.have.class', 'aj-contained-button');
  }
);
