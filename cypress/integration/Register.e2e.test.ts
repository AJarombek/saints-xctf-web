// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/commands.d.ts" />
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/register.d.ts" />

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

  it('the credentials step has validation on the username field', () => {
    cy.proceedToCredentialsStage();
    cy.getDataCy('image-input-username').find('.status.none').should('exist');
    cy.getDataCy('image-input-username').find('.status.warning').should('not.exist');

    cy.get('.sxctf-image-input input[name="username"]').type('Andy95');
    cy.getDataCy('image-input-username').find('.status.none').should('exist');
    cy.getDataCy('image-input-username').find('.status.warning').should('not.exist');

    cy.get('.sxctf-image-input input[name="username"]').type('!');
    cy.getDataCy('image-input-username').find('.status.none').should('not.exist');
    cy.getDataCy('image-input-username').find('.status.warning').should('exist');

    cy.get('.sxctf-image-input input[name="username"]').type('{backspace}');
    cy.getDataCy('image-input-username').find('.status.none').should('exist');
    cy.getDataCy('image-input-username').find('.status.warning').should('not.exist');

    cy.get('.sxctf-image-input input[name="username"]').clear();
    cy.getDataCy('image-input-username').find('.status.none').should('not.exist');
    cy.getDataCy('image-input-username').find('.status.warning').should('exist');
  });

  it('the credentials step has validation on the password and confirm password fields', () => {
    cy.proceedToCredentialsStage();

    // By default, no validation warnings are shown on the password fields.
    cy.imageInputValidationCheck('password', 'none');
    cy.imageInputValidationCheck('confirm-password', 'none');

    // If a password shorter than the required length is entered, validation warnings are shown.
    cy.get('.sxctf-image-input input[name="password"]').type('passwor');
    cy.imageInputValidationCheck('password', 'warning');
    cy.imageInputValidationCheck('confirm-password', 'warning');

    // If a password of the required length is entered, validation warnings disappear (but are still shown on the empty
    // confirm password input field).
    cy.get('.sxctf-image-input input[name="password"]').type('d');
    cy.imageInputValidationCheck('password', 'none');
    cy.imageInputValidationCheck('confirm-password', 'warning');

    // Entering the same password into confirm password removes all warnings.
    cy.get('.sxctf-image-input input[name="confirm-password"]').type('password');
    cy.imageInputValidationCheck('password', 'none');
    cy.imageInputValidationCheck('confirm-password', 'none');

    // If the confirm password is different than the password, a validation warning is shown.
    cy.get('.sxctf-image-input input[name="confirm-password"]').clear().type('passw0rd');
    cy.imageInputValidationCheck('password', 'none');
    cy.imageInputValidationCheck('confirm-password', 'warning');

    // If password is changes to be different than confirm password, the validation error goes on confirm password.
    cy.get('.sxctf-image-input input[name="confirm-password"]').clear().type('password');
    cy.imageInputValidationCheck('password', 'none');
    cy.imageInputValidationCheck('confirm-password', 'none');

    cy.get('.sxctf-image-input input[name="password"]').type('!');
    cy.imageInputValidationCheck('password', 'none');
    cy.imageInputValidationCheck('confirm-password', 'warning');

    // When clearing the fields, a warning is shown on the password field, but not the confirm password field.
    cy.get('.sxctf-image-input input[name="password"]').clear();
    cy.get('.sxctf-image-input input[name="confirm-password"]').clear();
    cy.imageInputValidationCheck('password', 'warning');
    cy.imageInputValidationCheck('confirm-password', 'none');
  });

  it("the credentials step doesn't allow registration to continue if there are validation issues", () => {
    cy.proceedToCredentialsStage();

    // By default, the register button is disabled.
    cy.get('.sxctf-register-credentials', { timeout: 1000 }).should('be.visible');
    cy.get('.aj-contained-button > button').contains('Register').should('have.attr', 'disabled');

    // Filling in all the fields will enable the register button.
    cy.get('.sxctf-image-input input[name="username"]').type('andy');
    cy.get('.sxctf-image-input input[name="password"]').type('password');
    cy.get('.sxctf-image-input input[name="confirm-password"]').type('password');
    cy.get('.sxctf-image-input input[name="activation-code"]').type('abcd1234');
    cy.get('.aj-contained-button > button').contains('Register').should('not.have.attr', 'disabled');

    // Register button is disabled when the username is invalid.
    cy.get('.sxctf-image-input input[name="username"]').type('!');
    cy.get('.aj-contained-button > button').contains('Register').should('have.attr', 'disabled');
    cy.get('.sxctf-image-input input[name="username"]').type('{backspace}');
    cy.get('.aj-contained-button > button').contains('Register').should('not.have.attr', 'disabled');

    // Register button is disabled when the username field is empty.
    cy.get('.sxctf-image-input input[name="username"]').clear();
    cy.get('.aj-contained-button > button').contains('Register').should('have.attr', 'disabled');
    cy.get('.sxctf-image-input input[name="username"]').type('andy');
    cy.get('.aj-contained-button > button').contains('Register').should('not.have.attr', 'disabled');

    // Register button is disabled when the password is invalid.
    cy.get('.sxctf-image-input input[name="password"]').type('{backspace}{backspace}{backspace}{backspace}');
    cy.get('.aj-contained-button > button').contains('Register').should('have.attr', 'disabled');
    cy.get('.sxctf-image-input input[name="password"]').type('word');
    cy.get('.aj-contained-button > button').contains('Register').should('not.have.attr', 'disabled');

    // Register button is disabled when the password field is empty.
    cy.get('.sxctf-image-input input[name="password"]').clear();
    cy.get('.aj-contained-button > button').contains('Register').should('have.attr', 'disabled');
    cy.get('.sxctf-image-input input[name="password"]').type('password');
    cy.get('.aj-contained-button > button').contains('Register').should('not.have.attr', 'disabled');

    // Register button is disabled when the confirm password is invalid.
    cy.get('.sxctf-image-input input[name="confirm-password"]').type('{backspace}{backspace}{backspace}{backspace}');
    cy.get('.aj-contained-button > button').contains('Register').should('have.attr', 'disabled');
    cy.get('.sxctf-image-input input[name="confirm-password"]').type('word');
    cy.get('.aj-contained-button > button').contains('Register').should('not.have.attr', 'disabled');

    // Register button is disabled when the confirm password field is empty.
    cy.get('.sxctf-image-input input[name="confirm-password"]').clear();
    cy.get('.aj-contained-button > button').contains('Register').should('have.attr', 'disabled');
    cy.get('.sxctf-image-input input[name="confirm-password"]').type('password');
    cy.get('.aj-contained-button > button').contains('Register').should('not.have.attr', 'disabled');

    // Register button is disabled when the activation code is invalid.
    cy.get('.sxctf-image-input input[name="activation-code"]').type('{backspace}{backspace}{backspace}{backspace}');
    cy.get('.aj-contained-button > button').contains('Register').should('have.attr', 'disabled');
    cy.get('.sxctf-image-input input[name="activation-code"]').type('1234');
    cy.get('.aj-contained-button > button').contains('Register').should('not.have.attr', 'disabled');

    // Register button is disabled when the activation code field is empty.
    cy.get('.sxctf-image-input input[name="activation-code"]').clear();
    cy.get('.aj-contained-button > button').contains('Register').should('have.attr', 'disabled');
    cy.get('.sxctf-image-input input[name="activation-code"]').type('abcd1234');
    cy.get('.aj-contained-button > button').contains('Register').should('not.have.attr', 'disabled');
  });

  it.only("in the credentials step, clicking 'Back' returns to the personal information step", () => {
    cy.proceedToCredentialsStage();

    cy.get('.sxctf-register-credentials', { timeout: 1000 }).should('be.visible');
    cy.get('.sxctf-image-input input[name="firstName"]').should('not.exist');
    cy.get('.sxctf-image-input input[name="lastName"]').should('not.exist');
    cy.get('.sxctf-image-input input[name="email"]').should('not.exist');

    cy.url().should('include', '/register');
    cy.get('.aj-text-button > button').contains('Back').click();
    cy.url().should('include', '/register');

    cy.get('.sxctf-image-input input[name="firstName"]').should('exist');
    cy.get('.sxctf-image-input input[name="lastName"]').should('exist');
    cy.get('.sxctf-image-input input[name="email"]').should('exist');
  });
});
