/// <reference types="cypress" />

/**
 * Type definition for the Cypress commands created in 'api.ts'.  This is needed to use custom commands in
 * TypeScript code.
 * @author Andrew Jarombek
 * @since 3/12/2021
 */

declare namespace Cypress {
    interface Chainable {
        /**
         * Instead of calling the SaintsXCTF API, return static JSON files defined in the fixtures directory when an
         * API call is made.
         * @example mockAPI()
         */
        mockAPI(): void;

        /**
         * Return static JSON files defined in the fixtures directory when an API call is made to an '/v2/logs/*'
         * endpoint.
         * @example mockLogAPI()
         */
        mockLogAPI(): void;

        /**
         * Return static JSON files defined in the fixtures directory when an API call is made to an '/v2/log_feed/*'
         * endpoint.
         * @example mockLogFeedAPI()
         */
        mockLogFeedAPI(): void;

        /**
         * Instead of calling the SaintsXCTF Authentication API, return static JSON files defined in the fixtures
         * directory when an API call is made.
         * @example mockAuth()
         */
        mockAuth(): void;
    }
}