/**
 * E2E tests written with Cypress for the edit log page.  These E2E tests use mocked API calls.
 * @author Andrew Jarombek
 * @since 5/30/2021
 */

describe('Edit Log Mock E2E Tests', () => {
  beforeEach(() => {
    cy.mockAPI();
    cy.mockAuthAPI();
    cy.mockFnAPI();
    cy.setUserInLocalStorage();
    cy.setMockTokenInLocalStorage();
  });

  it('displays existing log details in the proper fields', () => {
    cy.visit('/log/edit/1');
    cy.wait('@userGroupsAndyRoute');
    cy.wait('@logGet1Route');

    cy.get('.sxctf-image-input input[name="name"]').invoke('val').should('equal', 'Hillcrest Park');
    cy.get('.sxctf-image-input input[name="location"]').invoke('val').should('equal', 'Riverside, CT');
    cy.get('.sxctf-image-input input[name="date"]').invoke('val').should('equal', '2021-05-30');

    cy.get('.exerciseTypeSelect > div > div').should('contain.text', 'Run');
    cy.get('.sxctf-image-input input[name="distance"]').invoke('val').should('equal', '4.43');
    cy.get('.exerciseMetricSelect > div > div').should('contain.text', 'Miles');

    cy.get('.sxctf-image-input input[name="time"]').invoke('val').should('equal', '0:31:47');

    cy.getDataCy('logFeel').should('contain.text', 'Average');
    cy.get('textarea').should(
      'contain.text',
      "In CT for the weekend.  Almost hit 30 miles this week, which I'm really happy about considering I missed " +
        'three weeks.'
    );
  });
});
