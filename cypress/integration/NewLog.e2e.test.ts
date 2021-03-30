/**
 * E2E tests written with Cypress for the create new exercise log page.
 * @author Andrew Jarombek
 * @since 3/29/2021
 */

import * as moment from 'moment';

describe('New Log E2E Tests', () => {
  beforeEach(() => {
    cy.server();
    cy.setUserInLocalStorage();
    cy.setTokenInLocalStorage();
  });

  it('able to create a new running exercise log', () => {
    const formattedDate = moment().subtract(1, 'day').format('YYYY-MM-DD');

    cy.visit('/log/new');
    cy.get('.sxctf-image-input input[name="name"]').type('Test Run');
    cy.get('.sxctf-image-input input[name="location"]').type('New York, NY');
    cy.get('.sxctf-image-input input[name="date"]').type(formattedDate);
    cy.get('.sxctf-image-input input[name="distance"]').type('5');
    cy.get('.sxctf-image-input input[name="time"]').type('3625');
    cy.get('textarea').type('Running Log Generated from E2E Tests');
    cy.get('button').contains('Create').click();

    cy.url().should('equal', `${Cypress.config('baseUrl')}/dashboard`);
  });
});
