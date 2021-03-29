/// <reference types="cypress" />

/**
 * Type definition for the custom Cypress commands used on the dashboard page.
 * @author Andrew Jarombek
 * @since 3/22/2021
 */

declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command defining route aliases for API calls.  These are different than route alaises defined in
         * 'api.ts', because these API calls are not mocked.
         * @example dashboardRouteAliases()
         */
        dashboardRouteAliases(): void;

        /**
         * Custom command waiting for API calls to complete.  These are the default API calls made on the dashboard
         * page for user 'andy'.
         * @example andyDashboardAPICalls()
         */
        andyDashboardAPICalls(): void;

        /**
         * Custom command waiting for Mocked API calls to complete.  These are the default API calls made on the
         * dashboard page for user 'andy'.
         * @example andyDashboardMockAPICalls()
         */
        andyDashboardMockAPICalls(): void;
    }
}