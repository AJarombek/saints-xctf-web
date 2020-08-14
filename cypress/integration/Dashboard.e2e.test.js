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
    cy.visit('/dashboard');
  });

  it('has a side panel with expandable accordions', () => {
    cy.route('GET', '/api/v2/users/groups/andy').as('userGroups');

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
    cy.route('GET', '/api/v2/users/groups/andy', {
      "groups": [],
      "self": "/v2/users/groups/andy"
    }).as('userGroupsMock');

    cy.wait('@userGroupsMock').then(() => {
      cy.get('#groupsAccordion .groupMember')
        .should('have.length', 0);

      cy.get('#groupsAccordion .expandIcon').click();

      cy.get('#groupsAccordion .groupMember')
        .should('have.length', 0);
    });
  });
});
