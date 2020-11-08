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

  it('has a side panel with expandable accordions', () => {
    cy.route('GET', '/api/v2/users/groups/andy').as('userGroups');
    cy.visit('/dashboard');

    cy.wait('@userGroups').then(() => {
      cy.get('#groupsAccordion .groupMember').should('have.length', 1);

      cy.get('#dashboardSidePanel .accordion .expandIcon').eq(2).click();
      cy.get('#groupsAccordion .groupMember').should('have.length', 0);

      cy.get('#dashboardSidePanel .accordion .expandIcon').eq(2).click();
      cy.get('#groupsAccordion .groupMember').should('have.length', 1);

      cy.get('#dashboardSidePanel .accordion .expandIcon').eq(3).click();
    });
  });

  it('displays a no group message if the user has no groups', () => {
    cy.visit('/dashboard');

    cy.route('GET', '/api/v2/users/groups/andy', {
      groups: [],
      self: '/v2/users/groups/andy',
    }).as('userGroupsMock');

    cy.wait('@userGroupsMock').then(() => {
      cy.get('#groupsAccordion .groupMember')
        .should('have.length', 0);

      cy.get('#groupsAccordion p')
        .contains('You have no group memberships.')
        .should('exist');

      cy.get('#groupsAccordion button').contains('Join Groups').should('exist');

      cy.get('#groupsAccordion .expandIcon').click();

      cy.get('#groupsAccordion .groupMember')
        .should('have.length', 0);

      cy.get('#groupsAccordion p')
        .contains('You have no group memberships.')
        .should('not.exist');

      cy.get('#groupsAccordion').contains('Join Groups').should('not.exist');
    });
  });

  it('has a side panel link to create a new log', () => {
    cy.visit('/dashboard');

    cy.get('#dashboardSidePanel .accordion .expandIcon').eq(1).click();
    cy.url().should('include', '/log/new');
  });

  it('has a paginated log feed', () => {
    cy.route('GET', '/api/v2/log_feed/all/all/10/0').as('logFeedRoute');
    cy.visit('/dashboard');

    cy.wait('@logFeedRoute').then(() => {
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
  });

  it('has the ability to comment on logs', () => {
    cy.route('POST', '/api/v2/comments/').as('createCommentRoute');
    cy.visit('/dashboard');

    cy.get('#logFeed .exerciseLog textarea').eq(0).type("I'm the existing comment.");
    cy.get('#logFeed .exerciseLog .addIcon').eq(0).click();

    cy.get('#logFeed .exerciseLog .commentList')
      .eq(0)
      .children()
      .its('length')
      .then((commentCount) => {
        cy.get('#logFeed .exerciseLog textarea').eq(0).type('Testing...');
        cy.get('#logFeed .exerciseLog .addIcon').eq(0).click();

        cy.wait('@createCommentRoute').then(() => {
          cy.get('#logFeed .exerciseLog .commentList')
            .eq(0)
            .children()
            .should('have.length', commentCount + 1);
        });
      });
  });
});
