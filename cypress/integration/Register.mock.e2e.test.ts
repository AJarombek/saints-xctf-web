/**
 * E2E tests written with Cypress for the register page.  These E2E tests used mocked API calls.
 * @author Andrew Jarombek
 * @since 3/14/2021
 */

describe('Register Mock E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/register');
    cy.mockAPI();
    cy.mockAuth();
    cy.setUserInLocalStorage();
    cy.setTokenInLocalStorage();
  });

  it('can register a new user', () => {
    cy.get('.sxctf-image-input input[name="firstName"]').type('Andy');
    cy.get('.sxctf-image-input input[name="lastName"]').type('Jarombek');
    cy.get('.sxctf-image-input input[name="email"]').type('andrew@jarombek.com');
    cy.get('.aj-contained-button > button').contains('Continue').click();

    cy.wait('@userLookupAndyEmailRoute');
    cy.get('p.errorStatus').should('contain.text', 'A user already exists with this email.');
    cy.getDataCy('image-input-email').find('.status.failure').should('exist');

    cy.get('.sxctf-image-input input[name="email"]').clear().type('saintsxctf@jarombek.com');
    cy.get('.aj-contained-button > button').contains('Continue').click();
    cy.wait('@userLookupUnusedEmailRoute');

    cy.get('.sxctf-image-input input[name="username"]').type('andy');
    cy.get('.sxctf-image-input input[name="password"]').type('password');
    cy.get('.sxctf-image-input input[name="confirm-password"]').type('password');
    cy.get('.sxctf-image-input input[name="activation-code"]').type('abcd1234');
    cy.get('.aj-contained-button > button').contains('Register').click();

    cy.wait('@userLookupAndyUserRoute');
    cy.get('p.errorStatus').should('contain.text', 'A user already exists with this username.');
    cy.getDataCy('image-input-username').find('.status.failure').should('exist');
  });
});
