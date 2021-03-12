/// <reference types="cypress" />

/**
 * Type definition for the Cypress commands.  This is needed to use custom commands in TypeScript code.
 * @author Andrew Jarombek
 * @since 3/11/2021
 */

declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command to put user details in the browser's localStorage.
         * @example setUserInLocalStorage()
         */
        setUserInLocalStorage(): void;

        /**
         * Custom command to put the signed in users JWT token in the browser's localStorage.
         * @example setTokenInLocalStorage()
         */
        setTokenInLocalStorage(): void;
    }
}
