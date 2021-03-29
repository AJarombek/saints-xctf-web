/**
 * E2E tests written with Cypress for the dashboard page once a user is signed in.  These E2E tests used mocked API
 * calls.
 * @author Andrew Jarombek
 * @since 10/18/2020
 */

describe('Dashboard Mock E2E Tests', () => {
  beforeEach(() => {
    cy.mockAPI();
    cy.mockAuthAPI();
    cy.setUserInLocalStorage();
    cy.setMockTokenInLocalStorage();
  });

  it('can delete a log', () => {
    cy.visit('/dashboard');
    cy.andyDashboardMockAPICalls();

    cy.get('.deleteLogModal').should('not.exist');
    cy.get('#logFeed .exerciseLog').should('have.length', 4);

    cy.get('#logFeed .exerciseLog').eq(2).trigger('mouseover');
    cy.get('#logFeed .exerciseLog').eq(2).find('.options').click();
    cy.get('#logFeed .exerciseLog').eq(2).find('.delete').click();

    cy.get('.deleteLogModal').should('exist');
    cy.get('.deleteLogModal').should(
      'contain.text',
      'Are you sure you want to delete your Oct. 18th exercise log "Central Park"?'
    );

    cy.get('.deleteLogModal button').contains('CANCEL').click();

    cy.get('.deleteLogModal').should('not.exist');
    cy.get('#logFeed .exerciseLog').should('have.length', 4);

    cy.get('#logFeed .exerciseLog').eq(2).find('.delete').click();
    cy.get('.deleteLogModal').should('exist');

    cy.fixture('api/logFeed/get/allPageOneAfterDelete.json').as('logFeedAfterDelete');

    const logFeedAfterDeleteRoute = cy.route({
      method: 'GET',
      url: '**/api/v2/log_feed/all/all/10/0',
      response: '@logFeedAfterDelete'
    });

    logFeedAfterDeleteRoute.as('logFeedAfterDeleteRoute');

    cy.get('.deleteLogModal button').contains('DELETE').click();
    cy.wait('@logDeleteSuccessRoute');
    cy.wait('@logFeedAfterDeleteRoute');

    cy.get('#logFeed .exerciseLog').should('have.length', 3);
  });

  it('can navigate to the edit log page for the current users log', () => {
    cy.visit('/dashboard');
    cy.andyDashboardMockAPICalls();

    cy.get('#logFeed .exerciseLog').should('have.length', 4);
    cy.get('#logFeed .exerciseLog').eq(1).trigger('mouseover');
    cy.get('#logFeed .exerciseLog').eq(1).find('.options').click();
    cy.get('#logFeed .exerciseLog').eq(1).find('.edit').click();

    cy.wait('@logGet3Route');
    cy.url().should('include', `${Cypress.config('baseUrl')}/log/edit/`);
  });

  it("can't navigate to the edit log page for another users log", () => {
    cy.visit('/dashboard');
    cy.andyDashboardMockAPICalls();

    cy.get('#logFeed .exerciseLog').should('have.length', 4);
    cy.get('#logFeed .exerciseLog').eq(0).trigger('mouseover');
    cy.get('#logFeed .exerciseLog').eq(0).find('.options').should('not.exist');
  });
});
