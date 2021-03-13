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

        /**
         * Chainable function for getting elements with a data-cypress attribute.
         * @param value The value of the data attribute on an HTML element.
         * @example getDataCy('stayStrong')
         */
        getDataCy(value: string): Chainable<Element>;

        /**
         * Child chainable function for finding elements with a data-cypress attribute.
         * @param subject The subejct (HTML element) that is serached from for child elements.
         * @param value The value of the data attribute on an HTML element.
         * @example findDataCy('button')
         */
        findDataCy(subject: any, value: string): Chainable<Element>;
    }
}
