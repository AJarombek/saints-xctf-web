/// <reference types="cypress" />

/**
 * Type definition for the custom Cypress commands used on a profile page.
 * @author Andrew Jarombek
 * @since 4/12/2021
 */

declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command defining route aliases for API calls.  These are different than route alaises defined in
         * 'api.ts', because these API calls are not mocked.
         * @example profileRouteAliases()
         */
        profileRouteAliases(): void;

        /**
         * Custom command that waits for mocked API calls to the profile page for user Andy.
         * @example profileMockAPICalls()
         */
        profileMockAPICalls(): void;
    }
}