/**
 * E2E tests written with Cypress for the application home page.
 * @author Andrew Jarombek
 * @since 6/26/2020
 */

describe('Home E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('loads the home page as expected', () => {
    cy.get('.sxctf-home').contains('Cross Country and Track & Field Team Exercise Logs').should('exist');
  });

  it("'about' header button navigates down to the 'about' section", () => {
    // Through good and bad you are always very loved.  Please trust that those who love you
    // will understand any hardships you face and simply love you more.
    cy.get('.aboutButton').click();
    cy.url().should('include', '/#about');
  });

  it("'testimonials' header button navigates down to the 'testimonials' section", () => {
    cy.get('.testimonialsButton').click();
    cy.url().should('include', '/#testimonials');
  });

  it("'register' header button navigates to the 'register' page", () => {
    cy.get('.registerButton').click();
    cy.url().should('include', '/register');
  });

  it("'signin' header button navigates to the sign in page", () => {
    cy.get('.signInButton').click();
    cy.url().should('include', '/signin');
  });

  it('logo and title navigates to the same page', () => {
    cy.get('.sxctf-nav-bar h1').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}`);

    cy.get('.sxctf-nav-bar .sxctf-logo').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}`);
  });

  it('footer logo button navigates to top of page', () => {
    cy.get('.sxctf-home-footer .sxctf-logo').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/#`);
  });
});
