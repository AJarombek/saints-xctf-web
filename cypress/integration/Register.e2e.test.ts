// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/commands.d.ts" />

/**
 * E2E tests written with Cypress for the registration page.
 * @author Andrew Jarombek
 * @since 7/22/2020
 */

describe('Register E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it("'Home' header button navigates to the home page", () => {
    cy.url().should('include', '/register');
    cy.get('.homeButton').click();
    cy.url().should('include', '/');
    cy.url().should('not.include', '/register');
  });

  it("'Sign In' header button navigates to the sign in page", () => {
    cy.url().should('include', '/register');
    cy.get('.signInButton').click();
    cy.url().should('include', '/signin');
  });

  it('header title navigates to the home page', () => {
    cy.url().should('include', '/register');
    cy.get('h1').contains('SaintsXCTF').click();
    cy.url().should('include', '/');
    cy.url().should('not.include', '/register');
  });

  it('header icon navigates to the home page', () => {
    cy.url().should('include', '/register');
    cy.get('.sxctf-logo').click();
    cy.url().should('include', '/');
    cy.url().should('not.include', '/register');
  });

  it('clicking exit returns to the home page', () => {
    cy.url().should('include', '/register');
    cy.get('button').contains('Exit').click();
    cy.url().should('include', '/');
    cy.url().should('not.include', '/register');
  });

  it('continue button is disabled until a first name, last name, and email is entered', () => {
    cy.get('.aj-contained-button > button').contains('Continue').should('have.attr', 'disabled');

    cy.get('.sxctf-image-input input[name="firstName"]').type('Andy');
    cy.get('.aj-contained-button > button').contains('Continue').should('have.attr', 'disabled');

    cy.get('.sxctf-image-input input[name="lastName"]').type('Jarombek');
    cy.get('.aj-contained-button > button').contains('Continue').should('have.attr', 'disabled');

    cy.get('.sxctf-image-input input[name="email"]').type('andrew@jarombek.com');
    cy.get('.aj-contained-button > button').contains('Continue').should('not.have.attr', 'disabled');

    cy.get('.sxctf-image-input input[name="firstName"]').clear();
    cy.get('.aj-contained-button > button').contains('Continue').should('have.attr', 'disabled');

    cy.get('.sxctf-image-input input[name="firstName"]').type('Andy');
    cy.get('.aj-contained-button > button').contains('Continue').should('not.have.attr', 'disabled');
  });

  it('continue button is disabled and warning is shown if an invalid email is entered', () => {
    cy.get('.sxctf-image-input input[name="firstName"]').type('Andy');
    cy.get('.sxctf-image-input input[name="lastName"]').type('Jarombek');
    cy.get('.sxctf-image-input input[name="email"]').type('andrew');
    cy.get('.aj-contained-button > button').contains('Continue').should('have.attr', 'disabled');
    cy.getDataCy('image-input-email').find('.status.warning').should('exist');

    cy.get('.sxctf-image-input input[name="email"]').clear().type('andrew@jarombek');
    cy.get('.aj-contained-button > button').contains('Continue').should('have.attr', 'disabled');
    cy.getDataCy('image-input-email').find('.status.warning').should('exist');

    cy.get('.sxctf-image-input input[name="email"]').clear().type('andrew@jarombek.');
    cy.get('.aj-contained-button > button').contains('Continue').should('have.attr', 'disabled');
    cy.getDataCy('image-input-email').find('.status.warning').should('exist');

    cy.get('.sxctf-image-input input[name="email"]').clear().type('andrew@jarombek.c');
    cy.get('.aj-contained-button > button').contains('Continue').should('have.attr', 'disabled');
    cy.getDataCy('image-input-email').find('.status.warning').should('exist');

    cy.get('.sxctf-image-input input[name="email"]').clear().type('andrew@jarombek.co');
    cy.get('.aj-contained-button > button').contains('Continue').should('not.have.attr', 'disabled');
    cy.getDataCy('image-input-email').find('.status.warning').should('not.exist');

    cy.get('.sxctf-image-input input[name="email"]').clear().type('andrew@jarombek.com');
    cy.get('.aj-contained-button > button').contains('Continue').should('not.have.attr', 'disabled');
    cy.getDataCy('image-input-email').find('.status.warning').should('not.exist');
  });

  it('continues to the credentials step of the registration process with valid inputs', () => {
    // The registration process starts by showing the personal information screen.
    cy.get('.sxctf-register-personal-info').should('exist');
    cy.get('.sxctf-register-credentials').should('not.exist');

    // First, try to use an email that already has an account associated with it.
    cy.get('.sxctf-image-input input[name="firstName"]').type('Andy');
    cy.get('.sxctf-image-input input[name="lastName"]').type('Jarombek');
    cy.get('.sxctf-image-input input[name="email"]').type('andrew@jarombek.com');
    cy.get('.aj-contained-button > button').contains('Continue').click();

    // Prove that an error message is displayed.
    cy.get('p.errorStatus').should('contain.text', 'A user already exists with this email.');
    cy.getDataCy('image-input-email').find('.status.failure').should('exist');

    // Second, change the email to one that has no account associated with it.
    cy.get('.sxctf-image-input input[name="email"]').clear().type('saintsxctf@jarombek.com');
    cy.get('.aj-contained-button > button').contains('Continue').click();

    // The registration process should continue on to the credentials screen.
    cy.get('.sxctf-register-personal-info').should('not.exist');
    cy.get('.sxctf-register-credentials').should('exist');
  });

  it.skip('the credentials step has validation on the username field', () => {});

  it.skip('the credentials step has validation on the password and confirm password fields', () => {});

  it.skip("the credentials step doesn't allow registration to continue if there are validation issues", () => {});

  it.skip("in the credentials step, clicking 'Back' returns to the personal information step", () => {});
});
