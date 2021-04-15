/// <reference types="cypress" />
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./types.d.ts" />

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
         * Custom command to put the a fake JWT token without any user information in the browser's localStorage.
         * @example setTokenInLocalStorage()
         */
        setMockTokenInLocalStorage(): void;

        /**
         * Custom command to check for validation icons on an image input component.
         * @example imageInputValidationCheck('password', 'warning')
         */
        imageInputValidationCheck(inputName: string, status: ImageInputStatusClass): void;

        /**
         * Chainable function for getting elements with a data-cypress attribute.
         * @param value The value of the data attribute on an HTML element.
         * @example getDataCy('stayStrong')
         */
        getDataCy(value: string): Chainable<Element>;

        /**
         * Chainable function for getting elements with a data-cypress attribute and containing a text value.
         * @param value The value of the data attribute on an HTML element.
         * @param contains The text that the HTML element contains.
         * @example getDataCyContains('element', 'Andy Jarombek')
         */
        getDataCyContains(value: string, contains: string): Chainable<Element>;

        /**
         * Child chainable function for finding elements with a data-cypress attribute.
         * @param value The value of the data attribute on an HTML element.
         * @example findDataCy('button')
         */
        findDataCy(value: string): Chainable<Element>;
    }
}
