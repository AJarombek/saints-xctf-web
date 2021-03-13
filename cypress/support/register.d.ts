/// <reference types="cypress" />

/**
 * Type definition for the custom Cypress commands used on the register page.
 * @author Andrew Jarombek
 * @since 3/13/2021
 */

declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command to proceed from the personal information stage of the register page to the credentials stage.
         * @example proceedToCredentialsStage()
         */
        proceedToCredentialsStage(): void;
    }
}
