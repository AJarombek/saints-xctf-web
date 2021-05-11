// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/groupAdmin.d.ts" />

/**
 * E2E tests written with Cypress for the group admin page.  These E2E tests used mocked API calls.
 * @author Andrew Jarombek
 * @since 5/10/2021
 */

describe('Group Admin Mock E2E Tests', () => {
  beforeEach(() => {
    cy.mockAPI();
    cy.mockAuthAPI();
    cy.setUserInLocalStorage();
    cy.setMockTokenInLocalStorage();
  });

  it("'Dashboard' header button navigates to the dashboard page", () => {
    cy.andyAdminMemberships();
    cy.visit('/admin/group/1');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/admin/group/1`);
    cy.get('.dashboardButton').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/dashboard`);
  });

  it("'Profile' header button navigates to the signed in user's profile page", () => {
    cy.andyAdminMemberships();
    cy.visit('/admin/group/1');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/admin/group/1`);
    cy.get('.profileButton').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/profile/andy`);
  });

  it("'Teams' header button navigates to the teams list page", () => {
    cy.andyAdminMemberships();
    cy.visit('/admin/group/1');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/admin/group/1`);
    cy.get('.teamsButton').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/teams`);
  });

  it("'Admin' header button navigates to the teams list page", () => {
    cy.andyAdminMemberships();
    cy.visit('/admin/group/1');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/admin/group/1`);
    cy.get('.adminButton').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/admin`);
  });

  it("'Sign Out' header button signs out the user and navigates to the home page", () => {
    cy.andyAdminMemberships();
    cy.visit('/admin/group/1');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/admin/group/1`);
    cy.get('.signOutButton').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/`);
  });

  it('header title navigates to the dashboard page', () => {
    cy.andyAdminMemberships();
    cy.visit('/admin/group/1');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/admin/group/1`);
    cy.get('h1').contains('SaintsXCTF').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/dashboard`);
  });

  it('header icon navigates to the dashboard page', () => {
    cy.andyAdminMemberships();
    cy.visit('/admin/group/1');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/admin/group/1`);
    cy.get('.sxctf-nav-bar .sxctf-logo').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/dashboard`);
  });

  it('has multiple tabs that can be navigated between', () => {
    cy.andyAdminMemberships();
    cy.visit('/admin/group/1');

    cy.alumniGroupAdminMockAPICalls();

    // The default tab is the exercise logs tab.
    cy.get('section #manageUsers').should('exist');
    cy.get('section #sendActivationCode').should('not.exist');
    cy.get('section #editGroup').should('not.exist');

    cy.get('.tabs p').contains('Send Activation Code').click();
    cy.get('section #manageUsers').should('not.exist');
    cy.get('section #sendActivationCode').should('exist');
    cy.get('section #editGroup').should('not.exist');

    cy.get('.tabs p').contains('Edit Group').click();
    cy.get('section #manageUsers').should('not.exist');
    cy.get('section #sendActivationCode').should('not.exist');
    cy.get('section #editGroup').should('exist');

    cy.get('.tabs p').contains('Manage Users').click();
    cy.get('section #manageUsers').should('exist');
    cy.get('section #sendActivationCode').should('not.exist');
    cy.get('section #editGroup').should('not.exist');
  });

  it('properly displays current members in a group', () => {
    cy.andyAdminMemberships();
    cy.visit('/admin/group/1');

    cy.alumniGroupAdminMockAPICalls();

    cy.getDataCy('currentMember').should('have.length', 4);
    cy.getDataCy('currentMember').eq(0).find('> p').should('contain.text', 'Andy Jarombek');
    cy.getDataCy('currentMember').eq(0).find('.memberTypeTag').should('contain.text', 'User');
    cy.getDataCy('currentMember').eq(0).find('.actionButton').should('contain.text', 'Remove');

    cy.getDataCy('currentMember').eq(1).find('> p').should('contain.text', 'Benjamin Fishbein');
    cy.getDataCy('currentMember').eq(1).find('.memberTypeTag').should('contain.text', 'User');
    cy.getDataCy('currentMember').eq(1).find('.actionButton').should('contain.text', 'Remove');

    cy.getDataCy('currentMember').eq(2).find('> p').should('contain.text', 'Joseph Smith');
    cy.getDataCy('currentMember').eq(2).find('.memberTypeTag').should('contain.text', 'User');
    cy.getDataCy('currentMember').eq(2).find('.actionButton').should('contain.text', 'Remove');

    cy.getDataCy('currentMember').eq(3).find('> p').should('contain.text', 'Lisa Grohn');
    cy.getDataCy('currentMember').eq(3).find('.memberTypeTag').should('contain.text', 'User');
    cy.getDataCy('currentMember').eq(3).find('.actionButton').should('contain.text', 'Remove');
  });

  it.only('properly displays administrators, current members, and pending members in a group', () => {
    cy.andyAdminMemberships();

    const groupAlumniMembersRoute = cy.route({
      method: 'GET',
      url: '**/api/v2/groups/members/1',
      response: '@groupAlumniAdminPendingMembers'
    });

    groupAlumniMembersRoute.as('groupAlumniMembersRoute');

    cy.visit('/admin/group/1');

    cy.alumniGroupAdminMockAPICalls();
  });

  it.skip('able to remove members from a group', () => {
    cy.andyAdminMemberships();
    cy.visit('/admin/group/1');

    cy.alumniGroupAdminMockAPICalls();
  });

  it.skip('able to demote members from administrator roles in a group', () => {
    cy.visit('/admin/group/1');
  });

  it.skip('able to accept pending members into a group', () => {
    cy.visit('/admin/group/1');
  });

  it.skip('able to not accept pending members into a group', () => {
    cy.visit('/admin/group/1');
  });

  it.skip('redirects back to the dashboard page if the user is not an admin for a group', () => {
    cy.visit('/admin/group/1');
  });
});