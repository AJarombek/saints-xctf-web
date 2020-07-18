// https://on.cypress.io/custom-commands

/**
 * Mock the SaintsXCTF API calls made from the UI.
 */
Cypress.Commands.add('mockAPI', () => {
   cy.server();
});
