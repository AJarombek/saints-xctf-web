/**
 * Helper functions used when displaying exercise logs.
 * @author Andrew Jarombek
 * @since 8/9/2020
 */

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
