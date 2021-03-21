/// <reference types="cypress" />

/**
 * Type definition for the custom Cypress commands used on the forgot password pages.
 * @author Andrew Jarombek
 * @since 3/21/2021
 */

declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command to enter an email address and create/send a forgot password code.
         * @example sendForgotPasswordCode()
         */
        sendForgotPasswordCode(): void;
    }
}
