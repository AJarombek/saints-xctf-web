/**
 * E2E tests written with Cypress for the group admin page when viewed on a mobile device.
 * These E2E tests used mocked API calls.
 * @author Andrew Jarombek
 * @since 5/28/2021
 */

describe('Group Admin Mobile E2E Tests', () => {
  beforeEach(() => {
    cy.viewport(400, 800);
    cy.mockAPI();
    cy.mockAuthAPI();
    cy.setUserInLocalStorage();
    cy.setMockTokenInLocalStorage();
  });

  it("'Dashboard' header button navigates to the dashboard page", () => {
    cy.andyAdminMemberships();
    cy.visit('/admin/group/1');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/admin/group/1`);
    cy.get('.sxctf-nav-hamburger').click();
    cy.get('.aj-nav-list-item').contains('Dashboard').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/dashboard`);
  });

  it("'Profile' navbar dropdown link navigates to the signed in users profile page", () => {
    cy.andyAdminMemberships();
    cy.visit('/admin/group/1');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/admin/group/1`);
    cy.get('.sxctf-nav-hamburger').click();
    cy.get('.aj-nav-list-item').contains('Profile').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/profile/andy`);
  });

  it("'Teams' navbar dropdown link navigates to the team list page", () => {
    cy.andyAdminMemberships();
    cy.visit('/admin/group/1');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/admin/group/1`);
    cy.get('.sxctf-nav-hamburger').click();
    cy.get('.aj-nav-list-item').contains('Teams').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/teams`);
  });

  it("'Create New Log' navbar dropdown link navigates to the new log page", () => {
    cy.andyAdminMemberships();
    cy.visit('/admin/group/1');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/admin/group/1`);
    cy.get('.sxctf-nav-hamburger').click();
    cy.get('.aj-nav-list-item').contains('Create New Log').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/log/new`);
  });

  it("'Sign Out' navbar dropdown link signs the user out and navigates to the home page", () => {
    cy.andyAdminMemberships();
    cy.visit('/admin/group/1');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/admin/group/1`);
    cy.get('.sxctf-nav-hamburger').click();
    cy.get('.aj-nav-list-item').contains('Sign Out').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/`);
  });

  it.only('Has a dropdown that switches between profile page tabs', () => {
    cy.andyAdminMemberships();
    cy.visit('/admin/group/1');
    cy.get('.mobileTabsSelect').click();
    cy.get('.mobileTabsSelect > ul > li').should('have.length', 3);
    cy.get('.mobileTabsSelect > ul > li').eq(0).should('contain.text', 'Manage Users');
    cy.get('.mobileTabsSelect > ul > li').eq(1).should('contain.text', 'Send Activation Code');
    cy.get('.mobileTabsSelect > ul > li').eq(2).should('contain.text', 'Edit Group');

    cy.get('section #manageUsers').should('exist');
    cy.get('section #sendActivationCode').should('not.exist');
    cy.get('section #editGroup').should('not.exist');

    cy.get('.mobileTabsSelect > ul > li').eq(1).click();
    cy.get('section #manageUsers').should('not.exist');
    cy.get('section #sendActivationCode').should('exist');
    cy.get('section #editGroup').should('not.exist');

    cy.get('.mobileTabsSelect').click();
    cy.get('.mobileTabsSelect > ul > li').eq(2).click();
    cy.get('section #manageUsers').should('not.exist');
    cy.get('section #sendActivationCode').should('not.exist');
    cy.get('section #editGroup').should('exist');

    cy.get('.mobileTabsSelect').click();
    cy.get('.mobileTabsSelect > ul > li').eq(0).click();
    cy.get('section #manageUsers').should('exist');
    cy.get('section #sendActivationCode').should('not.exist');
    cy.get('section #editGroup').should('not.exist');
  });
});
