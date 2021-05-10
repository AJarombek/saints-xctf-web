/// <reference types="cypress" />

/**
 * Type definition for the custom Cypress commands used on the admin pages.
 * @author Andrew Jarombek
 * @since 5/9/2021
 */

declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command for mocked routes with admin memberships for user 'andy'.
         * @example andyAdminMemberships()
         */
        andyAdminMemberships(): void;
    }
}