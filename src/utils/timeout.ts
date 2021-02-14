/**
 * Helper functions related to async timeouts.
 * @author Andrew Jarombek
 * @since 2/14/2021
 */

export function timeout(ms: number): Promise<unknown> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
