/**
 * Utility functions for dealing with user authentication.
 * @author Andrew Jarombek
 * @since 5/9/2020
 */

import {Users} from "../redux/types";

export function userAuthenticated(user: Users) {
  if (!Object.keys(user).length) {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
      user = {
        [storedUser.username]: {
          ...storedUser
        }
      }
    }
  }

  if (!user) {
    return false;
  }

  for (const username in user) {
    if (!user[username].isFetching && !user[username].didInvalidate) {
      return true;
    }
  }

  return false;
}
