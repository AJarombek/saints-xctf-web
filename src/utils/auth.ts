/**
 * Utility functions for dealing with user authentication.
 * @author Andrew Jarombek
 * @since 5/9/2020
 */

import {Users} from "../redux/types";

export function userAuthenticated(user: Users, signedInUser: string) {
  if (!Object.keys(user).length) {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
      signedInUser = storedUser.username;
      user = {
        [storedUser.username]: {
          ...storedUser
        }
      }
    }
  }

  if (!user) {
    return false;
  } else if (!user[signedInUser].isFetching && !user[signedInUser].didInvalidate) {
    return true;
  }
}
