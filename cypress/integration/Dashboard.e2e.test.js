/**
 * E2E tests written with Cypress for the dashboard page once a user is signed in.
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
      cy.get('#dashboardSidePanel .accordion .expandIcon').eq(2).click();
      cy.get('#dashboardSidePanel .accordion .expandIcon').eq(3).click();
    });
  });

});
