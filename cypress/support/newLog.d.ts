/// <reference types="cypress" />
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./types.d.ts" />

/**
 * Type definition for the custom Cypress commands used on the log creation page.
 * @author Andrew Jarombek
 * @since 4/1/2021
 */

declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command to check the log creation form for input validations.
         * @param nameStatus Image input status of the log name.
         * @param locationStatus Image input status of the log location.
         * @param dateStatus Image input status of the log date.
         * @param distanceStatus Image input status of the log distance.
         * @param timeStatus Image input status of the log time.
         * @example newLogInputValidationCheck('none', 'failure', 'none', 'warning', 'warning')
         */
        newLogInputValidationCheck(
            nameStatus: ImageInputStatusClass,
            locationStatus: ImageInputStatusClass,
            dateStatus: ImageInputStatusClass,
            distanceStatus: ImageInputStatusClass,
            timeStatus: ImageInputStatusClass
        ): void;

        /**
         * Custom command to check the log creation form for input error tips.  These are pieces of text which help
         * describe to the user what was inputted incorrectly.
         * @param nameVisible Whether an error tip is displayed for the log name input
         * @param dateVisible Whether an error tip is displayed for the log date input
         * @param distanceVisible Whether an error tip is displayed for the log distance input
         * @param timeVisible Whether an error tip is displayed for the log time input
         * @example newLogInputErrorTipCheck(false, true, false, false)
         */
        newLogInputErrorTipCheck(
            nameVisible: boolean,
            dateVisible: boolean,
            distanceVisible: boolean,
            timeVisible: boolean
        ): void;
    }
}