/**
 * Utility functions for dealing with user authentication.
 * @author Andrew Jarombek
 * @since 5/9/2020
 */

export function userAuthenticated(user, signedIn) {
  if (!user || !signedIn) {
    return false;
  }

  for (const username in user) {
    if (!user[username].isFetching && !user[username].didInvalidate) {
      return true;
    }
  }

  return false;
}
