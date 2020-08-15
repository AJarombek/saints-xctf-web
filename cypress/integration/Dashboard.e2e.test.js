/**
 * E2E tests written with Cypress for the dashboard page once a user is signed in.
 * I hope you are doing well.  Have a fun and happy weekend :).  Love always supports you.
 * @author Andrew Jarombek
 * @since 8/13/2020
 */

describe('Dashboard E2E Tests', () => {

  beforeEach(() => {
    cy.server();
    cy.setUserInLocalStorage();
  });

  it('has a side panel with expandable accordions', () => {
    cy.route('GET', '/api/v2/users/groups/andy').as('userGroups');
    cy.visit('/dashboard');

    cy.wait('@userGroups').then(() => {
      cy.get('#groupsAccordion .groupMember').should('have.length', 1);

      cy.get('#dashboardSidePanel .accordion .expandIcon').eq(2).click();
      cy.get('#groupsAccordion .groupMember').should('have.length', 0);

      cy.get('#dashboardSidePanel .accordion .expandIcon').eq(2).click();
      cy.get('#groupsAccordion .groupMember').should('have.length', 1);

      cy.get('#dashboardSidePanel .accordion .expandIcon').eq(3).click();
    });
  });

  it('displays a no group message if the user has no groups', () => {
    cy.visit('/dashboard');

    cy.route('GET', '/api/v2/users/groups/andy', {
      "groups": [],
      "self": "/v2/users/groups/andy"
    }).as('userGroupsMock');

    cy.wait('@userGroupsMock').then(() => {
      cy.get('#groupsAccordion .groupMember')
        .should('have.length', 0);

      cy.get('#groupsAccordion p')
        .contains('You have no group memberships.')
        .should('exist');

      cy.get('#groupsAccordion button').contains('Join Groups').should('exist');

      cy.get('#groupsAccordion .expandIcon').click();

      cy.get('#groupsAccordion .groupMember')
        .should('have.length', 0);
    });
  });
});
