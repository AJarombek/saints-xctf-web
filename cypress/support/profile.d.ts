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
         * Custom command that waits for API calls to the profile page for user Andy.
         * @example profileMockAPICalls()
         */
        profileAPICalls(): void;

        /**
         * Custom command that waits for mocked API calls to the profile page for user Andy.
         * @example profileMockAPICalls()
         */
        profileMockAPICalls(): void;

        /**
         * Custom command that checks the values in the profile details form for a user.
         * @param first First name of the user.
         * @param last Last name of the user.
         * @param email Email associated with the user's account.
         * @param classYear Class year that the user graduated.
         * @param location Current location of the user.
         * @param favoriteEvent Users favorite event to race.
         * @param description Description about the user.
         * @param weekStart Whether the user wants the weeks in their exercise logs to start on Sunday or Monday.
         * @example profileDetailsFormValues('Andy', 'Jarombek', 'a@j.com', '2017', 'NY', '5K', 'Description', 'sunday')
         */
        profileDetailsFormValues(
            first: string,
            last: string,
            email: string,
            classYear: string,
            location: string,
            favoriteEvent: string,
            description: string,
            weekStart: 'sunday' | 'monday'
        ): void;
    }
}