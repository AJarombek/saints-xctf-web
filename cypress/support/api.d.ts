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
         * Return static JSON files defined in the fixtures directory when an API call is made to a
         * '/v2/forgot_password/*' endpoint.
         * @example mockForgotPasswordAPI()
         */
        mockForgotPasswordAPI(): void;

        /**
         * Return static JSON files defined in the fixtures directory when an API call is made to a
         * '/v2/forgot_password/validate/*' endpoint.
         * @example mockForgotPasswordValidateAPI()
         */
        mockForgotPasswordValidateAPI(): void;

        /**
         * Return static JSON files defined in the fixtures directory when an API call is made to a '/v2/logs/*'
         * endpoint.
         * @example mockLogAPI()
         */
        mockLogAPI(): void;

        /**
         * Return static JSON files defined in the fixtures directory when an API call is made to a '/v2/log_feed/*'
         * endpoint.
         * @example mockLogFeedAPI()
         */
        mockLogFeedAPI(): void;

        /**
         * Return static JSON files defined in the fixtures directory when an API call is made to a '/v2/teams/groups/*'
         * endpoint.
         * @example mockTeamGroupsAPI()
         */
        mockTeamGroupsAPI(): void;

        /**
         * Return static JSON files defined in the fixtures directory when an API call is made to a
         * '/v2/teams/search/<text>/<limit>' endpoint.
         * @example mockTeamSearchAPI()
         */
        mockTeamSearchAPI(): void;

        /**
         * Return static JSON files defined in the fixtures directory when an API call is made to a '/v2/users/*'
         * endpoint.
         * @example mockUserAPI()
         */
        mockUserAPI(): void;

        /**
         * Return static JSON files defined in the fixtures directory when an API call is made to a
         * '/v2/users/<username>/change_password' endpoint.
         * @example mockUserChangePasswordAPI()
         */
        mockUserChangePasswordAPI(): void;

        /**
         * Return static JSON files defined in the fixtures directory when an API call is made to a
         * '/v2/users/flair/<username>' endpoint.
         * @example mockUserFlairAPI()
         */
        mockUserFlairAPI(): void;

        /**
         * Return static JSON files defined in the fixtures directory when an API call is made to a
         * '/v2/users/groups/*' endpoint.
         * @example mockUserGroupsAPI()
         */
        mockUserGroupsAPI(): void;

        /**
         * Return static JSON files defined in the fixtures directory when an API call is made to a
         * '/v2/users/lookup/*' endpoint.
         * @example mockUserLookupAPI()
         */
        mockUserLookupAPI(): void;

        /**
         * Return static JSON files defined in the fixtures directory when an API call is made to a
         * '/v2/users/memberships/*' endpoint.
         * @example mockUserMembershipsAPI()
         */
        mockUserMembershipsAPI(): void;

        /**
         * Return static JSON files defined in the fixtures directory when an API call is made to a
         * '/v2/users/notifications/*' endpoint.
         * @example mockUserNotificationsAPI()
         */
        mockUserNotificationsAPI(): void;

        /**
         * Return static JSON files defined in the fixtures directory when an API call is made to a
         * '/v2/users/statistics/*' endpoint.
         * @example mockUserStatisticsAPI()
         */
        mockUserStatisticsAPI(): void;

        /**
         * Instead of calling the SaintsXCTF Authentication API, return static JSON files defined in the fixtures
         * directory when an API call is made.
         * @example mockAuthAPI()
         */
        mockAuthAPI(): void;

        /**
         * Return static JSON files defined in the fixtures directory when a Authentication API call is made to a
         * '/token' endpoint.
         * @example mockAuthTokenAPI()
         */
        mockAuthTokenAPI(): void;

        /**
         * Instead of calling the SaintsXCTF Function API, return static JSON files defined in the fixtures
         * directory when an API call is made.
         * @example mockFnAPI()
         */
        mockFnAPI(): void;

        /**
         * Return static JSON files defined in the fixtures directory when a Function API call is made to a
         * '/email/welcome' endpoint.
         * @example mockWelcomeEmailFnAPI()
         */
        mockWelcomeEmailFnAPI(): void;

        /**
         * Return static JSON files defined in the fixtures directory when a Function API call is made to a
         * '/uasset/user' endpoint.
         * @example mockUassetUserFnAPI()
         */
        mockUassetUserFnAPI(): void;
    }
}