/**
 * Custom Cypress commands that are shared amongst many pages of the website.
 * @author Andrew Jarombek
 * @since 4/15/2021
 */

import * as moment from 'moment';

Cypress.Commands.add('paginationBarPageOne', () => {
  cy.get('#paginationBar').contains(1).should('exist');
  cy.get('#paginationBar').contains(2).should('exist');
  cy.get('#paginationBar').contains(3).should('exist');
  cy.get('#paginationBar').contains(4).should('not.exist');
  cy.get('#paginationBar').contains('...').should('not.exist');
});

Cypress.Commands.add('paginationBarPageThree', () => {
  cy.get('#paginationBar').contains(1).should('exist');
  cy.get('#paginationBar').contains(2).should('exist');
  cy.get('#paginationBar').contains(3).should('exist');
  cy.get('#paginationBar').contains(4).should('exist');
  cy.get('#paginationBar').contains(5).should('exist');
  cy.get('#paginationBar').contains(6).should('not.exist');
  cy.get('#paginationBar').contains('...').should('not.exist');
});

Cypress.Commands.add('paginationBarPageFive', () => {
  cy.get('#paginationBar').contains(1).should('exist');
  cy.get('#paginationBar').contains(2).should('not.exist');
  cy.get('#paginationBar').contains(3).should('exist');
  cy.get('#paginationBar').contains(4).should('exist');
  cy.get('#paginationBar').contains(5).should('exist');
  cy.get('#paginationBar').contains(6).should('exist');
  cy.get('#paginationBar').contains(7).should('exist');
  cy.get('#paginationBar').contains(8).should('not.exist');
  cy.get('#paginationBar').contains('...').should('exist');
});

Cypress.Commands.add(
  'createRangeViewRoute',
  (
    routeName: string,
    rangeItems: { feel: number; miles: number }[],
    amount: moment.DurationInputArg1,
    unit: moment.DurationInputArg2,
    subtracting = true
  ) => {
    let start: moment.Moment;

    if (subtracting) {
      start = moment().subtract(amount, unit).startOf('month').startOf('week');
    } else {
      start = moment().add(amount, unit).startOf('month').startOf('week');
    }

    if (start.date() !== 1) {
      start.add(1, 'day');
    } else {
      start.subtract(6, 'day');
    }

    const end = start.clone().add(6, 'weeks').subtract(1, 'day');
    const url = `/api/v2/range_view/users/andy/r/${start.format('YYYY-MM-DD')}/${end.format('YYYY-MM-DD')}`;

    const rangeView = rangeItems
      .map((item, index) => ({
        ...item,
        date: start.clone().add(index, 'day').format('ddd, DD MMM YYYY hh:mm:ss')
      }))
      .filter((item) => item.miles);

    cy.route({
      method: 'GET',
      url,
      response: {
        range_view: rangeView,
        self: url
      }
    }).as(routeName);
  }
);
