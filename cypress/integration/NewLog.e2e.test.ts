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

  it("'Profile' header button navigates to the signed in user's profile page", () => {
    cy.route('GET', '/api/v2/users/groups/andy').as('andyGroups');

    cy.visit('/log/new');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/log/new`);
    cy.wait('@andyGroups');
    cy.get('.profileButton').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/profile/andy`);
  });

  it("'Teams' header button navigates to the teams list page", () => {
    cy.route('GET', '/api/v2/users/groups/andy').as('andyGroups');

    cy.visit('/log/new');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/log/new`);
    cy.wait('@andyGroups');
    cy.get('.teamsButton').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/teams`);
  });

  it("'Sign Out' header button signs out the user and navigates to the home page", () => {
    cy.route('GET', '/api/v2/users/groups/andy').as('andyGroups');

    cy.visit('/log/new');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/log/new`);
    cy.wait('@andyGroups');
    cy.get('.signOutButton').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/`);
  });

  it('header title navigates to the dashboard page', () => {
    cy.route('GET', '/api/v2/users/groups/andy').as('andyGroups');

    cy.visit('/log/new');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/log/new`);
    cy.wait('@andyGroups');
    cy.get('h1').contains('SaintsXCTF').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/dashboard`);
  });

  it('header icon navigates to the dashboard page', () => {
    cy.route('GET', '/api/v2/users/groups/andy').as('andyGroups');

    cy.visit('/log/new');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/log/new`);
    cy.wait('@andyGroups');
    cy.get('.sxctf-nav-bar .sxctf-logo').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/dashboard`);
  });

  it('able to create a new running exercise log', () => {
    const formattedDate = moment().format('YYYY-MM-DD');
    const finalFormattedDate = moment().format('MMM. Do, YYYY');

    cy.visit('/log/new');
    cy.get('.sxctf-image-input input[name="name"]').type('Test Run');
    cy.get('.sxctf-image-input input[name="location"]').type('New York, NY');
    cy.get('.sxctf-image-input input[name="date"]').type(formattedDate);
    cy.get('.sxctf-image-input input[name="distance"]').type('5');
    cy.get('.sxctf-image-input input[name="time"]').type('3625');
    cy.get('textarea').type('Running Log Generated from E2E Tests');
    cy.get('button').contains('Create').click();

    cy.url().should('equal', `${Cypress.config('baseUrl')}/dashboard`);

    cy.get('#logFeed .exerciseLog').should('have.length', 10);
    cy.get('#logFeed .exerciseLog').eq(0).findDataCy('exerciseLogUser').should('contain.text', 'Andy Jarombek');
    cy.get('#logFeed .exerciseLog').eq(0).findDataCy('exerciseLogTitle').should('contain.text', 'Test Run');
    cy.get('#logFeed .exerciseLog').eq(0).findDataCy('exerciseLogDate').should('contain.text', finalFormattedDate);
    cy.get('#logFeed .exerciseLog').eq(0).findDataCy('exerciseLogType').should('contain.text', 'RUN');
    cy.get('#logFeed .exerciseLog').eq(0).findDataCy('exerciseLogLocation').should('contain.text', 'New York, NY');
    cy.get('#logFeed .exerciseLog').eq(0).findDataCy('exerciseLogDistance').should('contain.text', '5 miles');
    cy.get('#logFeed .exerciseLog').eq(0).findDataCy('exerciseLogTimePace').should('contain.text', '36:25 (7:17/mi)');
    cy.get('#logFeed .exerciseLog')
      .eq(0)
      .findDataCy('exerciseLogDescription')
      .should('contain.text', 'Running Log Generated from E2E Tests');
  });

  it.skip('able to create a new biking exercise log', () => {});

  it.skip('able to create a new swimming exercise log', () => {});

  it.skip("able to create a new 'other' exercise log", () => {});

  it.skip('unable to create an exercise log with a future date', () => {});

  it.skip('required fields must be entered', () => {});

  it.skip('only valid distances can be entered', () => {});

  it.skip('only valid time can be entered', () => {});

  it.skip('feeling slider works as expected', () => {});

  it.skip("clicking 'Cancel' returns to the dashboard", () => {});
});
