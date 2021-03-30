// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/dashboard.d.ts" />
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/group.d.ts" />

/**
 * E2E tests written with Cypress for the dashboard page once a user is signed in.
 * I hope you are doing well.  Have a fun and happy weekend :).  Love always supports you.
 * @author Andrew Jarombek
 * @since 8/13/2020
 */

describe('Dashboard E2E Tests', () => {
  beforeEach(() => {
    cy.server();
    cy.setUserInLocalStorage();
    cy.setTokenInLocalStorage();
  });

  it("'Profile' header button navigates to the signed in user's profile page", () => {
    cy.visit('/dashboard');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/dashboard`);
    cy.get('.profileButton').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/profile/andy`);
  });

  it("'Teams' header button navigates to the teams list page", () => {
    cy.visit('/dashboard');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/dashboard`);
    cy.get('.teamsButton').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/teams`);
  });

  it("'Sign Out' header button signs out the user and navigates to the home page", () => {
    cy.visit('/dashboard');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/dashboard`);
    cy.get('.signOutButton').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/`);
  });

  it('header title navigates to the dashboard page (again)', () => {
    cy.visit('/dashboard');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/dashboard`);
    cy.get('h1').contains('SaintsXCTF').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/dashboard`);
  });

  it('header icon navigates to the dashboard page (again)', () => {
    cy.visit('/dashboard');
    cy.url().should('equal', `${Cypress.config('baseUrl')}/dashboard`);
    cy.get('.sxctf-nav-bar .sxctf-logo').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/dashboard`);
  });

  it('has a side panel with expandable accordions', () => {
    cy.dashboardRouteAliases();
    cy.visit('/dashboard');

    cy.andyDashboardAPICalls();
    cy.get('#groupsAccordion .groupMember').should('have.length', 1);

    cy.get('#dashboardSidePanel .accordion .expandIcon').eq(2).click();
    cy.get('#groupsAccordion .groupMember').should('have.length', 0);

    cy.get('#dashboardSidePanel .accordion .expandIcon').eq(2).click();
    cy.get('#groupsAccordion .groupMember').should('have.length', 1);

    cy.get('#dashboardSidePanel .accordion .expandIcon').eq(3).click();
  });

  it('displays a no group message if the user has no groups', () => {
    cy.dashboardRouteAliases();

    // Mocked API calls
    cy.route('GET', '/api/v2/users/memberships/andy', {
      memberships: [],
      self: '/v2/users/memberships/andy'
    }).as('userMembershipsNone');

    cy.route('GET', '/api/v2/users/groups/andy', {
      groups: [],
      self: '/v2/users/groups/andy'
    }).as('userGroupsNone');

    cy.visit('/dashboard');

    cy.wait('@logFeedPageOne');
    cy.wait('@userNotifications');

    cy.wait('@userMembershipsNone');
    cy.wait('@userGroupsNone');
    cy.get('#groupsAccordion .groupMember').should('have.length', 0);

    cy.get('#groupsAccordion p').contains('You have no team or group memberships.').should('exist');
    cy.get('#groupsAccordion button').contains('Join Teams & Groups').should('exist');
    cy.get('#groupsAccordion .expandIcon').click();

    cy.get('#groupsAccordion .groupMember').should('have.length', 0);
    cy.get('#groupsAccordion p').contains('You have no team or group memberships.').should('not.exist');
    cy.get('#groupsAccordion').contains('Join Teams & Groups').should('not.exist');
  });

  it('has a side panel link to create a new log', () => {
    cy.dashboardRouteAliases();
    cy.visit('/dashboard');
    cy.andyDashboardAPICalls();

    cy.get('#dashboardSidePanel .accordion .expandIcon').eq(1).click();
    cy.url().should('include', '/log/new');
  });

  it('has a side panel link to view the users profile', () => {
    cy.dashboardRouteAliases();
    cy.visit('/dashboard');
    cy.andyDashboardAPICalls();

    cy.get('#dashboardSidePanel .accordion .expandIcon').eq(0).click();
    cy.url().should('include', '/profile/andy');
  });

  it('has a side panel link to view a group page', () => {
    cy.dashboardRouteAliases();
    cy.groupRouteAliases();
    cy.visit('/dashboard');
    cy.andyDashboardAPICalls();

    cy.get('#groupsAccordion .groupMember').should('have.length', 1);
    cy.get('#groupsAccordion .groupMember').eq(0).should('contain.text', 'Alumni');
    cy.get('#groupsAccordion .groupMember').eq(0).find('a').click();

    cy.wait('@alumniGroup');
    cy.wait('@alumniGroupMembers');
    cy.wait('@userGroups');
    cy.wait('@alumniLogFeedPageOne');
    cy.url().should('include', `${Cypress.config('baseUrl')}/group/`);
  });

  it('has a paginated log feed', () => {
    cy.dashboardRouteAliases();
    cy.visit('/dashboard');
    cy.andyDashboardAPICalls();

    cy.get('#logFeed .exerciseLog').should('have.length', 10);
    cy.get('#paginationBar').contains(1).should('exist');
    cy.get('#paginationBar').contains(2).should('exist');
    cy.get('#paginationBar').contains(3).should('exist');
    cy.get('#paginationBar').contains(4).should('not.exist');
    cy.get('#paginationBar').contains('...').should('not.exist');

    cy.get('#paginationBar').contains(3).click();

    cy.get('#paginationBar').contains(1).should('exist');
    cy.get('#paginationBar').contains(2).should('exist');
    cy.get('#paginationBar').contains(3).should('exist');
    cy.get('#paginationBar').contains(4).should('exist');
    cy.get('#paginationBar').contains(5).should('exist');
    cy.get('#paginationBar').contains(6).should('not.exist');
    cy.get('#paginationBar').contains('...').should('not.exist');

    cy.get('#paginationBar').contains(4).click();

    cy.get('#paginationBar').contains(1).should('exist');
    cy.get('#paginationBar').contains(2).should('exist');
    cy.get('#paginationBar').contains(3).should('exist');
    cy.get('#paginationBar').contains(4).should('exist');
    cy.get('#paginationBar').contains(5).should('exist');
    cy.get('#paginationBar').contains(6).should('exist');
    cy.get('#paginationBar').contains(7).should('not.exist');
    cy.get('#paginationBar').contains('...').should('not.exist');

    cy.get('#paginationBar').contains(5).click();

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

  it('has the ability to comment on logs', () => {
    cy.dashboardRouteAliases();
    cy.route('POST', '/api/v2/comments/').as('createCommentRoute');
    cy.visit('/dashboard');
    cy.andyDashboardAPICalls();

    cy.get('#logFeed .exerciseLog textarea').eq(0).type("I'm the existing comment.");
    cy.get('#logFeed .exerciseLog .addIcon').eq(0).click();

    cy.get('#logFeed .exerciseLog .commentList')
      .eq(0)
      .children()
      .its('length')
      .then((commentCount) => {
        cy.get('#logFeed .exerciseLog textarea').eq(0).type('Testing...');
        cy.get('#logFeed .exerciseLog .addIcon').eq(0).click();

        cy.wait('@createCommentRoute');
        cy.get('#logFeed .exerciseLog .commentList')
          .eq(0)
          .children()
          .should('have.length', commentCount + 1);
      });
  });
});
