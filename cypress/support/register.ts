/**
 * Custom Cypress commands used on the register new user page.
 * @author Andrew Jarombek
 * @since 3/13/2021
 */

Cypress.Commands.add('proceedToCredentialsStage', () => {
  cy.get('.sxctf-image-input input[name="firstName"]').type('Andy');
  cy.get('.sxctf-image-input input[name="lastName"]').type('Jarombek');
  cy.get('.sxctf-image-input input[name="email"]').type('saintsxctf@jarombek.com');
  cy.get('.aj-contained-button > button').contains('Continue').click();
});
