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
       cy.get('.sxctf-home')
           .contains('Cross Country and Track & Field Team Exercise Logs')
           .should('exist');
    });

    it('move navigate to the blog page', () => {
        cy.get('.aboutButton').click();
        cy.url().should('include', '/#about');
    });
});
