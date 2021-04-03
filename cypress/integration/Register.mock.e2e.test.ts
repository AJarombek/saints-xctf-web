/**
 * E2E tests written with Cypress for the register page.  These E2E tests use mocked API calls.
 * @author Andrew Jarombek
 * @since 3/14/2021
 */

describe('Register Mock E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/register');
    cy.clearLocalStorage(/user|token/);
    cy.mockAPI();
    cy.mockAuthAPI();
    cy.mockFnAPI();
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

    cy.get('.sxctf-image-input input[name="username"]').clear().type('unusedUsername');
    cy.get('p.errorStatus').should('not.exist');
    cy.getDataCy('image-input-username').find('.status.failure').should('not.exist');

    cy.get('.aj-contained-button > button').contains('Register').click();

    cy.wait('@userLookupUnusedUserRoute');
    cy.wait('@userPostInvalidActivationCodeRoute');
    cy.get('p.errorStatus').should('contain.text', 'The activation code is invalid or expired.');
    cy.getDataCy('image-input-activation-code').find('.status.failure').should('exist');

    cy.get('.sxctf-image-input input[name="activation-code"]').clear().type('efgh5678');
    cy.get('p.errorStatus').should('not.exist');
    cy.getDataCy('image-input-activation-code').find('.status.failure').should('not.exist');

    cy.fixture('api/users/post/unusedUserSuccess.json').as('userPostSuccess');

    const userPostSuccessRoute = cy.route({
      method: 'POST',
      url: '**/api/v2/users/',
      response: '@userPostSuccess',
      status: 201
    });

    userPostSuccessRoute.as('userPostSuccessRoute');

    cy.get('.aj-contained-button > button').contains('Register').click();
    cy.wait('@userPostSuccessRoute');
    cy.wait('@welcomeEmailSuccessFnRoute');

    cy.getDataCy('registerComplete').should('exist');
    cy.getDataCy('registerComplete')
      .get('h5')
      .should('contain.text', 'You are registered! A welcome email was sent to your email address.');

    cy.getDataCy('registerComplete').findDataCy('signInLink').click();
    cy.url().should('include', '/signin');
  });
});
