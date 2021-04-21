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

Cypress.Commands.add(
  'profileDetailsFormValidation',
  (
    firstStatus: ImageInputStatusClass,
    firstVisible: boolean,
    lastStatus: ImageInputStatusClass,
    lastVisible: boolean,
    emailStatus: ImageInputStatusClass,
    emailVisible: boolean,
    saveButtonEnabled: boolean
  ) => {
    cy.imageInputValidationCheck('first', firstStatus);
    cy.getDataCy('firstNameInputTip').should(firstVisible ? 'have.attr' : 'not.have.attr', 'hidden');
    cy.imageInputValidationCheck('last', lastStatus);
    cy.getDataCy('lastNameInputTip').should(lastVisible ? 'have.attr' : 'not.have.attr', 'hidden');
    cy.imageInputValidationCheck('email', emailStatus);
    cy.getDataCy('emailInputTip').should(emailVisible ? 'have.attr' : 'not.have.attr', 'hidden');
    cy.get('.aj-contained-button > button')
      .contains('Save Details')
      .parent()
      .should(saveButtonEnabled ? 'not.have.attr' : 'have.attr', 'disabled');
  }
);
