/**
 * E2E tests written with Cypress for a users profile page when viewed on a mobile screen.
 * @author Andrew Jarombek
 * @since 5/27/2021
 */

describe('Profile Mobile E2E Tests', () => {
  beforeEach(() => {
    cy.server();
    cy.viewport(400, 800);
    cy.setUserInLocalStorage();
    cy.setTokenInLocalStorage();
  });

  it("'Dashboard' navbar dropdown link navigates to the dashboard page", () => {
    cy.visit('/profile/andy');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/profile/andy`);
    cy.get('.sxctf-nav-hamburger').click();
    cy.get('.aj-nav-list-item').contains('Dashboard').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/dashboard`);
  });

  it("'Teams' navbar dropdown link navigates to the team list page", () => {
    cy.visit('/profile/andy');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/profile/andy`);
    cy.get('.sxctf-nav-hamburger').click();
    cy.get('.aj-nav-list-item').contains('Teams').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/teams`);
  });

  it("'Create New Log' navbar dropdown link navigates to the new log page", () => {
    cy.visit('/profile/andy');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/profile/andy`);
    cy.get('.sxctf-nav-hamburger').click();
    cy.get('.aj-nav-list-item').contains('Create New Log').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/log/new`);
  });

  it("'Admin' navbar dropdown link navigates to the admin list page", () => {
    cy.visit('/profile/andy');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/profile/andy`);
    cy.get('.sxctf-nav-hamburger').click();
    cy.get('.aj-nav-list-item').contains('Admin').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/admin`);
  });

  it("'Sign Out' navbar dropdown link signs the user out and navigates to the home page", () => {
    cy.visit('/profile/andy');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/profile/andy`);
    cy.get('.sxctf-nav-hamburger').click();
    cy.get('.aj-nav-list-item').contains('Sign Out').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/`);
  });

  it('Has a dropdown that switches between profile page tabs', () => {
    cy.visit('/profile/andy');
    cy.get('.mobileTabsSelect').click();
    cy.get('.mobileTabsSelect > ul > li').should('have.length', 5);
    cy.get('.mobileTabsSelect > ul > li').eq(0).should('contain.text', 'Exercise Logs');
    cy.get('.mobileTabsSelect > ul > li').eq(1).should('contain.text', 'Monthly Calendar');
    cy.get('.mobileTabsSelect > ul > li').eq(2).should('contain.text', 'Weekly Chart');
    cy.get('.mobileTabsSelect > ul > li').eq(3).should('contain.text', 'Details');
    cy.get('.mobileTabsSelect > ul > li').eq(4).should('contain.text', 'Edit Profile');

    cy.get('section #logFeed').should('exist');
    cy.get('section #monthlyCalendar').should('not.exist');
    cy.get('section #weeklyChart').should('not.exist');
    cy.get('section #profileDetails').should('not.exist');
    cy.get('section #editProfile').should('not.exist');

    cy.get('.mobileTabsSelect > ul > li').eq(1).click();
    cy.get('section #logFeed').should('not.exist');
    cy.get('section #monthlyCalendar').should('exist');
    cy.get('section #weeklyChart').should('not.exist');
    cy.get('section #profileDetails').should('not.exist');
    cy.get('section #editProfile').should('not.exist');

    cy.get('.mobileTabsSelect').click();
    cy.get('.mobileTabsSelect > ul > li').eq(2).click();
    cy.get('section #logFeed').should('not.exist');
    cy.get('section #monthlyCalendar').should('not.exist');
    cy.get('section #weeklyChart').should('exist');
    cy.get('section #profileDetails').should('not.exist');
    cy.get('section #editProfile').should('not.exist');

    cy.get('.mobileTabsSelect').click();
    cy.get('.mobileTabsSelect > ul > li').eq(3).click();
    cy.get('section #logFeed').should('not.exist');
    cy.get('section #monthlyCalendar').should('not.exist');
    cy.get('section #weeklyChart').should('not.exist');
    cy.get('section #profileDetails').should('exist');
    cy.get('section #editProfile').should('not.exist');

    cy.get('.mobileTabsSelect').click();
    cy.get('.mobileTabsSelect > ul > li').eq(4).click();
    cy.get('section #logFeed').should('not.exist');
    cy.get('section #monthlyCalendar').should('not.exist');
    cy.get('section #weeklyChart').should('not.exist');
    cy.get('section #profileDetails').should('not.exist');
    cy.get('section #editProfile').should('exist');

    cy.get('.mobileTabsSelect').click();
    cy.get('.mobileTabsSelect > ul > li').eq(0).click();
    cy.get('section #logFeed').should('exist');
    cy.get('section #monthlyCalendar').should('not.exist');
    cy.get('section #weeklyChart').should('not.exist');
    cy.get('section #profileDetails').should('not.exist');
    cy.get('section #editProfile').should('not.exist');
  });
});
