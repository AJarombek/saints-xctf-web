/// <reference types="cypress" />

/**
 * Type definition for the custom Cypress commands used on group pages.
 * @author Andrew Jarombek
 * @since 3/29/2021
 */

declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command defining route aliases for API calls.  These are different than route alaises defined in
         * 'api.ts', because these API calls are not mocked.
         * @example groupRouteAliases()
         */
        groupRouteAliases(): void;
    }
}