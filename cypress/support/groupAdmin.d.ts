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

        /**
         * Custom command that checks the values in the group details form for an administrator.
         * @param description Description about the group.
         * @param weekStart Whether a group wants the weeks in their members exercise logs to start on Sunday or Monday.
         * @example groupDetailsFormValues('Description', 'sunday')
         */
        groupDetailsFormValues(description: string, weekStart: 'sunday' | 'monday'): void;
    }
}