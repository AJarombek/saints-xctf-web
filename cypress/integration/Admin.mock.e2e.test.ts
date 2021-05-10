/**
 * E2E tests written with Cypress for the admin page.  These E2E tests used mocked API calls.
 * @author Andrew Jarombek
 * @since 5/9/2021
 */

describe('Admin Mock E2E Tests', () => {
  beforeEach(() => {
    cy.mockAPI();
    cy.mockAuthAPI();
    cy.setUserInLocalStorage();
    cy.setMockTokenInLocalStorage();
  });

  it.only("'Profile' header button navigates to the signed in user's profile page", () => {
    const userGroupsAndyRoute = cy.route({
      method: 'GET',
      url: '**/api/v2/users/groups/andy',
      response: '@userGroupsAndyAdmin'
    });

    userGroupsAndyRoute.as('userGroupsAndyRoute');

    const userMembershipsAndyRoute = cy.route({
      method: 'GET',
      url: '**/api/v2/users/memberships/andy',
      response: '@userMembershipsAndyAdmin'
    });

    userMembershipsAndyRoute.as('userMembershipsAndyAdminRoute');

    cy.visit('/admin');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/admin`);
    cy.get('.profileButton').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/profile/andy`);
  });

  it("'Teams' header button navigates to the teams list page", () => {
    cy.visit('/admin');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/admin`);
    cy.get('.teamsButton').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/teams`);
  });

  it("'Sign Out' header button signs out the user and navigates to the home page", () => {
    cy.visit('/admin');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/admin`);
    cy.get('.signOutButton').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/`);
  });

  it('header title navigates to the dashboard page (again)', () => {
    cy.visit('/admin');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/admin`);
    cy.get('h1').contains('SaintsXCTF').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/dashboard`);
  });

  it('header icon navigates to the dashboard page (again)', () => {
    cy.visit('/admin');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/admin`);
    cy.get('.sxctf-nav-bar .sxctf-logo').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/dashboard`);
  });
});
