// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/admin.d.ts" />

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

  it("'Dashboard' header button navigates to the dashboard page", () => {
    cy.andyAdminMemberships();
    cy.visit('/admin');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/admin`);
    cy.get('.dashboardButton').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/dashboard`);
  });

  it("'Profile' header button navigates to the signed in user's profile page", () => {
    cy.andyAdminMemberships();
    cy.visit('/admin');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/admin`);
    cy.get('.profileButton').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/profile/andy`);
  });

  it("'Teams' header button navigates to the teams list page", () => {
    cy.andyAdminMemberships();
    cy.visit('/admin');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/admin`);
    cy.get('.teamsButton').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/teams`);
  });

  it("'Sign Out' header button signs out the user and navigates to the home page", () => {
    cy.andyAdminMemberships();
    cy.visit('/admin');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/admin`);
    cy.get('.signOutButton').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/`);
  });

  it('header title navigates to the dashboard page', () => {
    cy.andyAdminMemberships();
    cy.visit('/admin');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/admin`);
    cy.get('h1').contains('SaintsXCTF').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/dashboard`);
  });

  it('header icon navigates to the dashboard page', () => {
    cy.andyAdminMemberships();
    cy.visit('/admin');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/admin`);
    cy.get('.sxctf-nav-bar .sxctf-logo').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/dashboard`);
  });

  it('displays the appropriate teams and groups based on the users administrator access', () => {
    cy.andyAdminMemberships();
    cy.visit('/admin');

    cy.wait('@userMembershipsAndyAdminRoute');
    cy.wait('@userGroupsAndyRoute');

    cy.getDataCy('adminTeam').should('have.length', 1);
    cy.getDataCy('adminTeam')
      .findDataCy('adminTeamTitle')
      .should('contain.text', 'St. Lawrence Cross Country and Track & Field');
    cy.getDataCy('adminTeam').eq(0).findDataCy('adminGroup').should('have.length', 2);
    cy.getDataCy('adminTeam').eq(0).findDataCy('adminGroup').eq(0).should('contain.text', 'Alumni');
    cy.getDataCy('adminTeam').eq(0).findDataCy('adminGroup').eq(1).should('contain.text', "Men's Cross Country");
  });

  it.only('navigates to the appropriate group admin page when clicking on a group', () => {
    cy.andyAdminMemberships();
    cy.visit('/admin');

    cy.wait('@userMembershipsAndyAdminRoute');
    cy.wait('@userGroupsAndyRoute');

    cy.getDataCy('adminTeam').eq(0).findDataCy('adminGroup').eq(0).should('contain.text', 'Alumni').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/admin/group/1`);

    cy.wait('@groupAlumniMembersRoute');
    cy.wait('@groupAlumniRoute');
    cy.wait('@groupAlumniTeamRoute');
  });
});
