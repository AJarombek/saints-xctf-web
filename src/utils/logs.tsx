/**
 * Helper functions used when displaying exercise logs.
 * @author Andrew Jarombek
 * @since 8/9/2020
 */

import React from "react";

/**
 * Remove excess zeros from the time.
 * @param time A string representing the time a workout took to complete.
 * @return A shortened version of the time.
 */
export function shortenTime(time: string): string {
    let start = 0;

    for (let i = 0; i < time.length; i++) {
        if (time.charAt(i) !== "0" && time.charAt(i) !== ":") {
            start = i;
            break;
        }
    }

    return time.substring(start);
}

/**
 * Find tags in a string and turn them into links for user profiles.
 * @param text String to search for tags within.
 */
export function parseTagsInText(text: string) {
    const tagRegex = /@[a-zA-Z0-9]+/g;

    let start = 0;
    let matches = [];
    const result = [];

    while ((matches = tagRegex.exec(text)) !== null) {
        const match = matches[0];
        const username = match.substring(1);
        const end = tagRegex.lastIndex;

        result.push(text.substring(start, end - match.length));
        result.push(<a href={`/profile/${username}`}>{match}</a>);

        start = end;
    }

    result.push(text.substring(start));
    return result;
}
