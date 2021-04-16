/// <reference types="cypress" />

/**
 * Type definition for the custom Cypress commands that are shared amongst many pages of the website.
 * @author Andrew Jarombek
 * @since 4/15/2021
 */

declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command which tests that a pagination bar exists and that it is on the first page.
         * @example paginationBarPageOne()
         */
        paginationBarPageOne(): void;

        /**
         * Custom command which tests that a pagination bar exists and that it is on the third page.
         * @example paginationBarPageThree()
         */
        paginationBarPageThree(): void;

        /**
         * Custom command which tests that a pagination bar exists and that it is on the fifth page.
         * @example paginationBarPageFive()
         */
        paginationBarPageFive(): void;
    }
}