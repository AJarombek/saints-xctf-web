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

        /**
         * Custom command to generate a range view route for a given time period with a given response.
         * First Vax on Sunday!
         * @param routeName Name of the route that is created by this function.
         * @param rangeItems A list of range view items without any dates.  The dates are generated dynamically
         * by this function.
         * @param amount Number of units to offset the date of the range view (from today).
         * @param unit The unit to offset by (eg. day, week, month).
         * @param subtracting Whether the offset is subtracted from today.  If true, it is subtracted.
         * If false, it is added.
         * @example createRangeViewRoute('sampleRoute', [{feel: 5, miles: 6}, {feel: 6, miles: 7}], 1, 'month', false)
         */
        createRangeViewRoute(
            routeName: string,
            rangeItems: { feel: number; miles: number }[],
            amount: moment.DurationInputArg1,
            unit: moment.DurationInputArg2,
            subtracting?: boolean
        ): void;

        /**
         * Custom command which tests that a week in a monthly calendar contains the expected mileage values.
         * @param week The week in the month, starting at 0 and going up to 5.
         * @param miles Mileage for each day of the week.  Use 0 or null to indicate a day with no mileage.
         * @param totalMiles The total number of miles for the week.
         * @example calendarWeekCheck(0, [1, 2.5, 3, 4.5, 5, 6.5, 7], 29.5)
         */
        calendarWeekCheck(week: number, miles: number[], totalMiles: number): void;
    }
}