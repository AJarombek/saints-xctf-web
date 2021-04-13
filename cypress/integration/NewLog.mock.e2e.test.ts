/**
 * E2E tests written with Cypress for the log creation page.  These E2E tests use mocked API calls.
 * @author Andrew Jarombek
 * @since 4/2/2021
 */

import * as moment from 'moment';

describe('New Log Mock E2E Tests', () => {
  beforeEach(() => {
    cy.mockAPI();
    cy.mockAuthAPI();
    cy.mockFnAPI();
    cy.setUserInLocalStorage();
    cy.setMockTokenInLocalStorage();
    cy.visit('/log/new');
  });

  it('shows an error modal if log creation fails', () => {
    cy.wait('@userGroupsAndyRoute');
    const formattedDate = moment().format('YYYY-MM-DD');

    cy.get('.sxctf-image-input input[name="name"]').type('Test Run');
    cy.get('.sxctf-image-input input[name="location"]').type('New York, NY');
    cy.get('.sxctf-image-input input[name="date"]').type(formattedDate);
    cy.get('.sxctf-image-input input[name="distance"]').type('2.8');
    cy.get('.sxctf-image-input input[name="time"]').type('2045');
    cy.get('textarea').type('Running Log Generated from E2E Tests');

    const logCreateErrorRoute = cy.route({
      method: 'POST',
      url: '**/api/v2/logs',
      response: {
        self: '/v2/logs',
        added: false,
        log: null,
        error: 'failed to create a new log'
      },
      status: 500
    });

    logCreateErrorRoute.as('logCreateErrorRoute');

    cy.get('button').contains('Create').click();
    cy.wait('@logCreateErrorRoute');

    cy.getDataCy('alert').should('exist');
    cy.getDataCy('alert').should(
      'contain.text',
      'An unexpected error occurred while creating an exercise log. Try reloading the page. If this error persists, ' +
        'contact andrew@jarombek.com.'
    );
  });
});
