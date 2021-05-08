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

        /**
         * Custom command that waits for API calls to the St. Lawrence Alumni group page.
         * @example groupAPICalls()
         */
        groupAPICalls(): void;

        /**
         * Custom command that waits for mocked API calls to the St. Lawrence Alumni group page.
         * @example alumniGroupMockAPICalls()
         */
        alumniGroupMockAPICalls(): void;

        /**
         * Custom command that checks which leaderboard filters are selected.
         * @param run Whether running exercises are included in the leaderboard.
         * @param bike Whether biking exercises are included in the leaderboard.
         * @param swim Whether swimming exercises are included in the leaderboard.
         * @param other Whether other exercises are included in the leaderboard.
         * @example groupLeaderboardFiltersSelected(true, false, false, false)
         */
        groupLeaderboardFiltersSelected(run: boolean, bike: boolean, swim: boolean, other: boolean): void;
    }
}