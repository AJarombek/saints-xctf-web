/**
 * E2E tests written with Cypress for the dashboard page once a user is signed in.  These E2E tests used mocked API
 * calls.
 * @author Andrew Jarombek
 * @since 10/18/2020
 */

describe('Dashboard Mock E2E Tests', () => {
  beforeEach(() => {
    cy.mockAPI();
    cy.mockAuth();
    cy.setUserInLocalStorage();
    cy.setTokenInLocalStorage();
  });

  it('can delete a log', () => {
    cy.visit('/dashboard');
    cy.wait('@logFeedAllPageOneRoute');

    cy.get('.deleteLogModal').should('not.exist');
    cy.get('#logFeed .exerciseLog').should('have.length', 2);

    cy.get('#logFeed .exerciseLog').eq(0).trigger('mouseover')
    cy.get('#logFeed .exerciseLog').eq(0).find('.options').click();
    cy.get('#logFeed .exerciseLog').eq(0).find('.delete').click();

    cy.get('.deleteLogModal').should('exist');
    cy.get('.deleteLogModal')
      .should('contain.text', 'Are you sure you want to delete your Oct. 18th exercise log "Central Park"?');

    cy.get('.deleteLogModal button').contains('CANCEL').click();

    cy.get('.deleteLogModal').should('not.exist');
    cy.get('#logFeed .exerciseLog').should('have.length', 2);

    cy.get('#logFeed .exerciseLog').eq(0).find('.delete').click();
    cy.get('.deleteLogModal').should('exist');

    cy.fixture('logFeed/get/allPageOneAfterDelete.json').as('logFeedAfterDelete');

    const logFeedAfterDeleteRoute = cy.route({
      method: 'GET',
      url: '**/api/v2/log_feed/all/all/10/0',
      response: '@logFeedAfterDelete'
    });

    logFeedAfterDeleteRoute.as('logFeedAfterDeleteRoute');

    cy.get('.deleteLogModal button').contains('DELETE').click();
    cy.wait('@logDeleteRoute');
    cy.wait('@logFeedAfterDeleteRoute');

    cy.get('#logFeed .exerciseLog').should('have.length', 1);
  });
});
