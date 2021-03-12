// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/commands.d.ts" />

/**
 * E2E tests written with Cypress for a users profile page.
 * @author Andrew Jarombek
 * @since 11/7/2020
 */

describe('Profile E2E Tests', () => {
  beforeEach(() => {
    cy.server();
    cy.setUserInLocalStorage();
    cy.setTokenInLocalStorage();
  });

  it('has multiple tabs that can be navigated between', () => {
    cy.visit('/profile/andy');

    // The default tab is the exercise logs tab.
    cy.get('section #logFeed').should('exist');
    cy.get('section #monthlyCalendar').should('not.exist');

    cy.get('.tabs p').contains('Monthly Calendar').click();
    cy.get('section #logFeed').should('not.exist');
    cy.get('section #monthlyCalendar').should('exist');

    cy.get('.tabs p').contains('Weekly Chart').click();
    cy.get('section #logFeed').should('not.exist');
    cy.get('section #monthlyCalendar').should('not.exist');

    cy.get('.tabs p').contains('Details').click();
    cy.get('section #logFeed').should('not.exist');
    cy.get('section #monthlyCalendar').should('not.exist');

    cy.get('.tabs p').contains('Edit Profile').click();
    cy.get('section #logFeed').should('not.exist');
    cy.get('section #monthlyCalendar').should('not.exist');

    cy.get('.tabs p').contains('Exercise Logs').click();
    cy.get('section #logFeed').should('exist');
    cy.get('section #monthlyCalendar').should('not.exist');
  });
});
