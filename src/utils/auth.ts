/**
 * Utility functions for dealing with user authentication.
 * @author Andrew Jarombek
 * @since 5/9/2020
 */

import {Users} from "./types";

export function userAuthenticated(user: Users, signedIn: boolean) {
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
