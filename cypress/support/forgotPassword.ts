/**
 * Custom Cypress commands used on the forgot password pages.
 * @author Andrew Jarombek
 * @since 3/21/2021
 */

Cypress.Commands.add('sendForgotPasswordCode', () => {
  cy.get('.sxctf-image-input input[name="email"]').type('andrew@jarombek.com');
  cy.get('.aj-contained-button').contains('Send').click();
  cy.wait('@forgotPasswordPostAndyRoute');

  cy.getDataCy('forgotPasswordEmailSent').should(
    'contain.text',
    'An email was sent to your email address with a forgot password code.'
  );
});
