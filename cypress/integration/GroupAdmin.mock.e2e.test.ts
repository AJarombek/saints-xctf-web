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
    cy.mockFnAPI();
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

  it('properly displays administrators, current members, and pending members in a group', () => {
    cy.andyAdminMemberships();

    const groupAlumniMembersRoute = cy.route({
      method: 'GET',
      url: '**/api/v2/groups/members/1',
      response: '@groupAlumniAdminPendingMembers'
    });

    groupAlumniMembersRoute.as('groupAlumniMembersRoute');

    cy.visit('/admin/group/1');

    cy.alumniGroupAdminMockAPICalls();

    cy.getDataCy('pendingMember').should('have.length', 2);
    cy.getDataCy('pendingMember').eq(0).find('> p').should('contain.text', 'Thomas Caulfield');
    cy.getDataCy('pendingMember').eq(0).find('.aj-text-button').should('contain.text', 'Deny');
    cy.getDataCy('pendingMember').eq(0).find('.aj-contained-button').should('contain.text', 'Accept');

    cy.getDataCy('pendingMember').eq(1).find('> p').should('contain.text', 'Blaine Ayotte');
    cy.getDataCy('pendingMember').eq(1).find('.aj-text-button').should('contain.text', 'Deny');
    cy.getDataCy('pendingMember').eq(1).find('.aj-contained-button').should('contain.text', 'Accept');

    cy.getDataCy('currentMember').should('have.length', 4);
    cy.getDataCy('currentMember').eq(0).find('> p').should('contain.text', 'Andy Jarombek');
    cy.getDataCy('currentMember').eq(0).find('.memberTypeTag').should('contain.text', 'Admin');
    cy.getDataCy('currentMember').eq(0).find('.actionButton').should('contain.text', 'Demote');

    cy.getDataCy('currentMember').eq(1).find('> p').should('contain.text', 'Benjamin Fishbein');
    cy.getDataCy('currentMember').eq(1).find('.memberTypeTag').should('contain.text', 'User');
    cy.getDataCy('currentMember').eq(1).find('.actionButton').should('contain.text', 'Remove');

    cy.getDataCy('currentMember').eq(2).find('> p').should('contain.text', 'Joseph Smith');
    cy.getDataCy('currentMember').eq(2).find('.memberTypeTag').should('contain.text', 'User');
    cy.getDataCy('currentMember').eq(2).find('.actionButton').should('contain.text', 'Remove');

    cy.getDataCy('currentMember').eq(3).find('> p').should('contain.text', 'Lisa Grohn');
    cy.getDataCy('currentMember').eq(3).find('.memberTypeTag').should('contain.text', 'Admin');
    cy.getDataCy('currentMember').eq(3).find('.actionButton').should('contain.text', 'Demote');
  });

  it('able to remove members from a group', () => {
    cy.andyAdminMemberships();
    cy.visit('/admin/group/1');

    cy.alumniGroupAdminMockAPICalls();
    cy.getDataCy('currentMember').should('have.length', 4);

    cy.getDataCy('confirmationModal').should('not.exist');
    cy.getDataCy('currentMember').eq(0).find('.actionButton').should('contain.text', 'Remove').click();
    cy.getDataCy('confirmationModal')
      .should('exist')
      .should('contain.text', 'Are you sure you want to remove Andy Jarombek from Alumni?');

    cy.getDataCy('confirmationModal').find('.aj-outlined-button').contains('CANCEL').click();
    cy.getDataCy('confirmationModal').should('not.exist');

    cy.getDataCy('currentMember').eq(0).find('.actionButton').should('contain.text', 'Remove').click();

    cy.fixture('api/groups/members/get/alumniUpdated.json').as('groupAlumniMembersUpdated');

    const groupAlumniMembersUpdatedRoute = cy.route({
      method: 'GET',
      url: '**/api/v2/groups/members/1',
      response: '@groupAlumniMembersUpdated'
    });

    groupAlumniMembersUpdatedRoute.as('groupAlumniMembersUpdatedRoute');

    cy.getDataCy('confirmationModal').find('.aj-contained-button').contains('REMOVE').click();
    cy.wait('@groupAlumniDeleteAndyRoute');
    cy.wait('@groupAlumniMembersUpdatedRoute');

    cy.getDataCy('currentMember').should('have.length', 3);
  });

  it('able to demote members from administrator roles in a group', () => {
    cy.andyAdminMemberships();

    const groupAlumniMembersRoute = cy.route({
      method: 'GET',
      url: '**/api/v2/groups/members/1',
      response: '@groupAlumniAdminPendingMembers'
    });

    groupAlumniMembersRoute.as('groupAlumniMembersRoute');

    cy.visit('/admin/group/1');

    cy.alumniGroupAdminMockAPICalls();

    cy.getDataCy('pendingMember').should('have.length', 2);
    cy.getDataCy('currentMember').should('have.length', 4);

    cy.getDataCy('currentMember').eq(0).find('> p').should('contain.text', 'Andy Jarombek');
    cy.getDataCy('currentMember').eq(0).find('.memberTypeTag').should('contain.text', 'Admin');

    cy.getDataCy('confirmationModal').should('not.exist');
    cy.getDataCy('currentMember').eq(0).find('.actionButton').should('contain.text', 'Demote').click();
    cy.getDataCy('confirmationModal')
      .should('exist')
      .should(
        'contain.text',
        'Are you sure you want to demote Andy Jarombek from their administrator position in Alumni?'
      );

    cy.getDataCy('confirmationModal').find('.aj-outlined-button').contains('CANCEL').click();
    cy.getDataCy('confirmationModal').should('not.exist');

    cy.getDataCy('currentMember').eq(0).find('.actionButton').should('contain.text', 'Demote').click();
    cy.getDataCy('confirmationModal').should('exist');

    cy.fixture('api/groups/members/get/alumniAdminPendingUpdated.json').as('alumniAdminPendingMembersUpdated');

    const alumniAdminPendingMembersUpdatedRoute = cy.route({
      method: 'GET',
      url: '**/api/v2/groups/members/1',
      response: '@alumniAdminPendingMembersUpdated'
    });

    alumniAdminPendingMembersUpdatedRoute.as('alumniAdminPendingMembersUpdatedRoute');

    cy.getDataCy('confirmationModal').find('.aj-contained-button').contains('DEMOTE').click();
    cy.wait('@groupAlumniUpdateAndyRoute');
    cy.wait('@alumniAdminPendingMembersUpdatedRoute');

    cy.getDataCy('currentMember').eq(0).find('> p').should('contain.text', 'Andy Jarombek');
    cy.getDataCy('currentMember').eq(0).find('.memberTypeTag').should('contain.text', 'User');
    cy.getDataCy('currentMember').eq(0).find('.actionButton').should('contain.text', 'Remove');
  });

  it('able to accept pending members into a group', () => {
    cy.andyAdminMemberships();

    const groupAlumniMembersRoute = cy.route({
      method: 'GET',
      url: '**/api/v2/groups/members/1',
      response: '@groupAlumniAdminPendingMembers'
    });

    groupAlumniMembersRoute.as('groupAlumniMembersRoute');

    cy.visit('/admin/group/1');

    cy.alumniGroupAdminMockAPICalls();

    cy.getDataCy('pendingMember').should('have.length', 2);
    cy.getDataCy('currentMember').should('have.length', 4);

    cy.getDataCy('pendingMember').eq(0).find('> p').should('contain.text', 'Thomas Caulfield');
    cy.getDataCy('pendingMember').eq(0).find('.aj-text-button').should('contain.text', 'Deny');
    cy.getDataCy('pendingMember').eq(0).find('.aj-contained-button').should('contain.text', 'Accept');

    cy.getDataCy('acceptDenyModal').should('not.exist');
    cy.getDataCy('pendingMember').eq(0).find('.aj-contained-button').should('contain.text', 'Accept').click();
    cy.getDataCy('acceptDenyModal')
      .should('exist')
      .should('contain.text', 'Are you sure you want to accept Thomas Caulfield as a member in Alumni?');

    cy.getDataCy('acceptDenyModal').find('.aj-outlined-button').contains('CANCEL').click();
    cy.getDataCy('acceptDenyModal').should('not.exist');

    cy.getDataCy('pendingMember').eq(0).find('.aj-contained-button').should('contain.text', 'Accept').click();
    cy.getDataCy('acceptDenyModal').should('exist');

    cy.fixture('api/groups/members/get/alumniMemberAdded.json').as('groupAlumniMemberAdded');

    const groupAlumniMemberAddedRoute = cy.route({
      method: 'GET',
      url: '**/api/v2/groups/members/1',
      response: '@groupAlumniMemberAdded'
    });

    groupAlumniMemberAddedRoute.as('groupAlumniMemberAddedRoute');

    cy.getDataCy('acceptDenyModal').find('.aj-contained-button').contains('ACCEPT MEMBERSHIP').click();
    cy.wait('@groupAlumniUpdateTomRoute');
    cy.wait('@groupAlumniMemberAddedRoute');

    cy.getDataCy('pendingMember').should('have.length', 1);
    cy.getDataCy('currentMember').should('have.length', 5);

    cy.getDataCy('pendingMember').eq(0).find('> p').should('contain.text', 'Blaine Ayotte');
    cy.getDataCy('pendingMember').eq(0).find('.aj-text-button').should('contain.text', 'Deny');
    cy.getDataCy('pendingMember').eq(0).find('.aj-contained-button').should('contain.text', 'Accept');

    cy.getDataCy('currentMember').eq(4).find('> p').should('contain.text', 'Thomas Caulfield');
    cy.getDataCy('currentMember').eq(4).find('.memberTypeTag').should('contain.text', 'User');
    cy.getDataCy('currentMember').eq(4).find('.actionButton').should('contain.text', 'Remove');
  });

  it('able to not accept pending members into a group', () => {
    cy.andyAdminMemberships();

    const groupAlumniMembersRoute = cy.route({
      method: 'GET',
      url: '**/api/v2/groups/members/1',
      response: '@groupAlumniAdminPendingMembers'
    });

    groupAlumniMembersRoute.as('groupAlumniMembersRoute');

    cy.visit('/admin/group/1');

    cy.alumniGroupAdminMockAPICalls();

    cy.getDataCy('pendingMember').should('have.length', 2);
    cy.getDataCy('currentMember').should('have.length', 4);

    cy.getDataCy('pendingMember').eq(0).find('> p').should('contain.text', 'Thomas Caulfield');
    cy.getDataCy('pendingMember').eq(0).find('.aj-text-button').should('contain.text', 'Deny');
    cy.getDataCy('pendingMember').eq(0).find('.aj-contained-button').should('contain.text', 'Accept');

    cy.getDataCy('acceptDenyModal').should('not.exist');
    cy.getDataCy('pendingMember').eq(0).find('.aj-text-button').should('contain.text', 'Deny').click();
    cy.getDataCy('acceptDenyModal')
      .should('exist')
      .should(
        'contain.text',
        'Are you sure you want to deny the membership request made by Thomas Caulfield for the group Alumni?'
      );

    cy.getDataCy('acceptDenyModal').find('.aj-outlined-button').contains('CANCEL').click();
    cy.getDataCy('acceptDenyModal').should('not.exist');

    cy.getDataCy('pendingMember').eq(0).find('.aj-text-button').should('contain.text', 'Deny').click();
    cy.getDataCy('acceptDenyModal').should('exist');

    cy.fixture('api/groups/members/get/alumniPendingUserRemoved.json').as('groupAlumniPendingUserRemoved');

    const groupAlumniPendingUserRemovedRoute = cy.route({
      method: 'GET',
      url: '**/api/v2/groups/members/1',
      response: '@groupAlumniPendingUserRemoved'
    });

    groupAlumniPendingUserRemovedRoute.as('groupAlumniPendingUserRemovedRoute');

    cy.getDataCy('acceptDenyModal').find('.aj-contained-button').contains('DENY MEMBERSHIP').click();
    cy.wait('@groupAlumniDeleteTomRoute');
    cy.wait('@groupAlumniPendingUserRemovedRoute');

    cy.getDataCy('pendingMember').should('have.length', 1);
    cy.getDataCy('currentMember').should('have.length', 4);

    cy.getDataCy('pendingMember').eq(0).find('> p').should('contain.text', 'Blaine Ayotte');
    cy.getDataCy('pendingMember').eq(0).find('.aj-text-button').should('contain.text', 'Deny');
    cy.getDataCy('pendingMember').eq(0).find('.aj-contained-button').should('contain.text', 'Accept');
  });

  it('shows an error if adding a pending user fails', () => {
    cy.andyAdminMemberships();

    const groupAlumniMembersRoute = cy.route({
      method: 'GET',
      url: '**/api/v2/groups/members/1',
      response: '@groupAlumniAdminPendingMembers'
    });

    groupAlumniMembersRoute.as('groupAlumniMembersRoute');

    cy.visit('/admin/group/1');

    cy.alumniGroupAdminMockAPICalls();

    const groupMembersUpdateErrorRoute = cy.route({
      method: 'PUT',
      url: '**/api/v2/groups/members/1/Tom',
      response: {
        self: '/v2/groups/members/1/Tom',
        updated: false,
        group_member: null,
        error: 'The group membership failed to update.'
      },
      status: 500
    });

    groupMembersUpdateErrorRoute.as('groupMembersUpdateErrorRoute');

    cy.getDataCy('alert').should('not.exist');
    cy.getDataCy('pendingMember').eq(0).find('.aj-contained-button').should('contain.text', 'Accept').click();
    cy.getDataCy('acceptDenyModal').find('.aj-contained-button').contains('ACCEPT MEMBERSHIP').click();

    cy.wait('@groupMembersUpdateErrorRoute');

    cy.getDataCy('alert').should('exist');
    cy.getDataCy('alert').should(
      'contain.text',
      'An unexpected error occurred while accepting a users membership request. ' +
        'Try reloading the page. If this error persists, contact andrew@jarombek.com.'
    );

    cy.getDataCy('alert').getDataCy('alertCloseIcon').click();
    cy.getDataCy('alert').should('not.exist');
  });

  it('shows an error if deleting a pending user fails', () => {
    cy.andyAdminMemberships();

    const groupAlumniMembersRoute = cy.route({
      method: 'GET',
      url: '**/api/v2/groups/members/1',
      response: '@groupAlumniAdminPendingMembers'
    });

    groupAlumniMembersRoute.as('groupAlumniMembersRoute');

    cy.visit('/admin/group/1');

    cy.alumniGroupAdminMockAPICalls();

    const groupDeleteMemberErrorRoute = cy.route({
      method: 'DELETE',
      url: '**/api/v2/groups/members/1/Tom',
      response: {
        self: '/v2/groups/members/1/Tom',
        deleted: false,
        error: 'Failed to delete the group membership.'
      },
      status: 500
    });

    groupDeleteMemberErrorRoute.as('groupDeleteMemberErrorRoute');

    cy.getDataCy('alert').should('not.exist');
    cy.getDataCy('pendingMember').eq(0).find('.aj-text-button').should('contain.text', 'Deny').click();
    cy.getDataCy('acceptDenyModal').find('.aj-contained-button').contains('DENY MEMBERSHIP').click();
    cy.wait('@groupDeleteMemberErrorRoute');

    cy.getDataCy('alert').should('exist');
    cy.getDataCy('alert').should(
      'contain.text',
      'An unexpected error occurred while denying a users membership request. Try reloading the page. ' +
        'If this error persists, contact andrew@jarombek.com.'
    );

    cy.getDataCy('alert').getDataCy('alertCloseIcon').click();
    cy.getDataCy('alert').should('not.exist');
  });

  it('shows an error if modifying a member fails', () => {
    cy.andyAdminMemberships();

    const groupAlumniMembersRoute = cy.route({
      method: 'GET',
      url: '**/api/v2/groups/members/1',
      response: '@groupAlumniAdminPendingMembers'
    });

    groupAlumniMembersRoute.as('groupAlumniMembersRoute');

    cy.visit('/admin/group/1');

    cy.alumniGroupAdminMockAPICalls();

    const groupMembersUpdateErrorRoute = cy.route({
      method: 'PUT',
      url: '**/api/v2/groups/members/1/andy',
      response: {
        self: '/v2/groups/members/1/andy',
        updated: false,
        group_member: null,
        error: 'The group membership failed to update.'
      },
      status: 500
    });

    groupMembersUpdateErrorRoute.as('groupMembersUpdateErrorRoute');

    cy.getDataCy('alert').should('not.exist');
    cy.getDataCy('currentMember').eq(0).find('.actionButton').should('contain.text', 'Demote').click();
    cy.getDataCy('confirmationModal').find('.aj-contained-button').contains('DEMOTE').click();

    cy.wait('@groupMembersUpdateErrorRoute');

    cy.getDataCy('alert').should('exist');
    cy.getDataCy('alert').should(
      'contain.text',
      'An unexpected error occurred while updating a users membership. Try reloading the page. ' +
        'If this error persists, contact andrew@jarombek.com.'
    );

    cy.getDataCy('alert').getDataCy('alertCloseIcon').click();
    cy.getDataCy('alert').should('not.exist');
  });

  it('shows an error if removing a member fails', () => {
    cy.andyAdminMemberships();
    cy.visit('/admin/group/1');

    cy.alumniGroupAdminMockAPICalls();

    const groupDeleteMemberErrorRoute = cy.route({
      method: 'DELETE',
      url: '**/api/v2/groups/members/1/andy',
      response: {
        self: '/v2/groups/members/1/andy',
        deleted: false,
        error: 'Failed to delete the group membership.'
      },
      status: 500
    });

    groupDeleteMemberErrorRoute.as('groupDeleteMemberErrorRoute');

    cy.getDataCy('alert').should('not.exist');
    cy.getDataCy('currentMember').eq(0).find('.actionButton').should('contain.text', 'Remove').click();
    cy.getDataCy('confirmationModal').find('.aj-contained-button').contains('REMOVE').click();

    cy.wait('@groupDeleteMemberErrorRoute');

    cy.getDataCy('alert').should('exist');
    cy.getDataCy('alert').should(
      'contain.text',
      'An unexpected error occurred while revoking a users membership. Try reloading the page. ' +
        'If this error persists, contact andrew@jarombek.com.'
    );

    cy.getDataCy('alert').getDataCy('alertCloseIcon').click();
    cy.getDataCy('alert').should('not.exist');
  });

  it('redirects back to the dashboard page if the user is not an admin for a group', () => {
    cy.visit('/admin/group/1');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/dashboard`);
  });

  it('send activation code to new user has the appropriate email validation', () => {
    cy.andyAdminMemberships();
    cy.visit('/admin/group/1');
    cy.get('.tabs p').contains('Send Activation Code').click();
    cy.getDataCy('approvalMessage').should('not.exist');

    cy.getImageInput('email').type('a');
    cy.imageInputValidationCheck('email', 'failure');
    cy.getDataCy('approvalMessage').should('not.exist');

    cy.getImageInput('email').type('ndrew');
    cy.imageInputValidationCheck('email', 'failure');
    cy.getDataCy('approvalMessage').should('not.exist');

    cy.getImageInput('email').type('@jar');
    cy.imageInputValidationCheck('email', 'failure');
    cy.getDataCy('approvalMessage').should('not.exist');

    cy.getImageInput('email').type('ombek.c');
    cy.imageInputValidationCheck('email', 'failure');
    cy.getDataCy('approvalMessage').should('not.exist');

    cy.getImageInput('email').type('o');
    cy.imageInputValidationCheck('email', 'success');
    cy.getDataCy('approvalMessage').should('exist');

    cy.getImageInput('email').type('m');
    cy.imageInputValidationCheck('email', 'success');
    cy.getDataCy('approvalMessage').should('exist');

    cy.getImageInput('email').clear();
    cy.imageInputValidationCheck('email', 'none');
    cy.getDataCy('approvalMessage').should('not.exist');
  });

  it('able to send activation code to new user', () => {
    cy.andyAdminMemberships();
    cy.visit('/admin/group/1');
    cy.get('.tabs p').contains('Send Activation Code').click();
    cy.getDataCy('approvalMessage').should('not.exist');

    cy.getImageInput('email').type('andrew@jarombek.com');

    cy.getDataCy('approvalMessage').should(
      'contain.text',
      'Sending an email to this address will give its recipient access to the St. Lawrence Cross Country and ' +
        'Track & Field team and Alumni group.'
    );
    cy.get('.aj-contained-button').contains('Send Activation Code').should('have.attr', 'disabled');
    cy.getDataCy('approvalMessage').should('exist');

    cy.get('#emailApproval').parent().click();
    cy.get('.aj-contained-button').contains('Send Activation Code').should('not.have.attr', 'disabled');

    cy.get('.aj-text-button').contains('Reset').click();
    cy.getDataCy('approvalMessage').should('not.exist');

    cy.getImageInput('email').type('andrew@jarombek.com');
    cy.getDataCy('approvalMessage').should('exist');
    cy.get('.aj-contained-button').contains('Send Activation Code').should('have.attr', 'disabled');

    cy.get('#emailApproval').parent().click();
    cy.get('.aj-contained-button').contains('Send Activation Code').should('not.have.attr', 'disabled');
    cy.getDataCy('alert').should('not.exist');

    cy.get('.aj-contained-button').contains('Send Activation Code').click();
    cy.wait('@activationCodePostRoute');
    cy.wait('@activationCodeEmailSuccessFnRoute');

    cy.getDataCy('alert').should('exist');
    cy.getDataCy('alert').should('contain.text', 'Activation code sent to andrew@jarombek.com!');

    // The success message should disappear after 4 seconds.
    cy.wait(4000);
    cy.getDataCy('alert').should('not.exist');
    cy.getDataCy('approvalMessage').should('not.exist');
  });

  it('shows an error if the activation code fails to be created', () => {
    cy.andyAdminMemberships();
    cy.visit('/admin/group/1');
    cy.get('.tabs p').contains('Send Activation Code').click();
    cy.getImageInput('email').type('andrew@jarombek.com');

    const activationCodePostErrorRoute = cy.route({
      method: 'POST',
      url: '**/api/v2/activation_code/',
      response: {
        self: '/v2/activation_code',
        added: true,
        activation_code: null,
        error: 'failed to create a new activation code'
      },
      status: 500
    });

    activationCodePostErrorRoute.as('activationCodePostErrorRoute');

    cy.get('#emailApproval').parent().click();
    cy.getDataCy('alert').should('not.exist');
    cy.get('.aj-contained-button').contains('Send Activation Code').click();
    cy.wait('@activationCodePostErrorRoute');

    cy.getDataCy('alert').should('exist');
    cy.getDataCy('alert').should(
      'contain.text',
      'An unexpected error occurred while creating a new activation code. Try reloading the page. ' +
        'If this error persists, contact andrew@jarombek.com.'
    );

    cy.getDataCy('alert').getDataCy('alertCloseIcon').click();
    cy.getDataCy('alert').should('not.exist');
    cy.get('.aj-contained-button').contains('Send Activation Code').should('not.have.attr', 'disabled');
  });

  it('shows an error if the activation code fails to be sent', () => {
    cy.andyAdminMemberships();
    cy.visit('/admin/group/1');
    cy.get('.tabs p').contains('Send Activation Code').click();
    cy.getImageInput('email').type('andrew@jarombek.com');

    cy.fixture('fn/email/activationCode/failure.json').as('activationCodeEmailFailureFn');

    const activationCodeEmailFailureFnRoute = cy.route({
      method: 'POST',
      url: '**/fn/email/activation-code',
      response: '@activationCodeEmailFailureFn',
      status: 500
    });

    activationCodeEmailFailureFnRoute.as('activationCodeEmailFailureFnRoute');

    cy.getDataCy('alert').should('not.exist');
    cy.get('#emailApproval').parent().click();
    cy.get('.aj-contained-button').contains('Send Activation Code').click();
    cy.wait('@activationCodePostRoute');
    cy.wait('@activationCodeEmailFailureFnRoute');

    cy.getDataCy('alert').should('exist');
    cy.getDataCy('alert').should(
      'contain.text',
      'An unexpected error occurred while sending the new activation code to the email address entered. ' +
        'Try reloading the page. If this error persists, contact andrew@jarombek.com.'
    );

    cy.getDataCy('alert').getDataCy('alertCloseIcon').click();
    cy.getDataCy('alert').should('not.exist');
    cy.get('.aj-contained-button').contains('Send Activation Code').should('not.have.attr', 'disabled');
  });

  it('able to retry sending an email if the activation code fails to be sent', () => {
    cy.andyAdminMemberships();
    cy.visit('/admin/group/1');
    cy.get('.tabs p').contains('Send Activation Code').click();
    cy.getImageInput('email').type('andrew@jarombek.com');

    cy.fixture('fn/email/activationCode/failure.json').as('activationCodeEmailFailureFn');

    const activationCodeEmailFailureFnRoute = cy.route({
      method: 'POST',
      url: '**/fn/email/activation-code',
      response: '@activationCodeEmailFailureFn',
      status: 500
    });

    activationCodeEmailFailureFnRoute.as('activationCodeEmailFailureFnRoute');

    cy.get('#emailApproval').parent().click();
    cy.get('.aj-contained-button').contains('Send Activation Code').click();
    cy.wait('@activationCodePostRoute');
    cy.wait('@activationCodeEmailFailureFnRoute');

    const activationCodeEmailSuccessFnRoute = cy.route({
      method: 'POST',
      url: '**/fn/email/activation-code',
      response: '@activationCodeEmailSuccessFn',
      status: 200
    });

    activationCodeEmailSuccessFnRoute.as('activationCodeEmailSuccessFnRoute');

    cy.getDataCy('alert').should('exist');
    cy.getDataCy('alert').contains('Retry').click();
    cy.wait('@activationCodeEmailSuccessFnRoute');

    cy.getDataCy('alert').should('exist');
    cy.getDataCy('alert').should('contain.text', 'Activation code sent to andrew@jarombek.com!');

    // The success message should disappear after 4 seconds.
    cy.wait(4000);
    cy.getDataCy('alert').should('not.exist');
    cy.getDataCy('approvalMessage').should('not.exist');
  });

  it('properly displays group details', () => {
    cy.andyAdminMemberships();
    cy.visit('/admin/group/1');
    cy.get('.tabs p').contains('Edit Group').click();
    cy.groupDetailsFormValues('St. Lawrence Cross Country and Track & Field Alumni', 'sunday');
  });

  it('able to edit group details', () => {
    cy.andyAdminMemberships();
    cy.visit('/admin/group/1');
    cy.get('.tabs p').contains('Edit Group').click();

    cy.groupDetailsFormValues('St. Lawrence Cross Country and Track & Field Alumni', 'sunday');
    cy.get('.aj-contained-button').contains('Save Details').should('have.attr', 'disabled');

    cy.get('textarea').clear().type('Description from E2E Test');
    cy.getDataCy('radioButton').eq(1).findDataCy('customRadio').click();

    cy.groupDetailsFormValues('Description from E2E Test', 'monday');
    cy.get('.aj-contained-button').contains('Save Details').should('not.have.attr', 'disabled');

    cy.get('.editGroupDetails .aj-text-button').contains('Cancel').click();

    cy.groupDetailsFormValues('St. Lawrence Cross Country and Track & Field Alumni', 'sunday');
    cy.get('.aj-contained-button').contains('Save Details').should('have.attr', 'disabled');

    cy.get('textarea').clear().type('Description from E2E Test');
    cy.getDataCy('radioButton').eq(1).findDataCy('customRadio').click();

    cy.groupDetailsFormValues('Description from E2E Test', 'monday');
    cy.get('.aj-contained-button').contains('Save Details').should('not.have.attr', 'disabled');

    cy.get('.aj-contained-button').contains('Save Details').click();
    cy.wait('@groupAlumniPutRoute');

    cy.getDataCy('alert').should('exist');
    cy.getDataCy('alert').should('contain.text', 'Group Details Updated!');

    // The success message should disappear after 4 seconds.
    cy.wait(4000);
    cy.getDataCy('alert').should('not.exist');

    cy.groupDetailsFormValues('Description from E2E Test', 'monday');
    cy.get('.aj-contained-button').contains('Save Details').should('have.attr', 'disabled');
  });

  it('shows an error if editing group details fails', () => {
    cy.andyAdminMemberships();
    cy.visit('/admin/group/1');
    cy.get('.tabs p').contains('Edit Group').click();

    cy.get('textarea').clear().type('Description from E2E Test');

    const groupAlumniPutErrorRoute = cy.route({
      method: 'PUT',
      url: '**/api/v2/groups/1',
      response: {
        self: '/v2/groups/1',
        updated: true,
        group: null,
        error: 'The group failed to update.'
      },
      status: 500
    });

    groupAlumniPutErrorRoute.as('groupAlumniPutErrorRoute');

    cy.get('.aj-contained-button').contains('Save Details').click();
    cy.wait('@groupAlumniPutErrorRoute');

    cy.getDataCy('alert').should('exist');
    cy.getDataCy('alert').should(
      'contain.text',
      'Failed to update the group details. Try reloading the page. If this error persists, contact andrew@jarombek.com.'
    );

    cy.getDataCy('alert').getDataCy('alertCloseIcon').click();
    cy.getDataCy('alert').should('not.exist');
  });

  it('able to retry editing group details if it originally fails', () => {
    cy.andyAdminMemberships();
    cy.visit('/admin/group/1');
    cy.get('.tabs p').contains('Edit Group').click();

    cy.get('textarea').clear().type('Description from E2E Test');
    cy.getDataCy('radioButton').eq(1).findDataCy('customRadio').click();

    const groupAlumniPutErrorRoute = cy.route({
      method: 'PUT',
      url: '**/api/v2/groups/1',
      response: {
        self: '/v2/groups/1',
        updated: true,
        group: null,
        error: 'The group failed to update.'
      },
      status: 500
    });

    groupAlumniPutErrorRoute.as('groupAlumniPutErrorRoute');

    cy.get('.aj-contained-button').contains('Save Details').click();
    cy.wait('@groupAlumniPutErrorRoute');

    cy.getDataCy('alert').should('exist');

    const groupAlumniPutRoute = cy.route({
      method: 'PUT',
      url: '**/api/v2/groups/1',
      response: '@groupAlumniPut'
    });

    groupAlumniPutRoute.as('groupAlumniPutRoute');

    cy.getDataCy('alert').contains('Retry').click();
    cy.wait('@groupAlumniPutRoute');

    cy.getDataCy('alert').should('exist');
    cy.getDataCy('alert').should('contain.text', 'Group Details Updated!');

    // The success message should disappear after 4 seconds.
    cy.wait(4000);
    cy.getDataCy('alert').should('not.exist');
  });

  it('able to edit a group picture', () => {
    cy.andyAdminMemberships();
    cy.visit('/admin/group/1');
    cy.get('.tabs p').contains('Edit Group').click();

    cy.getDataCy('uploadFile').should('exist');
    cy.getDataCy('uploadedFile').should('not.exist');
    cy.get('.aj-contained-button').contains('Save Picture').should('have.attr', 'disabled');

    cy.getDataCy('uploadFile').attachFile('images/alumni-skiing.jpg', { subjectType: 'drag-n-drop' });
    cy.getDataCy('uploadFile').should('not.exist');
    cy.getDataCy('uploadedFile').should('exist');
    cy.get('.aj-contained-button').contains('Save Picture').should('not.have.attr', 'disabled');

    cy.getDataCy('alert').should('not.exist');
    cy.get('.aj-contained-button').contains('Save Picture').click();

    cy.wait('@uassetGroupSuccessFnRoute');
    cy.wait('@groupAlumniPutRoute');

    cy.getDataCy('alert').should('exist');
    cy.getDataCy('alert').should('contain.text', 'Picture uploaded successfully.');

    // The success message should disappear after 4 seconds.
    cy.wait(4000);
    cy.getDataCy('alert').should('not.exist');
  });

  it('shows an error if editing the group picture fails', () => {
    cy.andyAdminMemberships();
    cy.visit('/admin/group/1');
    cy.get('.tabs p').contains('Edit Group').click();

    cy.getDataCy('uploadFile').attachFile('images/alumni-skiing.jpg', { subjectType: 'drag-n-drop' });

    cy.getDataCy('alert').should('not.exist');
    cy.getDataCy('uploadedFileError').should('not.exist');

    const uassetGroupFailureFnRoute = cy.route({
      method: 'POST',
      url: '**/fn/uasset/group',
      response: {
        result: false
      },
      status: 500
    });

    uassetGroupFailureFnRoute.as('uassetGroupFailureFnRoute');

    cy.get('.aj-contained-button').contains('Save Picture').click();
    cy.wait('@uassetGroupFailureFnRoute');

    cy.getDataCy('alert').should('exist');
    cy.getDataCy('alert').should(
      'contain.text',
      'Failed to upload a new picture for the group. Try reloading the page. If this error persists, ' +
        'contact andrew@jarombek.com.'
    );
    cy.getDataCy('uploadedFileError').should('exist');

    const uassetGroupSuccessFnRoute = cy.route({
      method: 'POST',
      url: '**/fn/uasset/group',
      response: '@uassetGroupSuccessFn',
      status: 200
    });

    uassetGroupSuccessFnRoute.as('uassetGroupSuccessFnRoute');

    cy.getDataCy('alert').contains('Retry').click();

    cy.wait('@uassetGroupSuccessFnRoute');
    cy.wait('@groupAlumniPutRoute');

    cy.getDataCy('alert').should('exist');
    cy.getDataCy('alert').should('contain.text', 'Picture uploaded successfully.');

    // The success message should disappear after 4 seconds.
    cy.wait(4000);
    cy.getDataCy('alert').should('not.exist');
    cy.getDataCy('uploadedFileError').should('not.exist');
  });

  it.only('able to remove drag and dropped pictures', () => {
    cy.andyAdminMemberships();
    cy.visit('/admin/group/1');
    cy.get('.tabs p').contains('Edit Group').click();

    cy.getDataCy('uploadFile').should('exist');
    cy.getDataCy('uploadedFile').should('not.exist');

    cy.getDataCy('uploadFile').attachFile('images/alumni-skiing.jpg', { subjectType: 'drag-n-drop' });
    cy.getDataCy('uploadFile').should('not.exist');
    cy.getDataCy('uploadedFile').should('exist');
    cy.get('.aj-contained-button').contains('Save Picture').should('not.have.attr', 'disabled');

    cy.getDataCy('uploadedFileRemoveIcon').click();
    cy.getDataCy('uploadFile').should('exist');
    cy.getDataCy('uploadedFile').should('not.exist');
    cy.get('.aj-contained-button').contains('Save Picture').should('have.attr', 'disabled');
  });

  it.skip('prompts admins if they have unsaved group detail changes (confirm prompt)', () => {});

  it.skip('prompts admins if they have unsaved group detail changes (cancel prompt)', () => {});

  it.skip('prompts admins if they have unsaved group picture changes (confirm prompt)', () => {});

  it.skip('prompts admins if they have unsaved group picture changes (cancel prompt)', () => {});
});
