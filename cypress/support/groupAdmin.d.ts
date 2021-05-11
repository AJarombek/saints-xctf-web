/// <reference types="cypress" />

/**
 * Type definition for the custom Cypress commands used on group admin pages.
 * @author Andrew Jarombek
 * @since 5/10/2021
 */

declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command that waits for mocked API calls to the St. Lawrence Alumni group admin page.
         * @example alumniGroupAdminMockAPICalls()
         */
        alumniGroupAdminMockAPICalls(): void;
    }
}